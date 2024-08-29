const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true, unique: true },
  clientPhone: { type: String },
  clientAddress: { type: String },
  clientCat: { type: String }
});
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
