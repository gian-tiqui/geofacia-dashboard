const Login = ({ onLogin }) => {
  const handleClick = () => {
    onLogin(true);
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
