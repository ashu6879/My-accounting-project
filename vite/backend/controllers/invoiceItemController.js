const InvoiceItem = require('../models/invoiceItem');
const Counter = require('../models/counter');

// Get the next sequence value for a given counter
const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await Counter.findByIdAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return sequenceDocument.sequence_value;
};

// Add a new invoice item
exports.addInvoiceItem = async (req, res) => {
  try {
    const { invID, itemDesc, itemQty, itemRate } = req.body;

    // Get the next invtID from the counter collection
    const invtID = await getNextSequenceValue('invtID');

    const newItem = new InvoiceItem({
      invID,
      invtID, // Use the auto-incremented invtID
      itemDesc,
      itemQty,
      itemRate
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating invoice item:', error);
    res.status(500).send('Error creating invoice item');
  }
};

// Get all invoice items
exports.getInvoiceItems = async (req, res) => {
  try {
    const items = await InvoiceItem.find();
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching invoice items:', error);
    res.status(500).send('Server Error');
  }
};

// Get a single invoice item by ID
exports.getInvoiceItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await InvoiceItem.findById(id);
    if (!item) return res.status(404).send('Invoice item not found');
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching invoice item:', error);
    res.status(500).send('Server Error');
  }
};

// Update an invoice item by ID
exports.updateInvoiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemDesc, itemQty, itemRate } = req.body;

    const updatedItem = await InvoiceItem.findByIdAndUpdate(
      id,
      { itemDesc, itemQty, itemRate, total: itemQty * itemRate },
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).send('Invoice item not found');
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating invoice item:', error);
    res.status(500).send('Error updating invoice item');
  }
};

// Delete an invoice item by ID
exports.deleteInvoiceItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await InvoiceItem.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Invoice item not found');
    res.status(200).send('Invoice item deleted');
  } catch (error) {
    console.error('Error deleting invoice item:', error);
    res.status(500).send('Error deleting invoice item');
  }
};
