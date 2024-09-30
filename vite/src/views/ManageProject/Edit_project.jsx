import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, TableContainer, DialogContent,
  DialogTitle, Box, TextField, MenuItem
} from '@mui/material';
import { Edit, Delete, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth'; // Import the custom hook

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [projectCategories, setProjectCategories] = useState([]);
  const [clientCategories, setClientCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(20); // Number of items per page
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available
  const [updateName, setUpdateName] = useState('');
  const [updateServicedBy, setUpdateServicedBy] = useState('');
  const [updateSaledoneBy, setUpdateSaledoneBy] = useState('');
  const [updateApprovedBy, setUpdateApprovedBy] = useState('');
  const [updateCategory, setUpdateCategory] = useState('');
  const [updateclients, setUpdateclients] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // Initialize drawer state
  const [search, setSearch] = useState(''); // Search term
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchCategories();
      fetchClientCategories();
    }
  }, [isAuthenticated, page,search]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`https://my-accounting-u7vs.onrender.com/projects?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setHasMore(data.length === limit);
      setProjects((prevProjects) => [...prevProjects, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://my-accounting-u7vs.onrender.com/projectcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch project categories');
      }
      const data = await response.json();
      console.log('Fetched project categories:', data);
      if (Array.isArray(data)) {
        setProjectCategories(data);
      } else {
        throw new Error('Project categories data is not an array');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchClientCategories = async () => {
    try {
      const response = await fetch('https://my-accounting-u7vs.onrender.com/clients');
      if (!response.ok) {
        throw new Error('Failed to fetch clients');
      }
      const data = await response.json();
      console.log('Fetched client', data);
      if (Array.isArray(data)) {
        setClientCategories(data);
      } else {
        throw new Error('Client categories data is not an array');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (project) => {
    setProjectToUpdate(project);
    setUpdateName(project.projectTitle);
    setUpdateServicedBy(project.ServicedBy);
    setUpdateSaledoneBy(project.SaledoneBy);
    setUpdateApprovedBy(project.ApprovedBy);
    setUpdateCategory(project.projectCat);
    setUpdateclients(project.clientID); // Fixed typo
    setUpdateDialogOpen(true);
  };

  const handleDeleteDialogOpen = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setProjectToUpdate(null);
  };
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page to 1 when search term changes
    setProjects([]); // Clear current categories to show filtered results
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://my-accounting-u7vs.onrender.com/projects/${projectToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      setSuccess('Project deleted successfully');
      setProjects(projects.filter((project) => project._id !== projectToDelete._id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://my-accounting-u7vs.onrender.com/projects/${projectToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectTitle: updateName,
          ServicedBy: updateServicedBy,
          SaledoneBy: updateSaledoneBy,
          ApprovedBy: updateApprovedBy,
          projectCat: updateCategory,
          clientCat: updateclients, // Fixed typo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      setSuccess('Project updated successfully');
      setProjects(projects.map((project) =>
        project._id === projectToUpdate._id ? { ...project, projectTitle: updateName, ServicedBy: updateServicedBy, SaledoneBy: updateSaledoneBy, ApprovedBy: updateApprovedBy, projectCat: updateCategory, clientCat: updateclients } : project
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
        Project List
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Projects As per page: {projects.length}
      </Typography>
      {/* Search Input */}
      <TextField
        label="Search projects"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange} // Update search term and reset categories
        placeholder="Search by project name"
      />
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
                  Project Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Service By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Sale Done By
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Approved By
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
            {projects.map((project, index) => (
              <TableRow key={project._id}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {project.projectTitle}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {project.ServicedBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {project.SaledoneBy}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {project.ApprovedBy}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton color="primary" onClick={() => handleEdit(project)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(project)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                transform: 'scale(1.05)', // Slightly enlarge button on hover
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this "{projectToDelete?.projectTitle}" project?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Name"
            fullWidth
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Serviced By"
            fullWidth
            value={updateServicedBy}
            onChange={(e) => setUpdateServicedBy(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Sale Done By"
            fullWidth
            value={updateSaledoneBy}
            onChange={(e) => setUpdateSaledoneBy(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Approved By"
            fullWidth
            value={updateApprovedBy}
            onChange={(e) => setUpdateApprovedBy(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Project Category"
            select
            fullWidth
            value={updateCategory}
            onChange={(e) => setUpdateCategory(e.target.value)}
          >
            {projectCategories.map((category) => (
              <MenuItem key={category.pcID} value={category.pcID}>
                {category.pcName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
          margin="dense"
          label="Client"
          select
          fullWidth
          value={updateclients}
          onChange={(e) => setUpdateclients(e.target.value)}
        >
          {clientCategories.map((category) => (
            <MenuItem key={category.clientID} value={category.clientID}>
              {category.clientName}
            </MenuItem>
          ))}
        </TextField>
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

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProjectList;
