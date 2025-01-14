const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to render login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Route to render register page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST route for login
router.post('/login', authController.login);

// POST route for register
router.post('/register', authController.register);

module.exports = router;
