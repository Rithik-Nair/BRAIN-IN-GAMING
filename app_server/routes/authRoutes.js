const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render pages

router.get('/', authController.homePage); // This should render the 'home' view

router.get('/login', authController.loginPage);
router.get('/register', authController.registerPage);

// Handle form submissions
router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);

router.get('/mindmaze', (req, res) => {
    res.render('mindmaze');
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

module.exports = router;
