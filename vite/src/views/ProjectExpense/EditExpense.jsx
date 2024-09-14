import React, { useEffect, useState } from 'react';
import {
    Button, Container, Typography, Snackbar, Alert,
    IconButton, Table, TableBody, TableCell, TableHead,
    TableRow, Dialog, DialogActions, DialogContent,
    DialogTitle, Box, TextField, Paper, TableContainer,
    CircularProgress
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import useAuth from 'hooks/useAuth';

const EditProjectExpense = () => {
    const [projects, setProjects] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [projectToUpdate, setProjectToUpdate] = useState(null);
    const [updateDetails, setUpdateDetails] = useState([]);
    const [loadingExpenses, setLoadingExpenses] = useState(true); // Loader state for expenses
    const [loadingProjects, setLoadingProjects] = useState(false); // Loader state for projects
    const { isAuthenticated, loading: authLoading } = useAuth();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        setLoadingExpenses(true); // Start loading expenses
        try {
            const response = await fetch('https://ekarigar-accounts.onrender.com/expense');
            if (!response.ok) {
                throw new Error('Failed to fetch expenses');
            }
            const data = await response.json();
            setExpenses(data);
            const projectIDs = Array.from(new Set(data.map(expense => expense.projectID)));
            fetchProjects(projectIDs);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingExpenses(false); // Stop loading expenses
        }
    };

    const fetchProjects = async (projectIDs) => {
        setLoadingProjects(true); // Start loading projects
        try {
            const response = await fetch('https://ekarigar-accounts.onrender.com/projects');
            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }
            const data = await response.json();
            const filtered = data.filter(project => projectIDs.includes(project.projectID));
            setProjects(filtered);

            const combinedData = filtered.map(project => ({
                ...project,
                expenses: expenses.filter(expense => expense.projectID === project.projectID)
            }));
            setFilteredProjects(combinedData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoadingProjects(false); // Stop loading projects
        }
    };

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
                fetch(`https://ekarigar-accounts.onrender.com/Expense/${expense._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...expense,
                        description: expense.description,
                        amount: expense.amount
                    }),
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
            console.error(error);
            setError(error.message);
        }
    };

    const handleDetailChange = (index, field, value) => {
        setUpdateDetails(updateDetails.map((detail, i) =>
            i === index ? { ...detail, [field]: value } : detail
        ));
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
                Edit Project Expenses
            </Typography>
            {loadingExpenses || loadingProjects ? ( // Show loader if either loading state is true
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
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
                                        Expense Amount
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
                                                        {expense.amount || 0}
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
                                            <IconButton color="secondary">
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Dialog open={updateDialogOpen} onClose={handleUpdateDialogClose}>
                <DialogTitle>Update Project Expenses</DialogTitle>
                <DialogContent>
                    {updateDetails.map((expense, index) => (
                        <Box key={index} mb={2}>
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
        </Container>
    );
};

export default EditProjectExpense;
