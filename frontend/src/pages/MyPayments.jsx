import { useState, useEffect } from 'react';
import api from '../services/api.js';
import '../css/HomePage.css';

export const MyPayments = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    weeklyEarnings: 0,
    monthlyEarnings: 0,
    totalEarnings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    paymentMethod: '',
    description: '',
  });

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    const response = await api.payment.getAll();

    if (response.success) {
      setPayments(response.data);
    } else {
      setError(response.error);
    }
  };

  const fetchStats = async () => {
    const response = await api.payment.getStats();

    if (response.success) {
      setStats(response.data);
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await api.payment.create(formData);

    if (response.success) {
      setFormData({
        amount: 0,
        paymentMethod: '',
        description: '',
      });
      setShowForm(false);
      fetchPayments();
      fetchStats();
    } else {
      setError(response.error);
    }
  };

  if (loading) {
    return <div className="homepage">Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>My Payments and Earnings</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px' }}>
        <h2>Earnings Summary</h2>
        <p>Weekly Earnings: {stats.weeklyEarnings}</p>
        <p>Monthly Earnings: {stats.monthlyEarnings}</p>
        <p>Total Earnings: {stats.totalEarnings}</p>
      </div>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Record Payment'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={formData.paymentMethod}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Record Payment</button>
        </form>
      )}

      <div>
        <h2>Payment History</h2>
        {payments.length === 0 ? (
          <p>No payments recorded yet</p>
        ) : (
          payments.map((payment) => (
            <div
              key={payment._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <p>Amount: {payment.amount}</p>
              <p>Method: {payment.paymentMethod}</p>
              <p>Status: {payment.status}</p>
              <p>Date: {new Date(payment.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
