const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history'); // Corrected path

// Route for history page
router.get('/history', historyController.getHistory);

module.exports = router;
