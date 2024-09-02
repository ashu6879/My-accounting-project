import React, { useState, useEffect } from 'react';
import {
  Button,TextField,Container,Typography,Snackbar,Alert,MenuItem,Select,InputLabel, FormControl,Grid,
} from '@mui/material';
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
        clientEmail: client.clientEmail,
      });

      try {
        const response = await fetch(`https://ekarigar-accounts.vercel.app/getProjectByClientID/${clientID}`);
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
          {/* Row with Two Columns */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {/* Client Selection Column */}
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

              {/* Project Selection Column */}
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

          {/* Client Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Client Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Client Name"
                  name="clientName"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.clientName}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Client Address"
                  name="clientAddress"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.clientAddress}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Client Phone"
                  name="clientPhone"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.clientPhone}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>

          {/* Project Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Project Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Title"
                  name="projectTitle"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.projectTitle}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Serviced By"
                  name="ServicedBy"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.ServicedBy}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Saledone By"
                  name="SaledoneBy"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.SaledoneBy}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Approved By"
                  name="ApprovedBy"
                  variant="outlined"
                  fullWidth
                  value={invoiceData.ApprovedBy}
                  disabled
                  margin="normal"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={loading}
            >
              Generate Invoice
            </LoadingButton>
          </Grid>
        </Grid>
      </form>

      {/* Success or Error Message */}
      <Snackbar open={!!success} autoHideDuration={60000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={60000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GenerateInvoice;
