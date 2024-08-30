import React, { useEffect, useState } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    ServicedBy: '',
    SaledoneBy: '',
    ApprovedBy: '',
    ProgressBy: '',
    clientID: '',
    projectCat: '',
  });
  const [clients, setClients] = useState([]); // State to store fetched clients
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch client data and categories on component mount
    const fetchClientsAndCategories = async () => {
      try {
        // Fetch clients
        const clientResponse = await fetch('https://ekarigar-accounts.vercel.app/clients');
        if (!clientResponse.ok) {
          throw new Error('Failed to fetch clients');
        }
        const clientData = await clientResponse.json();
        setClients(clientData);

        // Fetch categories
        const categoryResponse = await fetch('https://ekarigar-accounts.vercel.app/projectcategories');
        if (!categoryResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClientsAndCategories();
  }, []);

  const handleChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://ekarigar-accounts.vercel.app/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to add project');
      }

      setSuccess('Project added successfully!');
      setProjectData({
        projectTitle: '',
        ServicedBy: '',
        SaledoneBy: '',
        ApprovedBy: '',
        ProgressBy: '',
        clientID: '',
        projectCat: '',
      });

      setTimeout(() => {
        navigate('/ManageProject/edit');
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Project
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Project Title"
          name="projectTitle"
          variant="outlined"
          fullWidth
          value={projectData.projectTitle}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Serviced By"
          name="ServicedBy"
          variant="outlined"
          fullWidth
          value={projectData.ServicedBy}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Sale Done By"
          name="SaledoneBy"
          variant="outlined"
          fullWidth
          value={projectData.SaledoneBy}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Approved By"
          name="ApprovedBy"
          variant="outlined"
          fullWidth
          value={projectData.ApprovedBy}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Progress By"
          name="ProgressBy"
          variant="outlined"
          fullWidth
          value={projectData.ProgressBy}
          onChange={handleChange}
          margin="normal"
        />

        {/* Dropdown for selecting a client */}
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="client-label">Client</InputLabel>
          <Select
            labelId="client-label"
            id="clientID"
            name="clientID"
            value={projectData.clientID}
            onChange={handleChange}
            label="Client"
          >
            {clients.map((client) => (
              <MenuItem key={client._id} value={client._id}>
                {client.clientName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Dropdown for selecting a category */}
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="category-label">Project Category</InputLabel>
          <Select
            labelId="category-label"
            id="projectCat"
            name="projectCat"
            value={projectData.projectCat}
            onChange={handleChange}
            label="Project Category"
          >
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.pcName}>
                {category.pcName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Add Project
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

export default AddProject;
