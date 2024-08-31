const ClientCategory = require('../models/clientCategory');
const Counter = require('../models/counter');

// Add a new client category
exports.addClientCategory = async (req, res) => {
  try {
    const { ccName } = req.body;

    // Check if the category already exists
    const existingCategory = await ClientCategory.findOne({ ccName });
    if (existingCategory) return res.status(400).send('Client category already exists');

    // Get the next ccID from the counter collection
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'clientCategory' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new client category with the incremented ccID
    const newCategory = new ClientCategory({
      ccID: counter.sequence_value,
      ccName,
    });
    await newCategory.save();
    res.status(201).send('Client category created');
  } catch (err) {
    res.status(500).send('Error creating client category');
  }
};

// Get client categories (with pagination)
exports.getClientCategories = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const skip = (page - 1) * limit;
    const categories = await ClientCategory.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.json(categories);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get all client categories (no pagination)
exports.getAllClientCategories = async (req, res) => {
  try {
    const categories = await ClientCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get total count of client categories
exports.getTotalClientCategories = async (req, res) => {
  try {
    const count = await ClientCategory.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete a client category by ID
exports.deleteClientCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ClientCategory.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Category not found');
    res.send('Client category deleted');
  } catch (err) {
    res.status(500).send('Error deleting client category');
  }
};

// Update a client category by ID
exports.updateClientCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { ccName } = req.body;

    // Update the client category
    const updatedCategory = await ClientCategory.findByIdAndUpdate(id, { ccName }, { new: true });
    if (!updatedCategory) return res.status(404).send('Category not found');
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).send('Error updating client category');
  }
};
