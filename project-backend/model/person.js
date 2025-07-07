const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  category: { type: String, required: true },
  department: { type: String },
  email: { type: String, required: true },
  // Additional fields for students
  rollNumber: { type: String },
  position: { type: String },
  image: { type: String },
  // Additional fields for faculty
  // Add any other fields that might be specific to faculty or students
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);