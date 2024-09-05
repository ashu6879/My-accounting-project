import React, { useEffect, useState } from 'react';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogTitle, Box, TextField, TableContainer, Paper
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

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
  const [limit, setLimit] = useState(20);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices(page);
    }
  }, [isAuthenticated, page]);

  const fetchInvoices = async (pageNumber) => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/invoices?page=${pageNumber}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices((prevInvoices) => [...prevInvoices, ...data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchInvoiceItemsByInvID = async (invID) => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/getInvoiceItemByInvID/${invID}`);
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
      const response = await fetch(`https://ekarigar-accounts.onrender.com/invoices/${invoiceToDelete._id}`, {
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
  

  const handleUpdate = async () => {
    try {
      const promises = updateItems.map(async (item) => {
        const response = await fetch(`https://ekarigar-accounts.onrender.com/invoiceItem/${item._id}`, {
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
      console.error(error);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Invoice List
      </Typography>
      <Typography variant="h6" gutterBottom>
        Total Clients As per page: {invoices.length}
      </Typography>

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
              <TableRow key={invoice._id}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {invoice.printdate}
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
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this "{invoiceToDelete?.invNum}" invoice?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Update Dialog */}
      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Invoice</DialogTitle>
        <DialogContent>
          {updateItems.map((item, index) => (
            <Box key={item._id} component="form" noValidate autoComplete="off" mb={2}>
              <Typography variant="subtitle1" gutterBottom>
                Item #{index + 1}
              <IconButton color="secondary" onClick={() => handleDeleteItem(index)}>
                      <Delete />
              </IconButton>
              </Typography>
              <TextField
                label="Item Description"
                variant="outlined"
                fullWidth
                value={item.itemDesc}
                onChange={(e) => handleUpdateItemChange(index, 'itemDesc', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Item Quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={item.itemQty}
                onChange={(e) => handleUpdateItemChange(index, 'itemQty', e.target.value)}
                sx={{ mb: 1 }}
              />
              <TextField
                label="Item Rate"
                variant="outlined"
                fullWidth
                type="number"
                value={item.itemRate}
                onChange={(e) => handleUpdateItemChange(index, 'itemRate', e.target.value)}
                sx={{ mb: 1 }}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>




      {/* Error Snackbar */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error">
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditInvoice;
