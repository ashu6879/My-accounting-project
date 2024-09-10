const Client = require('../models/client');
const Counter = require('../models/counter'); // Import the Counter model

// Function to get the next sequence value for a counter
const getNextSequenceValue = async (counterName) => {
  try {
    const counter = await Counter.findByIdAndUpdate(
      counterName,
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    return counter.sequence_value;
  } catch (err) {
    console.error('Error getting next sequence value:', err);
    throw new Error('Error generating clientID');
  }
};

// Add a new client
exports.addClient = async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, clientAddress, clientCat } = req.body;

    // Check if the client already exists
    const existingClient = await Client.findOne({ clientEmail });
    if (existingClient) return res.status(400).send('Client with this email already exists');

    // Get the next clientID
    const clientID = await getNextSequenceValue('clientID');

    // Create a new client
    const newClient = new Client({ clientID, clientName, clientEmail, clientPhone, clientAddress, clientCat });
    await newClient.save();
    res.status(201).send('Client created');
  } catch (err) {
    console.error('Error details:', err); // Log the error details for debugging

    if (err.code && err.code === 11000) {
      // Duplicate key error
      return res.status(400).send('Client with this email already exists');
    }

    res.status(500).send('Error creating client');
  }
};

// Get a list of clients with optional search
exports.getClients = async (req, res) => {
  try {
    const { page = 1, limit = 3000, search = '' } = req.query;
    const skip = (page - 1) * limit;
    
    // Create a regex pattern for case-insensitive search
    const searchPattern = new RegExp(search, 'i');

    // Filter clients based on the search term
    const clients = await Client.find({ clientName: { $regex: searchPattern } })
      .sort({ _id: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    
    res.json(clients);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};


// Get total count of clients
exports.getTotalClients = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Client.findByIdAndDelete(id);
    if (!result) return res.status(404).send('Client not found');
    res.send('Client deleted');
  } catch (err) {
    res.status(500).send('Error deleting client');
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientEmail, clientPhone, clientAddress, clientCat } = req.body;

    // Update the client
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { clientName, clientEmail, clientPhone, clientAddress, clientCat },
      { new: true }
    );
    if (!updatedClient) return res.status(404).send('Client not found');
    res.json(updatedClient);
  } catch (err) {
    res.status(500).send('Error updating client');
  }
};
