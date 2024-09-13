import React, { useState, useEffect } from 'react';
import {
    Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, Grid
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const [projects, setProjects] = useState([]);
    const [expenseData, setExpenseData] = useState({
        projectID: '',
        description: '',
        amount: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Uncomment and implement the following functions
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://ekarigar-accounts.onrender.com/projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            setError('Failed to fetch projects');
        }
    };
    const handleProjectChange = (event) => {
        const projectID = event.target.value;
        setExpenseData(prevData => ({
            ...prevData,
            projectID
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setExpenseData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('https://ekarigar-accounts.onrender.com/Expense', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseData),
            });

            if (!response.ok) {
                throw new Error('Failed to add expense');
            }

            setSuccess('Expense added successfully!');
            setExpenseData({
                projectID: '',
                description: '',
                amount: '',
            });

            setTimeout(() => {
                navigate('/ProjectExpense/edit');
            }, 2000);
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
                Add Expense
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Project Selection */}
                    <Grid item xs={12} sm={6}>
                        <FormControl variant="outlined" fullWidth required>
                            <InputLabel id="project-label">Select Project</InputLabel>
                            <Select
                                labelId="project-label"
                                id="projectID"
                                name="projectID"
                                value={expenseData.projectID}
                                onChange={handleProjectChange}
                                label="Select Project"
                            >
                                {projects.map(project => (
                                    <MenuItem key={project.projectID} value={project.projectID}>
                                        {project.projectTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Expense Description and Amount on the same line */}
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                label="Expense Description"
                                variant="outlined"
                                fullWidth
                                name="description"
                                value={expenseData.description}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <TextField
                                label="Amount"
                                variant="outlined"
                                fullWidth
                                name="amount"
                                value={expenseData.amount}
                                onChange={handleChange}
                                type="number"
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                            {loading ? 'Adding Expense...' : 'Add Expense'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

            {/* Success/Error Snackbar */}
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

export default AddExpense;
