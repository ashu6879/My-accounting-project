import React, { useState, useEffect } from 'react';
import {
    Box, Button, TextField, Container, Typography, Snackbar, Alert, MenuItem, Select, InputLabel, FormControl, Grid
} from '@mui/material';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const AddExpense = () => {
    const [projects, setProjects] = useState([]);
    const [expenseItems, setExpenseItems] = useState([{ description: '', amount: 0 }]);
    const [expenseData, setExpenseData] = useState({
        projectID: '',
        description: '',
        amount: 0,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleItemChange = (index, event) => {
        const { name, value } = event.target;
        setExpenseItems(prevItems => {
            const newItems = [...prevItems];
            newItems[index] = { ...newItems[index], [name]: value };
            return newItems;
        });
    };

    const addItem = () => {
        setExpenseItems(prevItems => [
            ...prevItems,
            { description: '', amount: 0 } // Ensure the new item has default values
        ]);
    };

    const removeItem = (index) => {
        setExpenseItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        // Validate fields
        if (!expenseData.projectID || expenseItems.some(item => !item.description || item.amount <= 0)) {
          setError('Please fill out all required fields.');
          setLoading(false);
          return;
        }
      
        try {
          // Send each expense item separately
          const responses = await Promise.all(expenseItems.map(async (item) => {
            const response = await fetch('https://ekarigar-accounts.onrender.com/Expense', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                projectID: expenseData.projectID,
                description: item.description,
                amount: item.amount,
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to add expense item');
            }
      
            return response.json();
          }));
      
          setSuccess('Expense items added successfully!');
          setExpenseData({
            projectID: '',
            description: '',
            amount: '',
          });
          setExpenseItems([{ description: '', amount: 0 }]);
      
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

                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={addItem}
                        >
                            Add Item
                        </Button>
                        {expenseItems.map((item, index) => (
                            <Box key={index} mt={2}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            label="Description"
                                            name="description"
                                            variant="outlined"
                                            fullWidth
                                            value={item.description}
                                            onChange={(event) => handleItemChange(index, event)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            type="numeric"
                                            label="Amount"
                                            name="amount"
                                            variant="outlined"
                                            fullWidth
                                            value={item.amount}
                                            onChange={(event) => handleItemChange(index, event)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Box display="flex" justifyContent="center">
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => removeItem(index)}
                                                startIcon={<DeleteIcon />}
                                            >
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                            {loading ? 'Adding Expense...' : 'Add Expense'}
                        </Button>
                    </Grid>
                </Grid>
            </form>

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
