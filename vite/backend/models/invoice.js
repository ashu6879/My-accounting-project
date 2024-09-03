// models/invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invID: { type: Number, required: true, unique: true },
  clientID: { type: Number, required: true },
  projectID: { type: Number, required: true },
  printdate: { type: Date, required: true },
  invNum: { type: String, required: true, unique: true },
  remarks: { type: String },
  invDate: { type: Date, required: true },
}, { collection: 'invoice' }); // Explicitly set the collection name

module.exports = mongoose.model('Invoice', invoiceSchema);

