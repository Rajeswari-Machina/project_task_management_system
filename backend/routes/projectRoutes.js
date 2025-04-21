const express = require('express');
const router = express.Router();

const { createProject, getAllProjects,getProjectById } = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');

router.post('/',auth,role('admin'), createProject);
router.get('/',auth, getAllProjects);
router.get('/:projectId',auth, getProjectById);

module.exports = router;