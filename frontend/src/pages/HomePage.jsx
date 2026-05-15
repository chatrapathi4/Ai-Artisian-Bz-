import { Link } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to BeingZero 🚀</h1>

        <p>
          Manage your orders, payments and dashboard easily.
        </p>

        <div className="home-links">
          <Link to="/dashboard">Go to Dashboard</Link>

          <Link to="/myorders">Go to My Orders</Link>

          <Link to="/mypayments">Go to My Payments</Link>
        </div>
      </div>
    </div>
  );
}
export default HomePage;