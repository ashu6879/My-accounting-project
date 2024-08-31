import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';
import LoadingButton from 'ui-component/LoadingButton'; // Assuming you have this custom component
import useAuth from 'hooks/useAuth';

const GenerateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [invoiceData, setInvoiceData] = useState({
    clientID: '',
    projectID: '',
    clientName: '',
    clientAddress: '',
    clientPhone: '',
    clientCell: '',
    clientFax: '',
    clientEmail: '',
    projectTitle: '',
    ServicedBy: '',
    SaledoneBy: '',
    ApprovedBy: '',
    ProgressBy: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Fetch clients on component mount
    const fetchClients = async () => {
      try {
        const response = await fetch('https://ekarigar-accounts.vercel.app/clients');
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
      setInvoiceData({
        ...invoiceData,
        clientID: client.clientID,
        clientName: client.clientName,
        clientAddress: client.clientAddress,
        clientPhone: client.clientPhone,
        clientCell: client.clientCell,
        clientFax: client.clientFax,
        clientEmail: client.clientEmail,
      });

      // Fetch projects for the selected client
      try {
        const response = await fetch(`https://ekarigar-accounts.vercel.app/${clientID}`);
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
      setInvoiceData({
        ...invoiceData,
        projectID: project.projectID,
        projectTitle: project.projectTitle,
        ServicedBy: project.ServicedBy,
        SaledoneBy: project.SaledoneBy,
        ApprovedBy: project.ApprovedBy,
        ProgressBy: project.ProgressBy,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send invoice data to your backend API
      const response = await fetch('https://ekarigar-accounts.vercel.app/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Failed to generate invoice');
      }

      setSuccess('Invoice generated successfully!');
      setInvoiceData({
        clientID: '',
        projectID: '',
        clientName: '',
        clientAddress: '',
        clientPhone: '',
        clientCell: '',
        clientFax: '',
        clientEmail: '',
        projectTitle: '',
        ServicedBy: '',
        SaledoneBy: '',
        ApprovedBy: '',
        ProgressBy: '',
      });
      setProjects([]);
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
          {/* Client Selection */}
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

          {/* Project Selection */}
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

          {/* Client Information (Auto-filled) */}
          <Grid item xs={12}>
            <TextField
              label="Client Name"
              name="clientName"
              variant="outlined"
              fullWidth
              value={invoiceData.clientName}
              disabled
              margin="normal"
            />
            <TextField
              label="Client Address"
              name="clientAddress"
              variant="outlined"
              fullWidth
              value={invoiceData.clientAddress}
              disabled
              margin="normal"
            />
            <TextField
              label="Client Phone"
              name="clientPhone"
              variant="outlined"
              fullWidth
              value={invoiceData.clientPhone}
              disabled
              margin="normal"
            />
            <TextField
              label="Client Cell"
              name="clientCell"
              variant="outlined"
              fullWidth
              value={invoiceData.clientCell}
              disabled
              margin="normal"
            />
            <TextField
              label="Client Fax"
              name="clientFax"
              variant="outlined"
              fullWidth
              value={invoiceData.clientFax}
              disabled
              margin="normal"
            />
            <TextField
              label="Client Email"
              name="clientEmail"
              variant="outlined"
              fullWidth
              value={invoiceData.clientEmail}
              disabled
              margin="normal"
            />
          </Grid>

          {/* Project Information (Auto-filled) */}
          <Grid item xs={12}>
            <TextField
              label="Project Title"
              name="projectTitle"
              variant="outlined"
              fullWidth
              value={invoiceData.projectTitle}
              disabled
              margin="normal"
            />
            <TextField
              label="Serviced By"
              name="ServicedBy"
              variant="outlined"
              fullWidth
              value={invoiceData.ServicedBy}
              disabled
              margin="normal"
            />
            <TextField
              label="Sale Done By"
              name="SaledoneBy"
              variant="outlined"
              fullWidth
              value={invoiceData.SaledoneBy}
              disabled
              margin="normal"
            />
            <TextField
              label="Approved By"
              name="ApprovedBy"
              variant="outlined"
              fullWidth
              value={invoiceData.ApprovedBy}
              disabled
              margin="normal"
            />
            <TextField
              label="Progress By"
              name="ProgressBy"
              variant="outlined"
              fullWidth
              value={invoiceData.ProgressBy}
              disabled
              margin="normal"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              loading={loading}
            >
              Generate Invoice
            </LoadingButton>
          </Grid>
        </Grid>
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

export default GenerateInvoice;
