import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const linkClass = "mx-2";

type User = {
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
};

const Header = () => {
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
    <nav className="d-flex justify-content-between p-3 bg-dark">
      <div className="text-light">
        <h3>DASHBOARD</h3>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <Link to="/" className={linkClass}>
          HOME
        </Link>
        <Link to="/dashboard" className={linkClass}>
          DASHBOARD
        </Link>
        <Link to="/about" className={linkClass}>
          ABOUT
        </Link>
      </div>
      <div className="d-flex justify-content-start align-items-start">
        <button className="btn btn-sm px-3 btn-secondary text-light">
          {user?.username.toUpperCase()}
        </button>
      </div>
    </nav>
  );
};

export default Header;
