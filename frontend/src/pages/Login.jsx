// Login.jsx

import "../css/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    // Fake login for frontend
    localStorage.setItem("token", "loggedIn");

    // Redirect to homepage
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Welcome Back 👋</h1>

        <p className="subtitle">
          Login to continue to your dashboard
        </p>

        <form className="login-form" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter your email"
          />

          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <div className="extras">

          <a href="/">Forgot Password?</a>

          <p>
            Don’t have an account? <span>Sign Up</span>
          </p>

        </div>

      </div>
    </div>
  );
};
export default Login;