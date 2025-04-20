const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
}, { timestamps: true });

// Virtual for project name
taskSchema.virtual('projectName', {
  ref: 'Project',
  localField: 'project',
  foreignField: '_id',
  justOne: true,
  options: { select: 'title' },
});

// Virtual for assigned user's name
taskSchema.virtual('assignedToName', {
  ref: 'User',
  localField: 'assignedTo',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' },
});

// Enable virtuals in JSON and object outputs
taskSchema.set('toObject', { virtuals: true });
taskSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Task', taskSchema);