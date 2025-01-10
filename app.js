const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Set the view engine to Jade (or Pug)
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files like CSS, JavaScript, and images
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./app_server/routes/authRoutes');
const indexRoutes = require('./app_server/routes/index');
app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// Error handling for missing routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
