import React from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert } from '@mui/material';
import useAuth from 'hooks/useAuth'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Add navigation hook

const AddCategory = () => {
  const [ccName, setCcName] = React.useState(''); // Updated state variable
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const { isAuthenticated, loading } = useAuth(); // Use the custom hook
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleChange = (e) => {
    setCcName(e.target.value); // Updated field name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:81/clientcategories', { // Updated endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ccName }), // Updated field name
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add client');
      }

      setSuccess('Category added successfully!');
      setCcName('');

      // Redirect to the clients list or any other page
      setTimeout(() => {
        navigate('/category/edit'); // Updated redirect path
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Optionally handle redirection or render nothing
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={ccName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Category
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

export default AddCategory;
