import React from 'react';
import { TextField, Container, Typography, Snackbar, Alert } from '@mui/material';
import LoadingButton from 'ui-component/LoadingButton'; // Import your custom LoadingButton
import useAuth from 'hooks/useAuth'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Add navigation hook

const AddProject = () => {
  const [category, setCategory] = React.useState('');
  const [loading, setLoading] = React.useState(false); // State to manage loading
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const { isAuthenticated, loading: authLoading } = useAuth(); // Use the custom hook
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://my-accounting-u7vs.onrender.com/projectcategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pcName: category }), // Updated field name to 'pcName'
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add category');
      }

      setSuccess('Project Category added successfully!');
      setCategory('');

      // Redirect to the categories list or any other page
      setTimeout(() => {
        navigate('/project/edit');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (authLoading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Optionally handle redirection or render nothing
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Project Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          variant="outlined"
          fullWidth
          value={category}
          onChange={handleChange}
          margin="normal"
          required
        />
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading} // Pass loading state to the button
        >
          Add Category
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

export default AddProject;
