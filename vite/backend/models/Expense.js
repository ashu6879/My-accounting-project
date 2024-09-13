const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  projectID: { type: Number, required: true },
  amount: { type: Number, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  expDate: { type: Date},
}, { collection: 'projectexpenses' }); // Explicitly set the collection name

module.exports = mongoose.model('projectexpenses', invoiceSchema);
