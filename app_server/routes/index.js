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

// Login and Register pages
router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);

// POST routes for login and register
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

module.exports = router;
