import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleClick = () => {
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
