// app_server/routes/history.js

const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Route for displaying the history page with emotion meter
router.get('/', historyController.showHistory);

module.exports = router;
