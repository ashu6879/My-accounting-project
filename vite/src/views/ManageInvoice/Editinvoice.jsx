import React, { useEffect, useState } from 'react';
import {
  Button, Container, Typography, Snackbar, Alert,
  IconButton, Table, TableBody, TableCell, TableHead,
  TableRow, Dialog, DialogActions, DialogContent,
  DialogTitle, Box, TextField, MenuItem, TableContainer, Paper
} from '@mui/material';
import { Edit, Delete, Close as CloseIcon } from '@mui/icons-material'; // Import CloseIcon here
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

const EditInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [invoiceToUpdate, setInvoiceToUpdate] = useState(null);
  const [updateInvID, setUpdateInvID] = useState('');
  const [updateClientName, setUpdateClientName] = useState('');
  const [updateProjectTitle, setUpdateProjectTitle] = useState('');
  const [updatePrintDate, setUpdatePrintDate] = useState('');
  const [updateInvNum, setUpdateInvNum] = useState('');
  const [updateRemarks, setUpdateRemarks] = useState('');
  const [page, setPage] = useState(1); // Add page state
  const [limit, setLimit] = useState(20); // Number of items per page
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvoices(page); // Fetch invoices on mount and when page changes
    }
  }, [isAuthenticated, page]);
  

  const fetchInvoices = async (pageNumber) => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      
      // Check if data is an array and slice it to limit to 20 items
      if (Array.isArray(data)) {
        setInvoices((prevInvoices) => [...prevInvoices, ...data]);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  

  const handleEdit = (invoice) => {
    setInvoiceToUpdate(invoice);
    setUpdateInvID(invoice.invID);
    setUpdateClientName(invoice.clientName);
    setUpdateProjectTitle(invoice.projectTitle);
    setUpdatePrintDate(invoice.printdate.split('T')[0]); // Format date for input
    setUpdateInvNum(invoice.invNum);
    setUpdateRemarks(invoice.remarks);
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

  const handleUpdateDialogClose = () => {
    setUpdateDialogOpen(false);
    setInvoiceToUpdate(null);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/${invoiceToDelete._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete invoice');
      }

      setSuccess('Invoice deleted successfully');
      setInvoices(invoices.filter((invoice) => invoice._id !== invoiceToDelete._id));
      handleDeleteDialogClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://ekarigar-accounts.onrender.com/${invoiceToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invID: updateInvID,
          clientName: updateClientName,
          projectTitle: updateProjectTitle,
          printdate: updatePrintDate,
          invNum: updateInvNum,
          remarks: updateRemarks,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update invoice');
      }

      setSuccess('Invoice updated successfully');
      setInvoices(invoices.map((invoice) =>
        invoice._id === invoiceToUpdate._id ? { ...invoice, invID: updateInvID, clientName: updateClientName, projectTitle: updateProjectTitle, printdate: updatePrintDate, invNum: updateInvNum, remarks: updateRemarks } : invoice
      ));
      handleUpdateDialogClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
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
              <TableRow key={invoice.invID}>
                <TableCell>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {invoice.printdate.split('T')[0]} {/* Format date */}
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

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this "{invoiceToDelete?.invNum}" invoice?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
        <DialogTitle>Update Invoice</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              label="Invoice ID"
              value={updateInvID}
              onChange={(e) => setUpdateInvID(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Client Name"
              value={updateClientName}
              onChange={(e) => setUpdateClientName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Project Title"
              value={updateProjectTitle}
              onChange={(e) => setUpdateProjectTitle(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Print Date"
              type="date"
              value={updatePrintDate}
              onChange={(e) => setUpdatePrintDate(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Invoice Number"
              value={updateInvNum}
              onChange={(e) => setUpdateInvNum(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Remarks"
              value={updateRemarks}
              onChange={(e) => setUpdateRemarks(e.target.value)}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDialogClose}>Cancel</Button>
          <Button onClick={handleUpdate} color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditInvoice;
