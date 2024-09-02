const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  projectID: {type: Number,required: true,unique: true},
  projectTitle: { type: String, required: true },
  ServicedBy: { type: String, required: true },
  SaledoneBy: { type: String },
  ApprovedBy: { type: String },
  ProgressBy: { type: String },
  clientID:   { type: Number },
  projectCat: { type: String },
});
const Client = mongoose.model('projects', clientSchema);

module.exports = Client;
