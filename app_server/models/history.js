const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameName: String,
  bciUsage: Number,
  analysisData: {
    labels: [String],
    data: [Number],
  },
});

const History = mongoose.model('History', historySchema);

module.exports = History;
