import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import logo from "../assets/bzlogo.png";

const Navbar = () => {

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="logo" />

      <h1>BeingZero</h1>

      <div className="nav-links">

        {!token ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <Link to="/">Home</Link>

            <Link to="/dashboard">Dashboard</Link>

            <Link to="/myorders">My Orders</Link>

            <Link to="/mypayments">My Payments</Link>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};
export default Navbar;