import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
};

const Sidebar = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const tempUser: User = {
      username: "Gian",
      firstName: "Michael Gian",
      middleName: "Magsino",
      lastName: "Tiqui",
    };

    setUser(tempUser);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="bg-dark col-auto col-md-3 min-vh-100">
          <a className="text-decoration-none d-flex align-items-center">
            <span className="ms-1 fs-4">Geofacia</span>
          </a>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item text-white fs-4">
              <Link to="/" className="nav-link" aria-current="page">
                <i className="bi bi-speedometer2"></i>
                <span className="ms-2">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item text-white fs-4">
              <Link to="/" className="nav-link">
                <i className="bi bi-heart"></i>
                <span className="ms-2">Heart</span>
              </Link>
            </li>
            <li className="nav-item text-white fs-4">
              <Link to="/" className="nav-link">
                <i className="bi bi-house"></i>
                <span className="ms-2">Home</span>
              </Link>
            </li>
          </ul>
        </div>
        <main className="col">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
