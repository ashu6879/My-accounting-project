const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientID: { type: Number, required: true, unique: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true, unique: true },
  clientPhone: { type: String },
  clientAddress: { type: String },
  clientCat: { type: String }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
