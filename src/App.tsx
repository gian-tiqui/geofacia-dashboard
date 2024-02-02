import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Attendance from "./components/Attendance";
import Login from "./components/Login";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import Students from "./components/Students";

export type User = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export const firstElementMargin: string = "m-3";

export const SetLoggedInContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => {});

export const UserContext = createContext<User | undefined>(undefined);
export const SetUserContext = createContext<Dispatch<SetStateAction<User>>>(
  () => {}
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    middleName: "",
  });

  return (
    <SetUserContext.Provider value={setUser}>
      <UserContext.Provider value={user}>
        <SetLoggedInContext.Provider value={setLoggedIn}>
          <Router>
            {loggedIn ? (
              <Sidebar>
                <div className="container-fluid">
                  <Routes>
                    <Route path="/dashboard" Component={Dashboard} />
                    <Route path="/attendance" Component={Attendance} />
                    <Route path="/students" Component={Students} />
                  </Routes>
                </div>
              </Sidebar>
            ) : (
              <Login onLogin={setLoggedIn} />
            )}
          </Router>
        </SetLoggedInContext.Provider>
      </UserContext.Provider>
    </SetUserContext.Provider>
  );
};

export default App;
