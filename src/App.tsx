import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Attendance from "./components/Attendance";
import Users from "./components/Users";
import Login from "./components/Login";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const firstElementMargin: string = "m-3";

export const SetLoggedInContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
