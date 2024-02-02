import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

type FormData = {
  username: string;
  password: string;
};

type LoginProp = {
  onLogin: (isLoggedIn: boolean) => void;
};

const Login = ({ onLogin }: LoginProp) => {
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

  const handleSubmit = async (e) => {
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
      console.log("User ID:", user.uid);
      console.log("User Email:", user.email);

      onLogin(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  return (
    <div className="container">
      <div className="border shadow p-5 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="emailAnchor">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailAnchor"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="username"
              onChange={handleTextChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="passwordAnchor">Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordAnchor"
              placeholder="Password"
              name="password"
              onChange={handleTextChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
