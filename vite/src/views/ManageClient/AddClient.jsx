import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddClient = () => {
  const [clientData, setClientData] = useState({
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientEmail: '',
    clientCat: '', // Updated from 'category'
  });
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch client categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://ekarigar-accounts.vercel.app/clientcategories/all');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://ekarigar-accounts.vercel.app/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add client');
      }

      setSuccess('Client added successfully!');
      setClientData({
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientEmail: '',
        clientCat: '', // Updated from 'category'
      });

      setTimeout(() => {
        navigate('/ManageClient/edit');
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Client
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="clientName"
          variant="outlined"
          fullWidth
          value={clientData.clientName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="clientAddress"
          variant="outlined"
          fullWidth
          value={clientData.clientAddress}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="clientPhone"
          variant="outlined"
          fullWidth
          value={clientData.clientPhone}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="clientEmail"
          variant="outlined"
          fullWidth
          value={clientData.clientEmail}
          onChange={handleChange}
          margin="normal"
          required
        />

        {/* Dropdown for selecting a category */}
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="category-label">Client Category</InputLabel>
          <Select
            labelId="category-label"
            id="clientCat"
            name="clientCat" // Updated from 'category'
            value={clientData.clientCat}
            onChange={handleChange}
            label="Client Category"
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.ccName}>
                {category.ccName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Client
        </Button>
      </form>

      {/* Success Snackbar */}
      {success && (
        <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
      )}

      {/* Error Snackbar */}
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default AddClient;
