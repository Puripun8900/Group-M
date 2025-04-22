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

// serve static file
app.use(express.static(path.join(__dirname, '../public')));

// Fallback route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

//Mongodb connection
connectMongoDB();

//server
const port =  PORT || 3000; // Use environment variable for port to host
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});


module.exports = app;