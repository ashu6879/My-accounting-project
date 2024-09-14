import React from 'react';
import { TextField, Container, Typography, Snackbar, Alert } from '@mui/material';
import LoadingButton from 'ui-component/LoadingButton'; // Import the LoadingButton component
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
  const [ccName, setCcName] = React.useState('');
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCcName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://ec2-35-154-230-63.ap-south-1.compute.amazonaws.com:8181/clientcategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ccName }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add client');
      }

      setSuccess('Category added successfully!');
      setCcName('');
      setTimeout(() => {
        navigate('/category/edit');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading after the request is complete
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
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
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

export default AddCategory;
