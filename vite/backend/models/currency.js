const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  currencyID: { type: Number, unique: true, required: true },
  currencyName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Currency', currencySchema);
