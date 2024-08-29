const mongoose = require('mongoose');

const clientCategorySchema = new mongoose.Schema({
  ccName: { // Changed from 'name' to 'ccName'
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ClientCategory', clientCategorySchema);
