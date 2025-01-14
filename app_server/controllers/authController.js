const User = require('../models/user');  // Make sure to import the User model

// POST route for login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username and password
    const user = await User.findOne({ username, password });
    
    if (user) {
      // Store user ID in the session
      req.session.userId = user._id;

      // Redirect to home page after successful login
      return res.redirect('/');
    } else {
      // Invalid credentials
      return res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).send('Server error');
  }
};

// GET route for logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Failed to log out');
    }
    res.redirect('/login');  // Redirect to login page after logging out
  });
};
