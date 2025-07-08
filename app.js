const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const User = require('./app_server/models/user');  // Import the User model
const GameData = require('./app_server/models/gameData'); // Import GameData model
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const router = express.Router(); // Define the router

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set view engine to Jade (now Pug)
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'app_server/views'));

// Serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
// Proxy Flask API
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // Flask server
    changeOrigin: true,
  })
);

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

// Game Data Save Route
router.post('/saveGameData', (req, res) => {
  const { score, concentration } = req.body;
  const newGameData = new GameData({ score, concentration });

  newGameData.save((err) => {
    if (err) return res.status(500).send('Error saving game data');
    res.status(200).send('Game data saved');
  });
});

// Analysis Page Route
router.get('/analysis', (req, res) => {
  GameData.find({}).sort({ timestamp: -1 }).limit(1).exec((err, data) => {
    if (err) return res.status(500).send('Error fetching analysis data');
    res.render('analysis', { data: data[0] });
  });
});

// Use the router for game-related routes
app.use('/game', router);

// Import the routes
const indexRoutes = require('./app_server/routes/index');  // For home, login, logout, etc.
const historyRoutes = require('./app_server/routes/history');  // Import history routes

// Use routes
app.use('/', indexRoutes);
app.use('/history', historyRoutes);

// Home Route
app.get('/', (req, res) => {
  if (!req.session.user) {
    res.render('index');
  } else {
    res.redirect('/home');
  }
});

// Login Route
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username })
    .then(user => {
      if (!user) return res.status(400).send('Invalid username or password');

      user.comparePassword(password, (err, isMatch) => {
        if (err || !isMatch) return res.status(400).send('Invalid username or password');
        req.session.user = user;
        res.redirect('/home');
      });
    })
    .catch(err => res.status(500).send('Server error occurred'));
});

// Registration Routes
app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) return res.status(400).send('All fields are required');

  const newUser = new User({ username, email, password });
  newUser.save()
    .then(() => res.redirect('/home'))
    .catch(err => res.status(500).send('Error registering user'));
});

// Profile Route
app.get('/profile', (req, res) => {
  if (req.session.user) {
    res.render('profile', { user: req.session.user });
  } else {
    res.redirect('/login');
  }
});

// Edit Profile Routes
app.get('/editprofile', (req, res) => {
  if (req.session.user) {
    const successMessage = req.query.successMessage || '';
    res.render('editprofile', { user: req.session.user, successMessage: successMessage });
  } else {
    res.redirect('/login');
  }
});

app.post('/editprofile', (req, res) => {
  const { name, username, email, password } = req.body;

  if (!req.session.user) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const updateData = {};
  if (name) updateData.name = name;
  if (username) updateData.username = username;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  User.findByIdAndUpdate(req.session.user._id, updateData, { new: true })
    .then(updatedUser => {
      req.session.user = updatedUser;
      res.redirect('/editprofile?successMessage=Profile updated successfully');
    })
    .catch(err => res.status(500).json({ success: false, message: 'Error updating profile' }));
});

// Logout Route
app.get('/auth/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error while logging out');
    res.redirect('/');
  });
});

// Game Routes
app.get('/games/neurodash', (req, res) => {
  res.render('neurodash');
});

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

  res.render('mindmaze', { cards: cards });
});

app.get('/games/brainbeats', (req, res) => {
  res.render('brainbeats');
});

app.get('/cerebralcrossing', (req, res) => {
  const words = ["LION", "TIGER", "BEAR", "FOX", "WOLF", "EAGLE", "SHARK", "SNAKE"];
  res.render('cerebralcrossing', { words: words });
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).send('Sorry, we couldn’t find that page!');
});

// Start the Server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
