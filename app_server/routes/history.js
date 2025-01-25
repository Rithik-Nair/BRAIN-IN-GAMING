// app_server/routes/history.js
const express = require('express');
const router = express.Router();
const GameData = require('../models/gameData');  // Make sure GameData model is imported

// Fetch all game analyses and render the history page
router.get('/', async (req, res) => {
  try {
    // Fetch game data from the database using async/await
    const analyses = await GameData.find({}).sort({ timestamp: -1 });  // Sort by timestamp (most recent first)
    
    // Pass the 'analyses' to the Jade view
    res.render('history', { analyses: analyses });
  } catch (err) {
    // Handle errors
    console.error('Error fetching analysis data:', err);
    res.status(500).send('Error fetching analysis data');
  }
});

module.exports = router;
