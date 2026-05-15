import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api.js';

export const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await api.auth.getCurrentUser();
      setIsAuthenticated(response.success);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
