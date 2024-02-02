import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { SetUserContext, User } from "../App";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firestore/Firestore";

type FormData = {
  username: string;
  password: string;
};

type LoginProp = {
  onLogin: (isLoggedIn: boolean) => void;
};

const Login = ({ onLogin }: LoginProp) => {
  const setUser = useContext(SetUserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const setUserData = async (userId: string) => {
    const mUser: User = {
      firstName: "",
      middleName: "",
      lastName: "",
    };

    try {
      const userCollectionPath = "users";
      const userDocumentPath = `${userCollectionPath}/${userId}/user_details/${userId}`;

      const db = getFirestore(app);
      const userDocRef = doc(db, userDocumentPath);

      const snapshot = await getDoc(userDocRef);

      if (snapshot.exists()) {
        const userData = snapshot.data() as User;

        mUser.firstName = userData.firstName;
        mUser.middleName = userData.middleName;
        mUser.lastName = userData.lastName;

        setUser(mUser);
      } else {
        alert("User does not exist");
      }
    } catch (error) {
      console.error("Error fetching user data from Firestore:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      const user = userCredential.user;

      setUserData(user.uid);

      onLogin(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Username or password is wrong.");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow">
        <h4 className="text-center mb-4">Welcome to</h4>
        <h4 className="text-center mb-4">Geofacia Dashboard</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailAnchor" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailAnchor"
              placeholder="Enter email"
              name="username"
              onChange={handleTextChange}
            />
            <div className="form-text text-muted">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="passwordAnchor" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordAnchor"
              placeholder="Password"
              name="password"
              onChange={handleTextChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
