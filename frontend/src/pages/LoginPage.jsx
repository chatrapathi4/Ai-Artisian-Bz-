import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import api from '../services/api.js';
import '../css/HomePage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await api.auth.login(formData);

    if (response.success) {
      navigate('/dashboard');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');

    const response = await api.auth.googleLogin(credentialResponse.credential);

    if (response.success) {
      navigate('/dashboard');
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  const handleGoogleError = () => {
    setError("Google login failed");
  };

  return (
    <div className="homepage">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div style={{ margin: '20px 0' }}>
        <p>Or login with Google:</p>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>

      <p>
        No account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};
