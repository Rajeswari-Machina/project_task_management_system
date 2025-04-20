const Project = require('../models/Project');

exports.createProject =  async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  const project = new Project({ title, description, user: userId });
  await project.save();
  res.status(201).json({ message: 'Project created', project });
}

exports.getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.projectId).populate('username', 'name');
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.json(project);
}