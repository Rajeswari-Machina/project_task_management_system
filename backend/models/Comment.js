const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  content: String,
  task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Comment', commentSchema);