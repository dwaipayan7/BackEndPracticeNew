const express = require('express');
const bodyParser = require('body-parser');
const MenuItem = require('./models/menu');
const connectDB = require('./config/db');
const app = express();
const passport = require('./auth/auth')

// Connect to MongoDB
connectDB().catch(err => console.error('Database connection error:', err));

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to: "${req.originalUrl}"`);
  next();
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logRequest);

// Initialize Passport
app.use(passport.initialize());


const localAuthMiddleware = passport.authenticate('local', {session:false})

// Default GET endpoint
app.get('/', (req, res) => {
  res.send("Hello, Dwaipayan");
});

// Importing routes and using them
const personRoutes = require('./routes/person.router');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu.router');
app.use('/menu',localAuthMiddleware ,menuRoutes);

app.listen(3000, () => {
  console.log("Server Running on port 3000");
});
