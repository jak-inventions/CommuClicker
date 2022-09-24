const mongoose = require('mongoose');

const universalScoreSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('universalScore', universalScoreSchema);
