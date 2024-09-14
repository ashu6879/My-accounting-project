import React, { useEffect, useState, useCallback } from 'react';
import {
    Button, Container, Typography, Snackbar, Alert,
    IconButton, Table, TableBody, TableCell, TableHead,
    TableRow, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Paper, TableContainer
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAuth from 'hooks/useAuth';
import Loader from '../../ui-component/loading'; // Import the Loader component

const EditProjectExpense = () => {
    const [projects, setProjects] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState(null);
    const [updateDetails, setUpdateDetails] = useState([]);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading
    const { isAuthenticated, loading: authLoading } = useAuth();

    useEffect(() => {
        fetchExpensesAndProjects();
    }, []);

    const fetchExpensesAndProjects = useCallback(async () => {
        setLoading(true); // Start loading
        try {
            const expenseResponse = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/expense');
            if (!expenseResponse.ok) throw new Error('Failed to fetch expenses');
            const expensesData = await expenseResponse.json();
            setExpenses(expensesData);

            const projectIDs = Array.from(new Set(expensesData.map(expense => expense.projectID)));

            const projectResponse = await fetch('http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/projects');
            if (!projectResponse.ok) throw new Error('Failed to fetch projects');
            const projectsData = await projectResponse.json();

            const filteredProjectsData = projectsData.filter(project => projectIDs.includes(project.projectID));
            setProjects(filteredProjectsData);

            const combinedData = filteredProjectsData.map(project => ({
                ...project,
                expenses: expensesData.filter(expense => expense.projectID === project.projectID)
            }));

            setFilteredProjects(combinedData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // End loading
        }
    }, []);

    const handleEdit = (project) => {
        setProjectToUpdate(project);
        setUpdateDetails(project.expenses);
        setUpdateDialogOpen(true);
    };

    const handleUpdateDialogClose = () => {
        setUpdateDialogOpen(false);
        setProjectToUpdate(null);
    };

    const handleUpdate = async () => {
        try {
            const updatePromises = updateDetails.map(expense =>
                fetch(`http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/Expense/${expense._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(expense),
                })
            );

            await Promise.all(updatePromises);

            setSuccess('Expenses updated successfully');
            setFilteredProjects(filteredProjects.map((project) =>
                project.projectID === projectToUpdate.projectID
                    ? { ...project, expenses: updateDetails }
                    : project
            ));
            handleUpdateDialogClose();
        } catch (error) {
            setError(error.message);
        }
    };

    const handleDetailChange = (index, field, value) => {
        setUpdateDetails(updateDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        ));
    };

    const handleDeleteRequest = (project) => {
        setProjectToDelete(project);
        setConfirmationDialogOpen(true);
    };

    const handleDeleteConfirmation = async () => {
        if (!projectToDelete) return;
        try {
            const projectExpenses = expenses.filter(expense => expense.projectID === projectToDelete.projectID);

            const deletePromises = projectExpenses.map(expense =>
                fetch(`http://ec2-13-233-96-56.ap-south-1.compute.amazonaws.com:8181/Expense/${expense._id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            );

            await Promise.all(deletePromises);

            setSuccess('Expenses deleted successfully');
            setExpenses(expenses.filter(expense => expense.projectID !== projectToDelete.projectID));
            setFilteredProjects(filteredProjects.filter(project => project.projectID !== projectToDelete.projectID));
        } catch (error) {
            setError(error.message);
        } finally {
            setConfirmationDialogOpen(false);
            setProjectToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        setConfirmationDialogOpen(false);
        setProjectToDelete(null);
    };

    if (authLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Container maxWidth="md">
            {loading ? (
                <Loader /> // Display loader while fetching data
            ) : (
                <>
                    <Typography variant="h4" gutterBottom>
                        Edit Project Expenses
                    </Typography>
                    <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Project Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                            Expense Details
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} textAlign={'center'}>
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProjects.map((project) => (
                                    <TableRow key={project.projectID}>
                                        <TableCell>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                {project.projectTitle}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Box>
                                                {project.expenses.map((expense, index) => (
                                                    <Box key={index} mb={1}>
                                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                                        {expense.description || ""}-{expense.amount || 0}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', gap: 1 }} justifyContent={'center'}>
                                                <IconButton color="primary" onClick={() => handleEdit(project)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton
                                                    color="secondary"
                                                    onClick={() => handleDeleteRequest(project)} // Pass the entire project
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog
                        open={updateDialogOpen}
                        onClose={handleUpdateDialogClose}
                        fullWidth
                        maxWidth="md"
                    >
                        <DialogTitle>Update Project Expenses</DialogTitle>
                        <DialogContent>
                            {updateDetails.map((expense, index) => (
                                <Box key={index} mb={2} sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        margin="dense"
                                        label="Description"
                                        fullWidth
                                        value={expense.description || ''}
                                        onChange={(e) => handleDetailChange(index, 'description', e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        label="Amount"
                                        fullWidth
                                        type="number"
                                        value={expense.amount || ''}
                                        onChange={(e) => handleDetailChange(index, 'amount', e.target.value)}
                                    />
                                </Box>
                            ))}
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

                    <Dialog
                        open={confirmationDialogOpen}
                        onClose={handleDeleteCancel}
                    >
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogContent>
                            <Typography>
                                Are you sure you want to delete expenses for the project: <strong>{projectToDelete?.projectTitle}</strong>?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDeleteCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteConfirmation} color="secondary">
                                Delete
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
                </>
            )}
        </Container>
    );
};

export default EditProjectExpense;
