/**
 * TVTOR Backend Server
 * Main entry point for the tutoring platform backend API
 * Handles database connection, middleware setup, and route configuration
 */

// Import required dependencies
var express = require('express');
var config = require('./config/config');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routers/Routes');
var path = require('path')

// Set server port from environment variable or default to 5000
var port = process.env.PORT || 5000;

// Configure Mongoose to use ES6 Promises
mongoose.Promise = Promise;

// Database connection configuration
// Connect to MongoDB using the URI from config
const mongoUri = config.mongoUri;
mongoose.connect(mongoUri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}).then(() => {
    console.log('✅ Connected to MongoDB successfully');
}).catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('Database URI:', mongoUri.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials
    process.exit(1); // Exit process to avoid hanging
});

// Handle database connection errors after initial connection
mongoose.connection.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1); // Exit process to avoid hanging
});

// Handle database disconnection
mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
});

// Enable Mongoose debug logging in development environment
// This logs all database queries for debugging purposes
if (config.MONGOOSE_DEBUG) {
    mongoose.set('debug', (collectionName, method, query, doc) => {
        debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
    });
}

// Middleware configuration
// Parse JSON payloads in request body
app.use(bodyParser.json());
// Parse URL-encoded payloads in request body
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration for cross-origin requests
// Allows requests from any origin with credentials support
var corsOption = {
    origin: true, // Allow all origins
    methods: 'GET, HEAD,PUT,POST,PATCH,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers)
    exposedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, access-token"]
}

// Static route for password reset page
// Serves the password reset HTML form
app.get('/forgotpassword', function (req, res) {
    res.sendFile(__dirname + "/public/Reset/" + "index.html");
})

// Static route for chatbot interface
// Serves the chatbot HTML interface
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + "/public/chatbot/" + "index.html");
})

// Apply CORS middleware to all routes
app.use(cors(corsOption));

// Serve static files from the public directory
// This makes files in public/ accessible via direct URLs
app.use(express.static(path.join(__dirname + '/')));

// Set the application root directory in config for use in other modules
config.appRoot = __dirname;

// Generic middleware for request processing
// Currently just passes control to next middleware
app.use((req, res, next) => {
    next()
})

// Global CORS headers middleware
// Ensures all responses include proper CORS headers
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE,OPTIONS");
    next();
});

// API routes configuration
// All API endpoints are prefixed with /api/v1
app.use('/api/v1', router);

// Root route - API welcome message
app.route('/')
    .get(function (req, res) {
        return res.status(200).json({ message: "Welcome to admin apis" });
    });

// Start the server and listen on specified port
app.listen(port, () => {
    console.log('Server is running on port ---->', port);
})