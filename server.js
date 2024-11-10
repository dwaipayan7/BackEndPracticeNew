const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Person = require('./models/person');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST endpoint to add a new person
app.post('/person', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        res.status(201).json(response);
        console.log("Response Data Saved");
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error Saving Data" });
    }
});

// GET
app.get('/', (req, res) => {
    res.send("Hello, Dwaipayan");
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

// Start the server
app.listen(3000, () => {
    console.log("Server Running on port 3000");
});
