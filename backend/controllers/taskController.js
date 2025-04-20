const Task = require('../models/Task');
exports.createTask = async (req, res) => {
  try {
    const { projectId } = req.params;
    const taskData = {
      ...req.body,
      projectId,
    };

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assignedTo } = req.query;

    let query = { projectId: projectId };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    const tasks = await Task.find({ projectId: projectId })
      .populate('projectId', 'title') 
      .populate('assignedTo', 'name');
    console.log(tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAssignedTasks = async(req,res)=>{
  const userId = req.params.userId
  try{
    const assignedTasks = await Task.find({assignedTo:userId })
    console.log(tasks);
    res.status(200).json(task)
  }catch(err){
    res.status(200).json(assignedTasks)
  }
}
exports.getTaskDetails = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId)
    if (!task) return res.status(404).json({ error: 'Task not found' });
    console.log(task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getUserTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ assignedTo: userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
