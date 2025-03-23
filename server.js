require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/sensorRoutes.js');

const app = express();
app.use(express.json());
app.use('/sensors', routes);

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
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});