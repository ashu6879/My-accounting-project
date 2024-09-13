const InvoiceItem = require('../models/Expense');
const Counter = require('../models/counter');

// Add a new invoice item
exports.addExpense = async (req, res) => {
  try {
    const {projectID,amount,description,expDate} = req.body;

    // Create new expense
    const newItem = new InvoiceItem({
      projectID, // Use the auto-incremented invtID
      amount,
      description,
      expDate, // Add totalRate field
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating expense :', error);
    res.status(500).send('Error creating expense');
  }
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await projectexpenses.find()
      .sort({ _id: -1 }); // Removed the semicolon here
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
    const expenses = await projectexpenses.findById(id);
    if (!item) return res.status(404).send('Invoice item not found');
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).send('Server Error');
  }
};

// Update an invoice item by ID
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectID, amount, description } = req.body;

    const updatedItem = await projectexpenses.findOneAndUpdate(
      { id },
      { projectID, amount, description},
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).send('Expense not found');
    }
    
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating Expense:', error);
    res.status(500).send('Error updating Expense');
  }
};


// Delete an invoice item by invtID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Ensure invtID is a number
    const numericInvtID = Number(id);
    if (isNaN(numericInvtID)) {
      return res.status(400).send('Invalid id format');
    }

    const result = await projectexpenses.findOneAndDelete({ id: numericInvtID });
    if (!result) return res.status(404).send('Expensenot found');
    
    res.status(200).send('Expense  deleted');
  } catch (error) {
    console.error('Error deleting Expense:', error);
    res.status(500).send('Error deleting Expense');
  }
};
