const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to render the index page (home) if already logged in
router.get('/', (req, res) => {
  if (req.session.user) {
    // If the user is already logged in, redirect to home page
    return res.redirect('/home');
  }
  res.render('index');  // Render the index page if the user is not logged in
});

// Route to render the registration page
router.get('/register', (req, res) => {
  res.render('register');  // Show the registration page
});

// Handle registration form submission
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Create a new user in the database
    const newUser = new User({ username, password });
    await newUser.save();

    // Redirect to login page after successful registration
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error while registering the user');
  }
});

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('login');  // Render the login page
});

// Handle login form submission
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ username: username, password: password });

    if (!user) {
      return res.status(400).send('Incorrect credentials');
    }

    // Store user data in the session and redirect to home page
    req.session.user = user;
    res.redirect('/home');  // Redirect to the home page after successful login
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error occurred');
  }
});

// Route for the home page (after successful login)
router.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');  // If no session, redirect to login page
  }

  const userData = req.session.user;  // Retrieve user data from session
  res.render('home', { user: userData });  // Render the home page with user data
});

// Route to render the About page
router.get('/about', (req, res) => {
  if (req.session.user) {
    // If user is logged in, pass user data to the view
    res.render('about', { user: req.session.user });
  } else {
    // If user is not logged in, render the page without user data
    res.render('about');
  }
});

// Logout route to destroy session and redirect to index page
router.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.send('Error while logging out');
    }
    res.redirect('/');  // Redirect to index page after logging out
  });
});

// Game route for Neuro Dash
router.get('/games/neurodash', (req, res) => {
  res.render('neurodash');  // Render the neurodash game page
});

// 404 route for any unknown paths
router.use((req, res) => {
  res.status(404).send('Page not found!');  // Display a 404 error for unknown routes
});

module.exports = router;
