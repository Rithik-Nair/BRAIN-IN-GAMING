const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport'); // For user authentication
const path = require('path');
const app = express();

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine to Jade (now Pug)
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app_server/views'));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/brain_in_gaming')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Set up session middleware
app.use(session({
  secret: 'brain_in_gaming',  // Replace with your actual secret key
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport.js for user authentication
app.use(passport.initialize());
app.use(passport.session());

// Import routes
const indexRoutes = require('./app_server/routes/index'); // For home, login, logout, etc.
app.use('/', indexRoutes);  // Use the index.js routes for handling "/" and other routes

// Home route (root)
app.get('/', (req, res) => {
  // If the user is not logged in, render index.jade
  if (!req.session.user) {
    res.render('index');  // Renders 'index.jade'
  } else {
    res.redirect('/home');  // If logged in, redirect to /home (you can change this if needed)
  }
});

// Login route
app.get('/login', (req, res) => {
  res.render('login');  // Render login page
});

// Register route
app.get('/register', (req, res) => {
  res.render('register');  // Render registration page
});

// Profile route
app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/login');  // If not authenticated, redirect to login page
  }
});

// Logout route
app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');  // Redirect to index.jade after logout
  });
});

// Game route for Neuro Dash
app.get('/games/neurodash', (req, res) => {
  res.render('neurodash'); // This will render the neurodash.jade file
});

// 404 route (catch all unknown routes)
app.use((req, res, next) => {
  res.status(404).send('Page not found!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
