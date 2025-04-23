const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const router = express.Router();
const { SECRET_KEY } = require('../config/config');


router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [ { username }, { email } ] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
