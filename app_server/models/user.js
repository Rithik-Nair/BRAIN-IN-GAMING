const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a new schema for user data
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
