const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    task: req.params.taskId,
    user: req.user._id,
  });
  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ task: req.params.taskId }).populate('user');
  res.json(comments);
};