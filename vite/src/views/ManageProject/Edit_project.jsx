import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';

import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions,TableContainer, DialogContent,
  DialogTitle, Box, TextField, MenuItem, Drawer, List,
  ListItem, ListItemText
} from '@mui/material';
import { Edit, Delete, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth'; // Import the custom hook

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects();
      fetchCategories();
    }
  }, [isAuthenticated, page]);

  const fetchProjects = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.vercel.app/projects?page=${page}&limit=${limit}`);
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
      const response = await fetch('https://ekarigar-accounts.vercel.app/projectcategories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      console.log('Fetched categories:', data); // Check the structure here
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        throw new Error('Categories data is not an array');
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

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.vercel.app/projects/${projectToDelete._id}`, {
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
      const response = await fetch(`https://ekarigar-accounts.vercel.app/projects/${projectToUpdate._id}`, {
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
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      setSuccess('Project updated successfully');
      setProjects(projects.map((project) =>
        project._id === projectToUpdate._id ? { ...project, projectTitle: updateName, ServicedBy: updateServicedBy, SaledoneBy: updateSaledoneBy, ApprovedBy: updateApprovedBy, projectCat: updateCategory } : project
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
                backgroundColor: '#003d99', // Darker shade on hover
                color: '#ffffff', // Text color change on hover
              },
            }}
          >
            Load More
          </Button>
        </Box>
      )}

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {projects.map((project) => (
            <ListItem button key={project._id} onClick={() => handleEdit(project)}>
              <ListItemText primary={project.projectTitle} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Project</DialogTitle>
        <DialogContent>
          <TextField
            label="Project Name"
            fullWidth
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Service By"
            fullWidth
            value={updateServicedBy}
            onChange={(e) => setUpdateServicedBy(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Sale Done By"
            fullWidth
            value={updateSaledoneBy}
            onChange={(e) => setUpdateSaledoneBy(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Approved By"
            fullWidth
            value={updateApprovedBy}
            onChange={(e) => setUpdateApprovedBy(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            select
            label="Category"
            fullWidth
            value={updateCategory}
            onChange={(e) => setUpdateCategory(e.target.value)}
            sx={{ marginBottom: 2 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.categoryName}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete "{projectToDelete?.projectTitle}" project?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(success)}
        autoHideDuration={6000}
        onClose={() => setSuccess('')}
      >
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError('')}
      >
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProjectList;
