const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/authController');
const {body} = require("express-validator")
router.post('/register',body('email').isEmail().withMessage('invalid Email') ,register);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;