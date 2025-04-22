const mongoose = require('mongoose');
const { MONGO_URI, DB_NAME, NODE_ENV } = require('../config/config');

/**
 * Async function to connect to the MongoDB
 * @return {Promise<void>}
 */
const connectDB = async () => {
    try {
        if (!MONGO_URI || !DB_NAME || !NODE_ENV) {
            console.error('Missiing environment variable from .env');
            process.exit(1);
        };

        await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000
        });

        if(NODE_ENV.toLowerCase() !== 'production') {
            console.log(`Mongodb connected successfully to ${mongoose.connection.host}. \nPress (ctrl + c) to graceful shutdown`);
        }else {
            console.log(`Mongodb connected successfully to. \nPress (ctrl + c) to graceful shutdown`);
        };
    } catch (error) {
        console.error('Connection error', error.stack);
        process.exit(1);
    };
};

/**
 * logs MongoDB connection lifecycle events for observability
 * mongoose.connection is an instance of an EventEmitter
 * events names: connected, disconnected, error, reconnected, close, open
 */
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database');
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected to database');
});

mongoose.connection.on('error', (error) => {
    console.error('Mongoose connection error',error.stack);
});


/**
 * Graceful shutdown handler
 * SIGINT = Interrupt Signal.Happens when manually stop the app in terminal using Ctrl+C
 * SIGTERM = Termination Signal (Cloud,Docker). Happens when the OS or platform tells the app to shut down
 */
const gracefulShutdown = async (signal)=> {
    try {
        await mongoose.connection.close();
        console.log(`MongoDB database disconnected, ${signal} received`);
        process.exit(0);
    } catch (error) {
        console.error('Disconnection Error ', error.stack);
        process.exit(1);
    };
};
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

module.exports = connectDB;