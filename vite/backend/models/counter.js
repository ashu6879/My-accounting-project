const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  _id: String, // This will be the name of the counter (e.g., 'clientCategory', 'projectCategory')
  sequence_value: {
    type: Number,
    default: 1000, // Default starting value if not provided explicitly
  },
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
