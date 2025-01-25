const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emotionalStates: { type: Array, default: [] },
  brainWaveActivity: { type: Array, default: [] },
  focusLevels: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Analysis', analysisSchema);
