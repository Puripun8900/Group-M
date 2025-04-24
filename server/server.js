const express = require('express');
const path = require('path');
const routes = require('./routes/sensorRoutes');
const connectMongoDB = require('./db/db');
const authRoutes = require('./routes/authRoutes');
const { PORT, NODE_ENV } = require('./config/config');
const cors = require('cors');

const app = express();
app.use(express.json());

/**
 * CORS configuration
 * Allow requests from specific origins
 */
const allowedOrigins = [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:3030',
    'https://smartgym-m.azurewebsites.net'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed for this origin'));
        }
    },
    credentials: true
}));

// Routes
app.use('/sensors', routes);
app.use('/auth', authRoutes);

/**
 * Serve static files from the public directory
 * For example, http://localhost:3030/login.html will serve the login.html file
 */
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

connectMongoDB();


const port = PORT || 3030;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
