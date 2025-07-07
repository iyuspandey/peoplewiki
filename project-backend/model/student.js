const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rollno: {
    type: String,
    required: true,
    unique: true
  },
  cgpa: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  course: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  disability: {
    type: Boolean,
    default: false
  },
  active_backlogs: {
    type: Boolean,
    default: false
  },
  backlogs_history: {
    type: Boolean,
    default: false
  },
  account_deactivate: {
    type: Boolean,
    default: false
  },
  debarred: {
    type: Boolean,
    default: false
  },
  internshipstatus: {
    type: String,
    default: "No Intern"
  },
  placementstatus: {
    type: String,
    default: "Not Placed"
  },
  category: {
    type: String,
    enum: ['Student', 'Faculty', 'Staff','General','OBC','ST','SC','EWS'],
    default: 'Student'
  },
  image: {
    type: String,
    default: 'default.jpg' // Default image path
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Student', studentSchema);
