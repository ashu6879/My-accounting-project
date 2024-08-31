const mongoose = require('mongoose');

const projectCategorySchema = new mongoose.Schema({
  pcID: {type: Number,unique: true,required: true,},
  pcName: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ProjectCategory', projectCategorySchema);
