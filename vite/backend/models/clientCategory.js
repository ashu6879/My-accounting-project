const mongoose = require('mongoose');

const clientCategorySchema = new mongoose.Schema({
  ccID: {
    type: Number,
    unique: true,
    required: true,
  },
  ccName: {
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
