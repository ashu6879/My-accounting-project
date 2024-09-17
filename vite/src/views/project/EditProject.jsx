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

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [search, setSearch] = useState(''); // Search term
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(20); // Number of items per page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth(); // Use the custom hook

  useEffect(() => {
    if (isAuthenticated) {
      fetchCategories();
    }
  }, [page, isAuthenticated, search]); // Fetch categories whenever page or search changes

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://ekarigar-accounts.onrender.com/projectcategories?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      
      // Check if there are more items to load
      setHasMore(data.length === limit);
      
      setCategories((prevCategories) => [...prevCategories, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page to 1 when search term changes
    setCategories([]); // Clear current categories to show filtered results
  };

  const handleEdit = (category) => {
    setCategoryToUpdate(category);
    setUpdateName(category.pcName);
    setUpdateDialogOpen(true);
  };

  const handleDeleteDialogOpen = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setCategoryToUpdate(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/projectcategories/${categoryToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setSuccess('Project Category deleted successfully');
      setCategories(categories.filter((category) => category._id !== categoryToDelete._id));
      handleDeleteDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/projectcategories/${categoryToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pcName: updateName }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      setSuccess('Project Category updated successfully');
      setCategories(categories.map((category) =>
        category._id === categoryToUpdate._id ? { ...category, pcName: updateName } : category
      ));
      handleUpdateDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
        Project Categories
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Categories As per page: {categories.length}
      </Typography>
      {/* Search Input */}
      <TextField
        label="Search projects"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange} // Update search term and reset categories
        placeholder="Search by category name"
      />
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
                Category Name
              </Typography>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category, index) => (
            <TableRow key={category._id}>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {category.pcName}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => handleEdit(category)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(category)}>
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
        <DialogTitle>Delete Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{categoryToDelete?.pcName}"?
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

      {/* Update Category Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Update Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update the category name:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="outlined"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
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
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CategoriesList;
