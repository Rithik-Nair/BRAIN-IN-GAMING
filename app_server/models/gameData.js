const mongoose = require('mongoose');

const gameDataSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  concentration: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const GameData = mongoose.model('GameData', gameDataSchema);

module.exports = GameData;
