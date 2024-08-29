const Client = require('../models/project');

// Add a new client
exports.addProject = async (req, res) => {
  try {
    const { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, clientID, projectCat } = req.body;

    // Check if the client already exists based on clientID
    const existingClient = await Client.findOne({ clientID });
    if (existingClient) return res.status(400).send('Client with this ID already exists');

    // Create a new client
    const newClient = new Client({ projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, clientID, projectCat });
    await newClient.save();
    res.status(201).send('Client created');
  } catch (err) {
    console.error('Error details:', err); // Log the error details for debugging

    if (err.code && err.code === 11000) {
      // Duplicate key error
      return res.status(400).send('Client with this ID already exists');
    }

    res.status(500).send('Error creating client');
  }
};

// Get a list of clients
exports.getProject = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const clients = await Client.find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    res.json(clients);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Get total count of clients
exports.getTotalProject = async (req, res) => {
  try {
    const count = await Client.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Delete a client by ID
exports.deleteProject = async (req, res) => {
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
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, clientID, projectCat } = req.body;

    // Update the client
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, clientID, projectCat },
      { new: true }
    );
    if (!updatedClient) return res.status(404).send('Client not found');
    res.json(updatedClient);
  } catch (err) {
    res.status(500).send('Error updating client');
  }
};
