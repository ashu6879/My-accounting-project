const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  projectID: {type: String,required: true,unique: true},
  projectTitle: { type: String, required: true },
  ServicedBy: { type: String, required: true },
  SaledoneBy: { type: String },
  ApprovedBy: { type: String },
  ProgressBy: { type: String },
  clientID:   { type: String },
  projectCat: { type: String },
});
const Client = mongoose.model('projects', clientSchema);

module.exports = Client;
