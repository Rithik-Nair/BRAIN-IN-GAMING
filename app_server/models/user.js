const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },  // User's full name
  username: { type: String, required: true, unique: true },  // Username must be unique
  email: { type: String, required: true, unique: true },  // Email must be unique
  password: { type: String, required: true },  // Password must be provided
});

// Method to compare entered password with stored password
userSchema.methods.comparePassword = function(candidatePassword) {
  return candidatePassword === this.password;  // Compare plain text passwords
};

const User = mongoose.model('User', userSchema);  // Create the User model based on the schema

module.exports = User;  // Export the User model
