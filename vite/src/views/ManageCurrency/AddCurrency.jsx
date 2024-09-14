import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { IconCurrencyDollar, IconCurrencyEuro, IconCurrencyRupee, IconSearch } from '@tabler/icons-react';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import LoadingButton from 'ui-component/LoadingButton';

// Define a list of currency icons and their labels
const currencyIcons = [
  { value: 'USD', label: 'Dollar', icon: <IconCurrencyDollar size={48} /> },
  { value: 'EUR', label: 'Euro', icon: <IconCurrencyEuro size={48} /> },
  { value: 'INR', label: 'Rupee', icon: <IconCurrencyRupee size={48} /> },
  // Add more currency icons as needed
];

const AddiconCurrency = () => {
  const [currencyData, seticonCurrencyData] = useState({
    currencyName: '',
    currencySymbol: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(currencyIcons);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    seticonCurrencyData({
      ...currencyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = currencyIcons.filter(icon => 
      icon.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredIcons(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/currencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add currency');
      }

      setSuccess('Currency added successfully!');
      seticonCurrencyData({
        currencyName: '',
        currencySymbol: '',
      });

      setTimeout(() => {
        navigate('/ManageiconCurrency/edit');
      }, 2000);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
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
        Add Currency
      </Typography>
      <TextField
        placeholder="Search currencies..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          endAdornment: <IconSearch size={24} />,
        }}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={2} justifyContent="center">
        {filteredIcons.map((currency) => (
          <Grid item xs={6} sm={4} md={2} display="flex" flexDirection="column" alignItems="center" key={currency.value}>
            {currency.icon}
            <Typography variant="caption">{currency.label}</Typography>
          </Grid>
        ))}
      </Grid>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Currency Name"
          name="currencyName"
          variant="outlined"
          fullWidth
          value={currencyData.currencyName}
          onChange={handleChange}
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Currency Symbol</InputLabel>
          <Select
            name="currencySymbol"
            value={currencyData.currencySymbol}
            onChange={handleChange}
            label="Currency Symbol"
          >
            {filteredIcons.map((currency) => (
              <MenuItem key={currency.value} value={currency.value}>
                {currency.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          loading={loading}
        >
          Add Currency
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

export default AddiconCurrency;
