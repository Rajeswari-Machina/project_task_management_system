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

router.get('/',  getAllTasks);
router.post('/:projectId', auth, createTask);
router.get('/:projectId', auth, getTasksByProject);
router.get('/assigned/:userId',getAssignedTasks);
router.put('/:taskId/status', auth, updateTaskStatus);
router.delete('/:taskId',  deleteTask);
router.get('/:taskId',auth, getTaskDetails);

module.exports = router;