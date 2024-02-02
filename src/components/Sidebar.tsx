import { Link, useNavigate } from "react-router-dom";
import { ReactNode, useContext, useState } from "react";
import { SetLoggedInContext, UserContext } from "../App";
import { getAuth, signOut } from "firebase/auth";

type SideBarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SideBarProps) => {
  const logout = useContext(SetLoggedInContext);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
      logout(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        <div
          className="shadow col-auto col-lg-2 min-vh-100 d-flex flex-column"
          style={{
            overflowY: "auto",
            height: "100%",
            backgroundColor: "#0d2136",
          }}
        >
          {/* Sidebar content */}
          <a
            className="text-decoration-none d-flex align-items-center justify-content-center mt-3"
            onClick={toggleDropdown}
          >
            <span className="ms-1 fs-4">
              <p className="fs-2 fw-bold" style={{ color: "#cde3fd" }}>
                GeoFacia
              </p>
            </span>
          </a>
          <div className="row d-flex flex-column flex-grow-1">
            <div className="col mb-4">
              <ul className="nav nav-pills flex-column">
                <li className="nav-item text-white fs-5">
                  <Link
                    to="/dashboard"
                    className="nav-link"
                    aria-current="page"
                  >
                    <i
                      className="bi bi-speedometer2"
                      style={{ color: "#cde3fd" }}
                    ></i>
                    <span className="ms-2" style={{ color: "#cde3fd" }}>
                      Dashboard
                    </span>
                  </Link>
                </li>
                <li className="nav-item text-white fs-5">
                  <Link
                    to="/attendance"
                    className="nav-link"
                    aria-current="page"
                  >
                    <i
                      className="bi bi-person-check-fill"
                      style={{ color: "#cde3fd" }}
                    ></i>
                    <span className="ms-2" style={{ color: "#cde3fd" }}>
                      Attendance
                    </span>
                  </Link>
                </li>
                <li className="nav-item text-white fs-5">
                  <Link to="/students" className="nav-link" aria-current="page">
                    <i
                      className="bi bi-people-fill"
                      style={{ color: "#cde3fd" }}
                    ></i>
                    <span className="ms-2" style={{ color: "#cde3fd" }}>
                      Students
                    </span>
                  </Link>
                </li>
                <li className="nav-item text-white fs-5">
                  <Link to="/hosts" className="nav-link" aria-current="page">
                    <i
                      className="bi bi-people-fill"
                      style={{ color: "#cde3fd" }}
                    ></i>
                    <span className="ms-2" style={{ color: "#cde3fd" }}>
                      Hosts
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="text-center mt-auto mb-3">
              <button
                className="btn"
                style={{ backgroundColor: "#cde3fd" }}
                onClick={toggleDropdown}
                aria-expanded={showDropdown}
              >
                {user?.firstName}
              </button>
              {showDropdown && (
                <div className="dropdown mt-2">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <button
                        className="dropdown-item bg-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
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
