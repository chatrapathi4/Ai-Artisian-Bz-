
import { useState, useEffect } from 'react';
import api from '../services/api.js';
import '../css/HomePage.css';

export const MyOrders = () => {
  const [productions, setProductions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 0,
    totalCost: 0,
    notes: '',
  });

  useEffect(() => {
    fetchProductions();
  }, []);

  const fetchProductions = async () => {
    setLoading(true);
    const response = await api.production.getAll();

    if (response.success) {
      setProductions(response.data);
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
    const response = await api.production.create(formData);

    if (response.success) {
      setFormData({
        itemName: '',
        quantity: 0,
        totalCost: 0,
        notes: '',
      });
      setShowForm(false);
      fetchProductions();
    } else {
      setError(response.error);
    }
  };

  const handleDelete = async (id) => {
    const response = await api.production.delete(id);

    if (response.success) {
      fetchProductions();
    } else {
      setError(response.error);
    }
  };

  if (loading) {
    return <div className="homepage">Loading...</div>;
  }

  return (
    <div className="homepage">
      <h1>My Production Orders</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Production'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="totalCost"
            placeholder="Total Cost"
            value={formData.totalCost}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
          <button type="submit">Add Production</button>
        </form>
      )}

      <div>
        {productions.length === 0 ? (
          <p>No production entries yet</p>
        ) : (
          productions.map((prod) => (
            <div
              key={prod._id}
              style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px 0',
              }}
            >
              <h3>{prod.itemName}</h3>
              <p>Quantity: {prod.quantity}</p>
              <p>Cost: {prod.totalCost}</p>
              <p>Date: {new Date(prod.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleDelete(prod._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

