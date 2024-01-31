import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/about" Component={About} />
            <Route path="/" Component={Home} />
          </Routes>
        </div>
      </>
    </Router>
  );
};

export default App;
