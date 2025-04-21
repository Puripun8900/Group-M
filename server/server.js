const express = require('express');
const path = require('path');
const routes = require('./routes/sensorRoutes');
const connectMongoDB = require('./db/db');
const { PORT } = require('./config/config');


const app = express();
app.use(express.json());
app.use('/sensors', routes);

// serve static file
app.use(express.static(path.join(__dirname, '../public')));

// Fallback route to serve index.html
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