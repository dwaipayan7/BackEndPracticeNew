const express = require('express');
const bodyParser = require('body-parser');
const MenuItem = require('./models/menu');
const connectDB = require('./config/db');
const app = express();

// Connect to MongoDB
connectDB().catch(err => console.error('Database connection error:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Default GET endpoint
app.get('/', (req, res) => {
  res.send("Hello, Dwaipayan");
});

// Importing routes and using them
const personRoutes = require('./routes/person.router');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menu.router');
app.use('/menu', menuRoutes)

app.listen(3000, () => {
  console.log("Server Running on port 3000");
});

// app.get('/paneer', (req, res) => {
//     res.send("Paneer is very tasty");
// });

// app.get('/idli', (req, res) => {
//     const customized = {
//         name: 'Paneer Dosa',
//         size: '10 cm',
//         is_sambar: true,
//         is_chutney: false
//     };
//     res.json(customized);
// });
