// Dashboard.jsx

import "../css/Dashboard.css";

 const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Dashboard 📊</h1>

        <p>
          Welcome back! Here’s a quick overview of your activity.
        </p>

        <div className="stats">
          <div className="stat-box">
            <h2>12</h2>
            <span>Total Orders</span>
          </div>

          <div className="stat-box">
            <h2>₹24,500</h2>
            <span>Total Payments</span>
          </div>

          <div className="stat-box">
            <h2>5</h2>
            <span>Pending Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;