// app_server/models/gameHistory.js
const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    gameName: { type: String, required: true },
    bciUsage: { type: Number, required: true },  // Percentage of BCI usage
    analysisData: { type: Object, required: true },  // Store the analysis data (e.g., chart data, stats)
    timestamp: { type: Date, default: Date.now }
});

const GameHistory = mongoose.model('GameHistory', gameHistorySchema);
module.exports = GameHistory;
