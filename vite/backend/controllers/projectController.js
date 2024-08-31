const Client = require('../models/project');
const Counter = require('../models/counter'); // Import the Counter model

// Add a new client
exports.addProject = async (req, res) => {
  try {
    const { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, projectCat, clientID } = req.body;

    // Check if a project with the same title already exists
    const existingProject = await Client.findOne({ projectTitle });
    if (existingProject) {
      return res.status(400).send('Project with this title already exists');
    }

    // Check if a project with the same clientID already exists
    const existingClientID = await Client.findOne({ clientID });
    if (existingClientID) {
      return res.status(400).send('Client with this ID already exists');
    }

    // Get the next projectID from the counter collection
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'projectID' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    const projectID = counter.sequence_value + 1; // Incremented value for new project

    // Create a new client
    const newClient = new Client({
      projectTitle,
      ServicedBy,
      SaledoneBy,
      ApprovedBy,
      ProgressBy,
      projectID, // Set the auto-incremented projectID
      projectCat,
      clientID // Set the provided clientID
    });
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
    const { page = 1, limit = 1000 } = req.query;
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
    const { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, projectCat, clientID } = req.body;

    // Update the client
    const updatedClient = await Client.findByIdAndUpdate(
      id,
      { projectTitle, ServicedBy, SaledoneBy, ApprovedBy, ProgressBy, projectCat, clientID },
      { new: true }
    );
    if (!updatedClient) return res.status(404).send('Client not found');
    res.json(updatedClient);
  } catch (err) {
    res.status(500).send('Error updating client');
  }
};
