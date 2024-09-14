import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Box, TextField
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAuth from 'hooks/useAuth'; // Import the custom hook

const CategoryList = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [clientToUpdate, setClientToUpdate] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(20); // Number of items per page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available
  const [updateName, setUpdateName] = useState(''); // State for the name to be updated
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth(); // Use the custom hook

  useEffect(() => {
    if (isAuthenticated) {
      fetchClients();
    }
  }, [page, isAuthenticated, searchTerm]); // Include searchTerm in the dependencies

  const fetchClients = async () => {
    try {
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/clientcategories?page=${page}&limit=${limit}&search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      
      // Check if there are more items to load
      setHasMore(data.length === limit);
      
      setClients((prevClients) => [...prevClients, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (client) => {
    setClientToUpdate(client);
    setUpdateName(client.ccName); // Set the current name for updating
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
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/clientcategories/${clientToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete client');
      }

      setSuccess('Category deleted successfully');
      setClients(clients.filter((client) => client._id !== clientToDelete._id));
      handleDeleteDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/clientcategories/${clientToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ccName: updateName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update client');
      }

      setSuccess('Category updated successfully');
      setClients(clients.map((client) =>
        client._id === clientToUpdate._id ? { ...client, ccName: updateName } : client
      ));
      handleUpdateDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset page number to 1 when search term changes
    setClients([]); // Clear existing clients when search term changes
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (!isAuthenticated) {
    return null; // Optionally handle redirection or render nothing
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Category List
      </Typography>
      <TextField
        label="Search Client Categories"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Typography variant="h6" gutterBottom>
        Total Clients As per page: {clients.length}
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Sr. No.
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                Client Name
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <TableRow key={client._id}>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {client.ccName}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(client)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(client)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Client</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the client "{clientToDelete?.ccName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Client Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Client Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the client Category name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Client Name"
            type="text"
            fullWidth
            variant="outlined"
            value={updateName} // Displays the old name here
            onChange={(e) => setUpdateName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="secondary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CategoryList;
