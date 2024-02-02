import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Attendance from "./components/Attendance";
import Users from "./components/Users";
import Login from "./components/Login";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from "./firestore/Firestore";

export const firstElementMargin: string = "m-3";

export const SetLoggedInContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

const SUBCOLLECTION_NAME = "Sk8uWXjFZRFaR4f5uMBm";
const SUBSUBCOLLECTION_NAME = "_attendance";
const COLLECTION_NAME = `attendance/${SUBCOLLECTION_NAME}/${SUBSUBCOLLECTION_NAME}`;

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);

      const collectionRef = collection(db, COLLECTION_NAME);

      try {
        const snapshot = await getDocs(collectionRef);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("fetched data: ", data);
      } catch (error) {
        console.error("Error fetching data from firestore", error);
      }
    };

    // fetchData();
  }, []);

  return (
    <SetLoggedInContext.Provider value={setLoggedIn}>
      <Router>
        {loggedIn ? (
          <Sidebar>
            <div className="container-fluid">
              <Routes>
                <Route path="/dashboard" Component={Dashboard} />
                <Route path="/attendance" Component={Attendance} />
                <Route path="/users" Component={Users} />
              </Routes>
            </div>
          </Sidebar>
        ) : (
          <Login onLogin={setLoggedIn} />
        )}
      </Router>
    </SetLoggedInContext.Provider>
  );
};

export default App;
