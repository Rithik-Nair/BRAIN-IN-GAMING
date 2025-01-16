const express = require('express');
const router = express.Router();
const User = require('../models/user');  // Import User model

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

// Register route (POST)
router.post('/register', (req, res) => {
  const { name, username, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Check if email or username already exists
  User.findOne({ $or: [{ email }, { username }] })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).send('Username or Email already exists');
      }

      // Create a new user
      const newUser = new User({
        name: name,
        username: username,
        email: email,
        password: password  // Password will be stored as plain text
      });

      // Save the user to the database
      newUser.save()
        .then(user => {
          res.redirect('/login');  // Redirect to login page after successful registration
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error registering user');
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error checking existing user');
    });
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
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(400).send('Incorrect credentials');
    }

    // Compare the entered password with the stored plain password
    if (user.password !== password) {
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

// Route to render the profile page
router.get('/profile', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');  // Redirect to login if not logged in
  }

  // Retrieve user data from session or database
  const user = req.session.user;

  // Render the profile page with user data
  res.render('profile', { user });
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

router.get('/games/mindmaze', function(req, res, next) {
  const cards = [
    { name: 'Card 1', image: '/images/card1.jpg' },
    { name: 'Card 2', image: '/images/card2.jpg' },
    { name: 'Card 3', image: '/images/card3.jpg' },
    { name: 'Card 4', image: '/images/card4.jpg' },
    { name: 'Card 5', image: '/images/card5.jpg' },
    { name: 'Card 6', image: '/images/card6.jpg' },
    { name: 'Card 1', image: '/images/card1.jpg' },
    { name: 'Card 2', image: '/images/card2.jpg' },
    { name: 'Card 3', image: '/images/card3.jpg' },
    { name: 'Card 4', image: '/images/card4.jpg' },
    { name: 'Card 5', image: '/images/card5.jpg' },
    { name: 'Card 6', image: '/images/card6.jpg' }
  ];

  // Pass the cards array to the mindmaze template
  res.render('mindmaze', { cards: cards });
});


router.get('/games/brainbeats', function(req, res, next) {
  res.render('brainbeats');
});

router.get('/games/cerebralcrossing', function(req, res, next) {
  res.render('cerebralcrossing');
});

// 404 route for any unknown paths
router.use((req, res) => {
  res.status(404).send('Page not found!');  // Display a 404 error for unknown routes
});

module.exports = router;
