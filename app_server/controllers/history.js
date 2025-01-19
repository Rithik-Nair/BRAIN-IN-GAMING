// app_server/controllers/history.js
const History = require('../models/history');

exports.getHistory = async (req, res) => {
  try {
    // Fetch all history data
    const historyData = await History.find().populate('userId', 'name');

    // Data processing: Calculate stats
    let totalUsage = 0;
    let maxUsage = 0;
    let minUsage = 100;  // assuming max BCI usage is 100%
    let totalGames = historyData.length;

    historyData.forEach(game => {
      totalUsage += game.bciUsage;
      maxUsage = Math.max(maxUsage, game.bciUsage);
      minUsage = Math.min(minUsage, game.bciUsage);
    });

    // Calculate average BCI usage
    const avgUsage = totalUsage / totalGames;

    // Pass the data and stats to the view
    res.render('history', { 
      title: 'Game History & BCI Analysis',
      history: historyData,
      avgUsage: avgUsage.toFixed(2),
      maxUsage,
      minUsage,
      totalGames
    });
  } catch (error) {
    console.error('Error retrieving history data:', error);
    res.status(500).send('Internal Server Error');
  }
};
