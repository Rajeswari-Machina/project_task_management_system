const express = require('express');
const router = express.Router();
const { login, register, logout,users } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/register', register);
router.get('/logout',logout);
router.get('/users',authMiddleware,users)
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;