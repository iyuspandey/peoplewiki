const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  username: String,
  text: String,
  timestamp: Date,
});

const discussionSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: String,
  createdAt: { type: Date, default: Date.now },
  messages: [messageSchema],
});

// Export the model properly
module.exports = mongoose.model('Discussion', discussionSchema);

