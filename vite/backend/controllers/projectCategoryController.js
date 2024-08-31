const ProjectCategory = require('../models/projectCategory');
const Counter = require('../models/counter');

// Add Project Category
exports.addProjectCategory = async (req, res) => {
  try {
    const { pcName } = req.body;

    // Check if the category already exists
    const existingCategory = await ProjectCategory.findOne({ pcName });
    if (existingCategory) return res.status(400).send('Project category already exists');

    // Get the next pcID from the projectCategory counter
    const counter = await Counter.findByIdAndUpdate(
      { _id: 'projectCategory' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );

    // Create a new project category with the incremented pcID
    const newCategory = new ProjectCategory({
      pcID: counter.sequence_value,
      pcName,
    });

    await newCategory.save();
    res.status(201).send('Project category created');
  } catch (err) {
    res.status(500).send('Error creating project category');
  }
};

// Get Project Categories (Paginated)
exports.getProjectCategories = async (req, res) => {
  try {
    const { page = 1, limit = 3000 } = req.query;
    const skip = (page - 1) * limit;
    const categories = await ProjectCategory.find().skip(parseInt(skip)).limit(parseInt(limit));
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Get Total Categories Count
exports.getTotalCategories = async (req, res) => {
  try {
    const count = await ProjectCategory.countDocuments();
    res.json({ total: count });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Delete Project Category
exports.deleteProjectCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ProjectCategory.findByIdAndDelete(id);
    if (!category) return res.status(404).send('Project category not found');
    res.send('Project category deleted');
  } catch (err) {
    res.status(500).send('Error deleting project category');
  }
};

// Update Project Category
exports.updateProjectCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { pcName } = req.body;
    const updatedCategory = await ProjectCategory.findByIdAndUpdate(id, { pcName }, { new: true });
    if (!updatedCategory) return res.status(404).send('Project category not found');
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).send('Error updating project category');
  }
};
