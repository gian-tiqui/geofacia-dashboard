import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Attendance from "./components/Attendance";

export const firstElementMargin: string = "m-3";

const App = () => {
  return (
    <Router>
      <Sidebar>
        <div className="container-fluid">
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/attendance" Component={Attendance} />
          </Routes>
        </div>
      </Sidebar>
    </Router>
  );
};

export default App;
