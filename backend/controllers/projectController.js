const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  const project = await Project.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(project);
};

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};