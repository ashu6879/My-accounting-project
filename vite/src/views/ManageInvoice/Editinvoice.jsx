import React, { useEffect, useState } from 'react';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogTitle, Box, TextField, TableContainer, Paper
} from '@mui/material';
import { Edit, Delete, PictureAsPdf  } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { generatePDF } from '../../ui-component/generatePDF'; // Import the PDF generation function


const EditInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [invoiceToUpdate, setInvoiceToUpdate] = useState(null);
  const [updateItems, setUpdateItems] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState(''); // Search term
  const [hasMore, setHasMore] = useState(true); // Flag to check if more items are available
  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices(page);
    }
  }, [isAuthenticated, page,search]);

  const fetchInvoices = async (pageNumber) => {
    try {
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/invoices?page=${pageNumber}&limit=${limit}&search=${encodeURIComponent(search)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices((prevInvoices) => [...prevInvoices, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page to 1 when search term changes
    setInvoices([]); // Clear current categories to show filtered results
  };
  const fetchInvoiceItemsByInvID = async (invID) => {
    try {
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/getInvoiceItemByInvID/${invID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoice items');
      }
      const data = await response.json();
      setInvoiceItems(data);
      setUpdateItems(data.map(item => ({
        ...item,
        itemDesc: item.itemDesc || '',
        itemQty: item.itemQty || '',
        itemRate: item.itemRate || '',
      })));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (invoice) => {
    setInvoiceToUpdate(invoice);
    fetchInvoiceItemsByInvID(invoice.invID);
    setUpdateDialogOpen(true);
  };

  const handleDeleteDialogOpen = (invoice) => {
    setInvoiceToDelete(invoice);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setInvoiceToDelete(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/invoices/${invoiceToDelete._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete invoice: ${response.status} ${errorText}`);
      }
      setSuccess('Invoice deleted successfully');
      setInvoices((prevInvoices) =>
        prevInvoices.filter((invoice) => invoice._id !== invoiceToDelete._id)
      );
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Delete Error:', error);
      setError(error.message);
    }
  };

  // In the existing `handleUpdate` function
  const handleUpdate = async () => {
    try {
      const promises = updateItems.map(async (item) => {
        if (item.invtID) {
          // If the item has an invtID, it's an existing item and should be updated.
          const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/invoiceItem/${item.invtID}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              itemDesc: item.itemDesc,
              itemQty: item.itemQty,
              itemRate: item.itemRate,
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to update invoice item');
          }
        } else {
          // If the item doesn't have an invtID, it's a new item and should be created.
          const response = await fetch(`http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/invoiceItem`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              itemDesc: item.itemDesc,
              itemQty: item.itemQty,
              itemRate: item.itemRate,
              invID: invoiceToUpdate.invID,  // Ensure the correct invID is sent for new items
            }),
          });
          if (!response.ok) {
            throw new Error('Failed to add new invoice item');
          }
        }
      });

      await Promise.all(promises);
      setSuccess('Invoice updated successfully');
      setInvoices(invoices.map((invoice) =>
        invoice._id === invoiceToUpdate._id
          ? { ...invoice, items: updateItems }
          : invoice
      ));
      handleUpdateDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateItemChange = (index, field, value) => {
    setUpdateItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index][field] = value;
      return updatedItems;
    });
  };

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setInvoiceToUpdate(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => {
      const newPage = prevPage + 1;
      fetchInvoices(newPage);
      return newPage;
    });
  };

  // Function to add a new item to the updateItems list
  const handleAddItem = () => {
    setUpdateItems([
      ...updateItems,
      { _id: new Date().getTime(), itemDesc: '', itemQty: '', itemRate: '', invtID: null, isNew: true }
    ]);
  };

  // New function to handle deletion of the last item
  const handleDeleteLastItem = () => {
    setUpdateItems((prevItems) => prevItems.slice(0, -1)); // Remove the last item
  };

  const handleDeleteItem = async (invtID, index) => {
    // Convert invtID to a number if it's not already
    const numericInvtID = Number(invtID);

    if (isNaN(numericInvtID)) {
      setError('Invalid item ID');
      return;
    }

    const apiUrl = `http://ec2-13-233-199-35.ap-south-1.compute.amazonaws.com:8181/invoiceItem/${numericInvtID}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSuccess('Item deleted successfully!');

        // Remove item from the updateItems state
        setUpdateItems(prevItems => prevItems.filter((_, i) => i !== index));
      }

      else {
        // Handle unexpected content type
        setError('Unexpected response format. Please try again later.');
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Invoice List
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Clients As per page: {invoices.length}
      </Typography>
            {/* Search Input */}
        <TextField
        label="Search Invoices with Client Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange} // Update search term and reset categories
        placeholder="Search by category name"
      />

      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Print Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Invoice Number
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Client Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Project Title
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
    {invoices.map((invoice) => (
      <TableRow key={invoice.invID}>
        <TableCell>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {formatDate(invoice.printdate)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {invoice.invNum}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {invoice.clientName}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {invoice.projectTitle}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary" onClick={() => handleEdit(invoice)}>
              <Edit />
            </IconButton>
            <IconButton color="secondary" onClick={() => handleDeleteDialogOpen(invoice)}>
              <Delete />
            </IconButton>
            <IconButton color="error" onClick={() => generatePDF(invoice)}>
              <PictureAsPdf />
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

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this "{invoiceToDelete?.invNum}" invoice?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog
        open={updateDialogOpen}
        onClose={handleUpdateDialogClose}
        fullWidth
        maxWidth="md" // Adjust as needed
      >
        <DialogTitle>Edit Invoice Items</DialogTitle>
        <DialogContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {updateItems.map((item, index) => (
          <Box
            key={item._id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mb: 2,
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Typography
              sx={{ minWidth: '40px', textAlign: 'center', mb: { xs: 1, sm: 0 } }}
            >
              {index + 1}.
            </Typography>
            <TextField
              label="Description"
              value={item.itemDesc}
              onChange={(e) => handleUpdateItemChange(index, 'itemDesc', e.target.value)}
              sx={{ flex: 2, minWidth: { xs: '100%', sm: '250px' }, mt: 1 }}
            />
            <TextField
              label="Quantity"
              type="number"
              value={item.itemQty}
              onChange={(e) => handleUpdateItemChange(index, 'itemQty', e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '100px' }, mt: 1 }}
            />
            <TextField
              label="Rate"
              type="number"
              value={item.itemRate}
              onChange={(e) => handleUpdateItemChange(index, 'itemRate', e.target.value)}
              sx={{ flex: 1, minWidth: { xs: '100%', sm: '100px' }, mt: 1 }}
            />
            <Tooltip title={item.isNew ? "This item is unsaved. Click on the common delete button to remove." : ""}>
              <span>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteItem(item.invtID, index)}
                  sx={{ minWidth: '50px', opacity: item.isNew ? 0.5 : 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        ))}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          mt={2}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddItem}
            sx={{ mb: { xs: 2, sm: 0 } }}
          >
            Add Item
          </Button>
          {updateItems.some(item => item.isNew) && (
            <IconButton color="secondary" onClick={handleDeleteLastItem}>
              <DeleteIcon /> {/* Common delete button for last item */}
            </IconButton>
          )}
        </Box>
      </Box>
    </DialogContent>


        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
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

//intial commit

export default EditInvoice;
