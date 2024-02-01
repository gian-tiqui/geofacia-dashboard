import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

export const firstElementMargin: string = "m-3";

const App = () => {
  return (
    <Router>
      <Sidebar>
        <div className="container-fluid">
          <Routes>
            <Route path="/" Component={Dashboard} />
          </Routes>
        </div>
      </Sidebar>
    </Router>
  );
};

export default App;
