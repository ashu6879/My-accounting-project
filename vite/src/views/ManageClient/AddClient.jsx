import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingButton from 'ui-component/LoadingButton'; // Import the LoadingButton component

const AddClient = () => {
  const [clientData, setClientData] = useState({
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientGst:"",
    clientEmail: '',
    clientCat: '', // Updated from 'category'
  });
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state for form submission
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch client categories on component mount
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:81/clientcategories/all');
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
    setLoading(true); // Set loading to true when form submission starts

    try {
      const response = await fetch('http://localhost:81/clients', {
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
        clientGst:"",
        clientCat: '', // Updated from 'category'
      });

      setTimeout(() => {
        navigate('/ManageClient/edit');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false when form submission ends
    }
  };

  if (authLoading) {
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
          label="GST Number"
          name="clientGst"
          variant="outlined"
          fullWidth
          value={clientData.clientGST}
          onChange={handleChange}
          margin="normal"
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
              <MenuItem key={category.ccID} value={category.ccID}>
                {category.ccName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading} // Pass loading state to LoadingButton
        >
          Add Client
        </LoadingButton>
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
