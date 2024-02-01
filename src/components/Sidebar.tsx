import { Link } from "react-router-dom";
import { useState, useEffect, ReactNode } from "react";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
};

type SideBarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SideBarProps) => {
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
      <div className="row bg-white" style={{ height: "100vh" }}>
        <div
          className="bg-light shadow border col-auto col-lg-2 min-vh-100"
          style={{ overflowY: "auto", height: "100%" }}
        >
          <a className="text-decoration-none d-flex align-items-center justify-content-center mt-3">
            <span className="ms-1 fs-4 text-dark">
              <p className="fs-2 fw-bold">GeoFacia</p>
            </span>
          </a>
          <div className="row d-flex justify-content-between">
            <div className="col">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item text-white fs-5">
                  <Link to="/" className="nav-link" aria-current="page">
                    <i className="bi bi-speedometer2 text-dark"></i>
                    <span className="ms-2 text-dark">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item text-white fs-5">
                  <Link
                    to="/attendance"
                    className="nav-link"
                    aria-current="page"
                  >
                    <i className="bi bi-person-check-fill text-dark"></i>
                    <span className="ms-2 text-dark">Attendance</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main
          className="col"
          style={{ overflowY: "auto", height: "100vh", padding: "20px" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
