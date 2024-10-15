// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null); // Add state for token
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setIsAuthenticated(true);
        setToken(storedToken); // Store token in state
      } else {
        navigate('/'); // Redirect to login page if not authenticated
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated, loading, token }; // Return token
};

export default useAuth;
