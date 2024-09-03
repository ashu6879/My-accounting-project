const Invoice = require('../models/invoice');
const Counter = require('../models/counter'); // Import the Counter model for generating unique IDs

// Add a new invoice
exports.addInvoice = async (req, res) => {
    try {
      const { clientID, projectID, remarks, invDate, printdate } = req.body;
  
      // Get the next invID from the counter collection
      const invIDCounter = await Counter.findByIdAndUpdate(
        { _id: 'invID' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      const invID = invIDCounter.sequence_value;
  
      // Get the next invNum from the counter collection
      const invNumCounter = await Counter.findByIdAndUpdate(
        { _id: 'invNum' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      const invNum = invNumCounter.sequence_value;
  
      // Check if an invoice with the same invNum already exists
      const existingInvoice = await Invoice.findOne({ invNum });
      if (existingInvoice) {
        return res.status(400).send('An invoice with this number already exists');
      }
  
      // Autofill invDate and printdate if not provided
      const currentDate = new Date();
      const autoFilledInvDate = invDate || currentDate;
      const autoFilledPrintDate = printdate || currentDate;
  
      // Create a new invoice
      const newInvoice = new Invoice({
        invID, // Set the auto-incremented invID
        clientID,
        projectID,
        invNum, // Set the auto-incremented invNum
        remarks,
        invDate: autoFilledInvDate, // Autofilled or provided invDate
        printdate: autoFilledPrintDate, // Autofilled or provided printdate
      });
      await newInvoice.save();
      res.status(201).send('Invoice created');
    } catch (err) {
      console.error('Error details:', err); // Log the error details for debugging
  
      if (err.code && err.code === 11000) {
        // Duplicate key error
        return res.status(400).send('Duplicate key error');
      }
  
      res.status(500).send('Error creating invoice');
    }
  };
  

// Get a list of invoices
exports.getInvoices = async (req, res) => {
    try {
      const { page = 1, limit = 1000 } = req.query;
      const skip = (page - 1) * limit;
      const invoices = await Invoice.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
      
      res.json(invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      res.status(500).send('Server Error');
    }
  };

// Get total count of invoices
exports.getTotalInvoices = async (req, res) => {
  try {
    const count = await Invoice.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete an invoice by ID
exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Invoice.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Invoice not found');
    res.send('Invoice deleted');
  } catch (err) {
    res.status(500).send('Error deleting invoice');
  }
};

// Update an invoice by ID
exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientID, projectID, printdate, invNum, remarks, invDate} = req.body;

    // Update the invoice
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      id,
      { clientID, projectID, printdate, invNum, remarks, invDate},
      { new: true }
    );
    if (!updatedInvoice) return res.status(404).send('Invoice not found');
    res.json(updatedInvoice);
  } catch (err) {
    res.status(500).send('Error updating invoice');
  }
};
