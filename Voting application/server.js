const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const userRoutes = require('./router/user.routes');

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

// Routes
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Dwaipayan');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);
});
