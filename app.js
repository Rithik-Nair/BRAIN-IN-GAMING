const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const User = require('./app_server/models/user');  // Import the User model
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
  if (!req.session.user) {
    res.render('index');  // Renders 'index.jade'
  } else {
    res.redirect('/home');  // If logged in, redirect to /home
  }
});

// Login route (GET)
app.get('/login', (req, res) => {
  res.render('login');  // Render login page
});

// Login route (POST)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user by username
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        return res.status(400).send('Invalid username or password');
      }

      // Compare the entered password with the stored hash
      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(400).send('Invalid username or password');
        }

        // Store user data in session
        req.session.user = user;
        res.redirect('/home');
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Server error occurred');
    });
});

// Register route (GET)
app.get('/register', (req, res) => {
  res.render('register');  // Render registration page
});

// Register route (POST)
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // Check if all required fields are provided
  if (!username || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  // Create a new user
  const newUser = new User({
    username: username,
    email: email,
    password: password // Password will be hashed before saving due to middleware in the User schema
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
});

// Profile route (GET)
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render('profile', { user: req.session.user });
  } else {
    res.redirect('/login');  // If not authenticated, redirect to login page
  }
});

// Logout route
app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.send('Error while logging out');
    }
    res.redirect('/');  // Redirect to index.jade after logout
  });
});

// Game route for Neuro Dash
app.get('/games/neurodash', (req, res) => {
  res.render('neurodash'); // This will render the neurodash.jade file
});

// Game route for Mind Maze
app.get('/games/mindmaze', (req, res) => {
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


// Game route for Brain Beats
app.get('/games/brainbeats', (req, res) => {
  res.render('brainbeats'); // This will render the brainbeats.jade file
});

// Game route for Cerebral Crossing
app.get('/games/cerebralcrossing', (req, res) => {
  res.render('cerebralcrossing'); // This will render the cerebralcrossing.jade file
});

// 404 route (catch all unknown routes)
app.use((req, res, next) => {
  res.status(404).send('Sorry, we couldn’t find that page!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
