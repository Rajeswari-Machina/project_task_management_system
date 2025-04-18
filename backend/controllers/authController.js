const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {validationResult } = require('express-validator');
const User = require('../models/User');

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  console.log(req.body);
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Error('Email already exists');
  }
  const user = await User.create({ name, email, password: hashedPassword, role });
  const token = createToken(user._id);
  res.cookie('token', token, { httpOnly: true }).json({ message: 'User registered', user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = createToken(user._id);
  res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', user });
};

exports.logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};