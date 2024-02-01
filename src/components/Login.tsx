import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onLogin(true);
    navigate("/dashboard");
  };

  return (
    <div>
      <button className="btn btn-dark" onClick={handleClick}>
        Sign in
      </button>
    </div>
  );
};

export default Login;
