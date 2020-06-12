const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 18
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    required: false,
    min: 6,
    max: 1024
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('user', userSchema);
