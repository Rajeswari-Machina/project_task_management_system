const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {
  createTask,
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
  getAllTasks,
  getAssignedTasks,
  getTaskDetails,
} = require('../controllers/taskController');

router.post('/:projectId', auth, createTask);
router.get('/:projectId', auth, getTasksByProject);
router.get('/:userId',getAssignedTasks);
router.put('/:taskId/status', auth, updateTaskStatus);
router.delete('/:taskId',  deleteTask);
router.get('/:taskId',auth, getTaskDetails);
router.get('/',  getAllTasks);

module.exports = router;