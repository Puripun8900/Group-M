const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const router = express.Router();

const SECRET_KEY = 'mySecretKey'; // Ideally from process.env

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password){
            return res.status(400).json({ message: 'Username and password required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err.stack);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
