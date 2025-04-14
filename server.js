const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/sensorRoutes.js');
const path = require('path');

require('dotenv').config({path: path.resolve(__dirname, './.env')});

const app = express();
app.use(express.json());
app.use('/sensors', routes);

// serve static file
app.use(express.static(path.join(__dirname, 'frontend')));

// Fallback route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


//Mongodb connection
const MONGO_URL = process.env.MONGO_URI;
const connectToMongodb = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            dbName: 'gymdb',
        });
        console.log(`Successfully connected to gymdb database in the MongoDB.`);
    } catch (error) {
        console.error(" MongoDB connection error", error.stack);
        process.exit(1);
    }
};
connectToMongodb();


//server
const port = process.env.PORT || 3000; // Use environment variable for port to host
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});