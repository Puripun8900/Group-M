const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.resolve(__dirname, '../../.env')});

module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME || 'gymdb',
    NODE_ENV: process.env.NODE_ENV || 'Development'
};