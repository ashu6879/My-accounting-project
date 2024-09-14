import React, { useState, useEffect } from 'react';
import {
  Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, Grid, Box
} from '@mui/material';
import LoadingButton from 'ui-component/LoadingButton'; // Assuming you have this custom component
import DeleteIcon from '@mui/icons-material/Delete'; // Import the Delete icon
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';



const GenerateInvoice = () => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([{ invID: 1, itemDesc: '', itemQty: 0, itemRate: 0 }]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currencies, setCurrencies] = useState([]); // State for currencies
  const [invoiceData, setInvoiceData] = useState({
    clientID: '',
    projectID: '',
    currencyID: '', // Add currency to the invoiceData state
    remarks: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [newCurrency, setNewCurrency] = useState('');
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const response = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/clients');
      const data = await response.json();
      setClients(data);
    } catch (error) {
      setError('Failed to fetch clients');
    }
  };
  
  const fetchCurrencies = async () => {
    try {
      const response = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/currencies');
      const data = await response.json();
      setCurrencies(data);
    } catch (error) {
      setError('Failed to fetch currencies');
    }
  };
  
  useEffect(() => {
    fetchClients();
    fetchCurrencies();
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
        const response = await fetch(`http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/getProjectByClientID/${clientID}`);
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
    setInvoiceItems(prevItems => {
      const newItems = [...prevItems];
      newItems[index] = { ...newItems[index], [name]: value };
      return newItems;
    });
  };
  

  const handleAddCurrency = async () => {
    try {
      const response = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/currencies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currency: newCurrency }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add currency');
      }
  
      setSuccess('Currency added successfully');
      setNewCurrency('');
      await fetchCurrencies(); // Ensure fetchCurrencies is available in scope
    } catch (error) {
      setError(error.message);
    }
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
      currencyID: invoiceData.currencyID, // Include currency in the postData
      remarks: invoiceData.remarks,
    };

    try {
      // Create the invoice
      const createResponse = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!createResponse.ok) {
        const errorMessage = await createResponse.text();
        throw new Error(errorMessage || 'Failed to generate invoice');
      }

      // Fetch the latest invoice ID
      const invoicesResponse = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/invoices');
      if (!invoicesResponse.ok) {
        const errorMessage = await invoicesResponse.text();
        throw new Error(errorMessage || 'Failed to fetch invoices');
      }

      const invoices = await invoicesResponse.json();
      if (invoices.length === 0) {
        throw new Error('No invoices found after creation');
      }

      // Assume invoices are sorted by creation date or ID in descending order
      const latestInvoice = invoices[0]; // Adjust as necessary based on your data
      const invID = latestInvoice.invID;

      if (!invID) {
        throw new Error('Invoice ID is null or undefined');
      }

      // Send invoice items
      await Promise.all(invoiceItems.map(async (item) => {
        if (!item || !item.itemDesc || item.itemQty === undefined || item.itemRate === undefined) {
          throw new Error('Invalid invoice item data');
        }

        const itemResponse = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/invoiceItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...item,
            invID, // Use the fetched invoice ID
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
        currencyID: '', // Reset currency
        remarks: '',
      });


      setInvoiceItems([{ invID: 1, itemDesc: '', itemQty: 0, itemRate: 0 }]);
      setProjects([]);
      setSelectedClient(null);
      setSelectedProject(null);

      setTimeout(() => {
        navigate('/ManageInvoice/edit');
      }, 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrencyID = e.target.value;
    setInvoiceData(prevData => ({
      ...prevData,
      currencyID: selectedCurrencyID // Correctly update currencyID in invoiceData
    }));
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

          {/* Currency Selection */}
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="currency-label">Select Currency</InputLabel>
                  <Select
                    labelId="currency-label"
                    id="currency"
                    name="currency"
                    value={invoiceData.currencyID}
                    onChange={handleCurrencyChange}
                    label="Select Currency"
                  >
                    {currencies.map(currency => (
                      <MenuItem key={currency.currencyID} value={currency.currencyID}>
                        {currency.currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4} container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    label="Add New Currency"
                    variant="outlined"
                    fullWidth
                    value={newCurrency}
                    onChange={(event) => setNewCurrency(event.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddCurrency}
                    fullWidth
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Client and Project Details */}
          {selectedClient && (
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
            <Button
              variant="outlined"
              color="primary"
              onClick={addItem}
            >
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
                      type="numeric"
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
                    />
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
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GenerateInvoice;
