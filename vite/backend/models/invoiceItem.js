const mongoose = require('mongoose');

const invoiceItemSchema = new mongoose.Schema({
  invID: { type: Number, required: true },
  invtID: { type: Number, required: true, unique: true }, // Renamed from itemID to invtID
  itemDesc: { type: String, required: true },
  itemQty: { type: Number, required: true },
  itemRate: { type: Number, required: true },
  totalRate: { type: Number, required: true }
}, {
  collection: 'invoiceitem' // Explicitly set the collection name
});

module.exports = mongoose.model('InvoiceItem', invoiceItemSchema);
