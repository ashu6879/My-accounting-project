const mongoose = require('mongoose');

const projectCategorySchema = new mongoose.Schema({
  pcName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProjectCategory', projectCategorySchema);
