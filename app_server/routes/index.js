// routes/index.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // Import the controller

// Home route
router.get('/', (req, res) => {
  res.render('index', { title: 'Home - Brain In Gaming' });
});

// Home page route
router.get('/home', authController.homePage);

// Games page route
router.get('/games', authController.gamesPage);

router.get('/mindmaze', function(req, res, next) {
  res.render('mindmaze', { title: 'Mind Maze' });
});

router.get('/neurodash', (req, res) => {
  res.render('neurodash');
});

router.get('/brainbeats', (req, res) => {
  res.render('brainbeats');
});

router.get('/cerebralcrossing', (req, res) => {
  res.render('cerebralcrossing');
});

// Login and Register pages
router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);

// POST routes for login and register
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;
