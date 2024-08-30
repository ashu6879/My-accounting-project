import React, { useEffect, useState } from 'react';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogTitle, Box, TextField, MenuItem, Drawer, List,
  ListItem, ListItemText
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
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
      fetchCategories();
    }
  }, [isAuthenticated, page]);

  const fetchClients = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.vercel.app/clients?page=${page}&limit=${limit}`);
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
      const response = await fetch('https://ekarigar-accounts.vercel.app/clientcategories');
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
      const response = await fetch(`https://ekarigar-accounts.vercel.app/clients/${clientToDelete._id}`, {
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
      const response = await fetch(`https://ekarigar-accounts.vercel.app/clients/${clientToUpdate._id}`, {
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

      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

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

      {/* Update Client Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Address"
            fullWidth
            value={updateAddress}
            onChange={(e) => setUpdateAddress(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Phone"
            fullWidth
            value={updatePhone}
            onChange={(e) => setUpdatePhone(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
          <TextField
            select
            margin="dense"
            label="Category"
            fullWidth
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
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Client Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{clientToDelete?.clientName}" client?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for error messages */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Snackbar for success messages */}
      <Snackbar
        open={Boolean(success)}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Responsive Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
      >
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Clients" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Drawer>
    </Container>
  );
};

export default CategoryList;
