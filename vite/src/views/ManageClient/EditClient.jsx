import React, { useEffect, useState } from 'react';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogTitle, Box, TextField, MenuItem, Drawer, List,
  ListItem, ListItemText, TableContainer, Paper
} from '@mui/material';
import { Edit, Delete, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth'; // Import the custom hook

const CategoryList = () => {
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToUpdate, setClientToUpdate] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(20); // Number of items per page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available
  const [updateName, setUpdateName] = useState('');
  const [updateAddress, setUpdateAddress] = useState('');
  const [updatePhone, setUpdatePhone] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState(''); // Search term
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
      fetchCategories();
    }
  }, [isAuthenticated, page, search]); // Add `search` to dependency array

  const fetchClients = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/clients?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      setHasMore(data.length === limit);
      setClients((prevClients) => [...prevClients, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://ekarigar-accounts.onrender.com/clientcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (client) => {
    setClientToUpdate(client);
    setUpdateName(client.clientName);
    setUpdateAddress(client.clientAddress);
    setUpdatePhone(client.clientPhone);
    setUpdateEmail(client.clientEmail);
    setUpdateCategory(client.clientCat);
    setUpdateDialogOpen(true);
  };

  const handleDeleteDialogOpen = (client) => {
    setClientToDelete(client);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setClientToDelete(null);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setClientToUpdate(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/clients/${clientToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete client');
      }

      setSuccess('Client deleted successfully');
      setClients(clients.filter((client) => client._id !== clientToDelete._id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/clients/${clientToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: updateName,
          clientAddress: updateAddress,
          clientPhone: updatePhone,
          clientEmail: updateEmail,
          clientCat: updateCategory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update client');
      }

      setSuccess('Client updated successfully');
      setClients(clients.map((client) =>
        client._id === clientToUpdate._id ? { ...client, clientName: updateName, clientAddress: updateAddress, clientPhone: updatePhone, clientEmail: updateEmail, clientCat: updateCategory } : client
      ));
      handleUpdateDialogClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page number when search term changes
    setClients([]); // Clear existing clients when search term changes
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Client List
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Clients As per page: {clients.length}
      </Typography>

      <Box mb={2}>
        <TextField
          label="Search Clients Name"
          variant="outlined"
          fullWidth
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Sr. No.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Client Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Mobile Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Email
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={client._id}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {client.clientName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {client.clientPhone}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {client.clientEmail}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEdit(client)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(client)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Load More Button */}
      {hasMore && (
        <Box textAlign="right" mt={2}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleLoadMore}
            sx={{
              transition: 'all 0.3s ease', // Smooth transition for hover effect
              '&:hover': {
                backgroundColor: '#003d99', // Darker background on hover
                color: 'white',
                transform: 'scale(1.05)', // Slightly enlarge the button
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Add shadow on hover
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {clientToDelete?.clientName}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button color="secondary" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Client</DialogTitle>
        <DialogContent>
          <TextField
            label="Client Name"
            fullWidth
            margin="normal"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={updateAddress}
            onChange={(e) => setUpdateAddress(e.target.value)}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            value={updatePhone}
            onChange={(e) => setUpdatePhone(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
          <TextField
            label="Category"
            select
            fullWidth
            margin="normal"
            value={updateCategory}
            onChange={(e) => setUpdateCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.ccID} value={category.ccID}>
                {category.ccName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={Boolean(success)}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <List>
          <ListItem button onClick={() => navigate('/home')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate('/clients')}>
            <ListItemText primary="Clients" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
};

export default CategoryList;
