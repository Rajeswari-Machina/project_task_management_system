const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware');
const { createProject, getAllProjects } = require('../controllers/projectController');

router.post('/', auth, role('admin'), createProject);
router.get('/', auth, getAllProjects);

module.exports = router;