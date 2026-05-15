
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api.js';
import '../css/HomePage.css';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weeklyData, setWeeklyData] = useState({});
  const [monthlyData, setMonthlyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchReports();
  }, []);

  const fetchUserData = async () => {
    const response = await api.auth.getCurrentUser();

    if (response.success) {
      setUser(response.data);
    } else {
      setError(response.error);
      navigate('/login');
    }
  };

  const fetchReports = async () => {
    const weeklyResponse = await api.report.getWeekly();
    const monthlyResponse = await api.report.getMonthly();

    if (weeklyResponse.success) {
      setWeeklyData(weeklyResponse.data);
    }

    if (monthlyResponse.success) {
      setMonthlyData(monthlyResponse.data);
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await api.auth.logout();
    navigate('/login');
  };

  if (loading) {
    return <div className="homepage">Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          {user.businessName && <p>Business: {user.businessName}</p>}
          {user.businessType && <p>Type: {user.businessType}</p>}
        </div>
      )}

      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>Weekly Summary</h2>
        <p>Total Items: {weeklyData.summary?.totalItems || 0}</p>
        <p>Total Cost: {weeklyData.summary?.totalCost || 0}</p>
        <p>Entries: {weeklyData.summary?.itemsCount || 0}</p>
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>Monthly Summary</h2>
        <p>Total Items: {monthlyData.summary?.totalItems || 0}</p>
        <p>Total Cost: {monthlyData.summary?.totalCost || 0}</p>
        <p>Entries: {monthlyData.summary?.itemsCount || 0}</p>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

