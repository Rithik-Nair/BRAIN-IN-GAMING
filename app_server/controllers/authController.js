const User = require('../models/user'); // Import the User model
const bcrypt = require('bcrypt'); // For password hashing

// Render login page
exports.loginPage = (req, res) => {
  res.render('login', { title: 'Login - Brain Games' });
};

// Render registration page
exports.registerPage = (req, res) => {
  res.render('register', { title: 'Register - Brain Games' });
};

// Handle user registration
exports.registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('Account already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });

    // Save new user
    await newUser.save();
    res.redirect('/auth/login'); // Redirect to login page after registration
  } catch (error) {
    res.status(500).send('Error during registration: ' + error.message);
  }
};

// Handle user login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User does not exist');
    }

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send('Incorrect password');
    }

    res.redirect('/home'); // Redirect to home after successful login
  } catch (error) {
    res.status(500).send('Error during login: ' + error.message);
  }
};

// Render games page
exports.gamesPage = (req, res) => {
  const games = [
    { name: 'Mind Maze', description: 'A challenging puzzle game' },
    { name: 'Neuro Dash', description: 'A fast-paced neuro game' },
    { name: 'Brain Beats', description: 'A rhythm-based brain game' },
    { name: 'Cerebral Crossing', description: 'A problem-solving game' },
  ];
  console.log('Rendering games page with games:', games);
  res.render('games', { title: 'Games - Brain Games', games });
};

// Render home page
exports.homePage = (req, res) => {
  res.render('home', { title: 'Welcome to Brain Games' });
};
