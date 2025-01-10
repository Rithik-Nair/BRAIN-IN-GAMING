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

module.exports = router;
