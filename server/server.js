const express = require('express');
const path = require('path');
const routes = require('./routes/sensorRoutes');
const connectMongoDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const { PORT } = require('./config/config');


const app = express();
app.use(express.json());
app.use('/sensors', routes);
app.use('/auth', authRoutes);

// Serve static files from 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Serve login page at root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

// Serve signup page explicitly
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

// Serve home page (index.html) after login
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Catch-all fallback (optional)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});
//Mongodb connection
connectMongoDB();

//server
const port =  PORT || 3000; // Use environment variable for port to host
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


module.exports = app;