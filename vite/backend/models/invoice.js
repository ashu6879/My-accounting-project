const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invID: { type: Number, required: true, unique: true },
  clientID: { type: Number, required: true, ref: 'Client' },
  projectID: { type: Number, required: true, ref: 'Project' },
  printdate: { type: Date, required: true },
  invNum: { type: String, required: true, unique: true },
  remarks: { type: String },
  invDate: { type: Date, required: true },
  currency: { type: String, required: true },
}, { collection: 'invoice' }); // Explicitly set the collection name

module.exports = mongoose.model('Invoice', invoiceSchema);
