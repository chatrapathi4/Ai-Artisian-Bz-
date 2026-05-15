import { Link } from "react-router-dom"
import "../css/Navbar.css"

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">My App</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/myorders">My Orders</Link>
        <Link to="/mypayments">My Payments</Link>
      </div>
    </div>
  )
}
