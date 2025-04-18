const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { addComment, getComments } = require('../controllers/commentController');

router.post('/:taskId', auth, addComment);
router.get('/:taskId', auth, getComments);

module.exports = router;