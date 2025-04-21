const express = require('express');
const path = require('path');
const routes = require('./routes/sensorRoutes');
const connectMongoDB = require('./db/db')

require('dotenv').config();
//require('dotenv').config({path: path.resolve(__dirname, './.env')});

const app = express();
app.use(express.json());
app.use('/sensors', routes);

// serve static file
app.use(express.static(path.join(__dirname, '../public')));

// Fallback route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

//Mongodb connection
connectMongoDB();

//server
const port = process.env.PORT || 3000; // Use environment variable for port to host
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});