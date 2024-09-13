const projectexpenses = require('../models/Expense'); // Ensure model is correctly imported

// Add a new invoice item
exports.addExpense = async (req, res) => {
  try {
    const { projectID, amount, description, expDate } = req.body;

    // Create new expense
    const newItem = new projectexpenses({
      projectID, // Use the auto-incremented invtID if applicable
      amount,
      description,
      expDate, // Add totalRate field
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).send('Error creating expense');
  }
};

// Get all invoice items
exports.getExpense = async (req, res) => {
  try {
    const expenses = await projectexpenses.find()
      .sort({ _id: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Server Error');
  }
};

// Get a single invoice item by ID
exports.getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await projectexpenses.findById(id);
    if (!expense) return res.status(404).send('Expense not found');
    res.status(200).json(expense);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).send('Server Error');
  }
};

// Update an invoice item by ID
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectID, amount, description } = req.body;

    const updatedItem = await projectexpenses.findByIdAndUpdate(
      id,
      { projectID, amount, description },
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).send('Expense not found');
    }
    
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).send('Error updating expense');
  }
};

// Delete an invoice item by ID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure id is a valid MongoDB ObjectId
    if (!id) {
      return res.status(400).send('Invalid id format');
    }

    const result = await projectexpenses.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Expense not found');
    
    res.status(200).send('Expense deleted');
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).send('Error deleting expense');
  }
};
