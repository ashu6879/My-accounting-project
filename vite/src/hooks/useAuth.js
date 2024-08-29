// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      } else {
        navigate('/'); // Redirect to login page if not authenticated
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  return { isAuthenticated, loading };
};

export default useAuth;
