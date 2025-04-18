// routes/taskRouter.js
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
  getUserTasks,
} = require('../controllers/taskController');

router.post('/:projectId', auth, role('admin'), createTask);
router.get('/:projectId', auth, getTasksByProject);
router.put('/:taskId/status', auth, updateTaskStatus);
router.delete('/:taskId', auth, role('admin'), deleteTask);
router.get('/user/:userId', auth, getUserTasks);

module.exports = router;
