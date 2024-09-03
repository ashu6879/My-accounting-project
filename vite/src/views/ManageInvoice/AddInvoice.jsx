import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, Grid, Box
} from '@mui/material';
import LoadingButton from 'ui-component/LoadingButton'; // Assuming you have this custom component
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import useAuth from 'hooks/useAuth';

const GenerateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([{ invID: 1, itemDesc: '', itemQty: 0, itemRate: 0 }]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    clientID: '',
    projectID: '',
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://ekarigar-accounts.onrender.com/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        setError('Failed to fetch clients');
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = async (event) => {
    const clientID = event.target.value;
    const client = clients.find(c => c.clientID === clientID);

    if (client) {
      setSelectedClient(client);
      setInvoiceData(prevData => ({
        ...prevData,
        clientID: client.clientID,
      }));

      try {
        const response = await fetch(`https://ekarigar-accounts.onrender.com/getProjectByClientID/${clientID}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError('Failed to fetch projects for the selected client');
      }
    }
  };

  const handleProjectChange = (event) => {
    const projectID = event.target.value;
    const project = projects.find(p => p.projectID === projectID);
    if (project) {
      setSelectedProject(project);
      setInvoiceData(prevData => ({
        ...prevData,
        projectID: project.projectID,
      }));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvoiceData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...invoiceItems];
    newItems[index] = { ...newItems[index], [name]: value };
    setInvoiceItems(newItems);
  };

  const addItem = () => {
    setInvoiceItems(prevItems => [
      ...prevItems,
      { invID: prevItems.length + 1, itemDesc: '', itemQty: 0, itemRate: 0 }
    ]);
  };

  const removeItem = (index) => {
    setInvoiceItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const postData = {
      clientID: invoiceData.clientID,
      projectID: invoiceData.projectID,
      remarks: invoiceData.remarks,
    };

    try {
      const response = await fetch('https://ekarigar-accounts.onrender.com/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to generate invoice');
      }

      // Send invoice items
      await Promise.all(invoiceItems.map(async (item) => {
        const itemResponse = await fetch('https://ekarigar-accounts.onrender.com/invoiceItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...item,
            invID: postData.clientID, // You may need to adjust this if `invID` needs to be set differently
          }),
        });

        if (!itemResponse.ok) {
          const errorMessage = await itemResponse.text();
          throw new Error(errorMessage || 'Failed to add invoice item');
        }
      }));

      setSuccess('Invoice generated successfully!');
      setInvoiceData({
        clientID: '',
        projectID: '',
        remarks: '',
      });
      setInvoiceItems([{ invID: 1, itemDesc: '', itemQty: 0, itemRate: 0 }]);
      setProjects([]);
      setSelectedClient(null);
      setSelectedProject(null);
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
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Generate Invoice
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Client and Project Selection */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="client-label">Select Client</InputLabel>
                  <Select
                    labelId="client-label"
                    id="clientID"
                    name="clientID"
                    value={invoiceData.clientID}
                    onChange={handleClientChange}
                    label="Select Client"
                  >
                    {clients.map(client => (
                      <MenuItem key={client.clientID} value={client.clientID}>
                        {client.clientName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="project-label">Select Project</InputLabel>
                  <Select
                    labelId="project-label"
                    id="projectID"
                    name="projectID"
                    value={invoiceData.projectID}
                    onChange={handleProjectChange}
                    label="Select Project"
                    disabled={!selectedClient}
                  >
                    {projects.map(project => (
                      <MenuItem key={project.projectID} value={project.projectID}>
                        {project.projectTitle}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          {/* Client and Project Details */}
          {selectedClient && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Client Details
              </Typography>
              <Box mb={2}>
                <Typography variant="subtitle1">
                  Client Name: {selectedClient.clientName}
                </Typography>
                <Typography variant="subtitle1">
                  Client Email: {selectedClient.clientEmail}
                </Typography>
                <Typography variant="subtitle1">
                  Client Address: {selectedClient.clientAddress}
                </Typography>
              </Box>
            </Grid>
          )}
          {selectedProject && (
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Project Details
              </Typography>
              <Box mb={2}>
                <Typography variant="subtitle1">
                  Project Title: {selectedProject.projectTitle}
                </Typography>
                <Typography variant="subtitle1">
                  Serviced By: {selectedProject.ServicedBy}
                </Typography>
                <Typography variant="subtitle1">
                  Sale done By: {selectedProject.SaledoneBy}
                </Typography>
                <Typography variant="subtitle1">
                  Approved By: {selectedProject.ApprovedBy}
                </Typography>
                <Typography variant="subtitle1">
                  Progress By: {selectedProject.ProgressBy}
                </Typography>
              </Box>
            </Grid>
          )}
          {/* Invoice Items */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Invoice Items
            </Typography>
            <Button variant="outlined" color="primary" onClick={addItem}>
              Add Item
            </Button>
            {invoiceItems.map((item, index) => (
              <Box key={index} mt={2}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Description"
                      name="itemDesc"
                      variant="outlined"
                      fullWidth
                      value={item.itemDesc}
                      onChange={(event) => handleItemChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      label="Quantity"
                      name="itemQty"
                      variant="outlined"
                      fullWidth
                      value={item.itemQty}
                      onChange={(event) => handleItemChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      label="Rate"
                      name="itemRate"
                      variant="outlined"
                      fullWidth
                      value={item.itemRate}
                      onChange={(event) => handleItemChange(index, event)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeItem(index)}
                      startIcon={<DeleteIcon />}
                    >
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Grid>

          {/* Remarks */}
          <Grid item xs={12}>
            <TextField
              label="Remarks"
              name="remarks"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={invoiceData.remarks}
              onChange={handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <LoadingButton
              loading={loading}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Generate Invoice
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

      {/* Success/Error Messages */}
      {success && (
        <Snackbar open autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar open autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default GenerateInvoice;
