const express = require('express');
const bodyParser = require('body-parser');
const MenuItem = require('./models/menu');
const Person = require('./models/person')
const connectDB = require('./config/db');
const app = express();
const passport = require('passport')
const LocalStrategy = require('passport').Strategy

// Connect to MongoDB
connectDB().catch(err => console.error('Database connection error:', err));


//Middleware Function

const logRequest = (req, res, next) =>{
  console.log(`[${new Date().toLocaleString()}] Request Made to: "${req.originalUrl}"`)
  next()
}


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logRequest);

//passport
app.use(new LocalStrategy(async (username, password, done)=>{

  try {

    console.log('Received credentials: ', username, password);
    const user = Person.findOne({username:username});
    if(!user){
      return done(null,false, {message:"Incorrect User"})
    }

    const isPasswordMatch = user.password === password ? true:false;

    if (isPasswordMatch) {
      return done(null,user)
    }else{
      return done(null,false, {message:"Incorrect User"})
    }
    
  } catch (error) {
    return done(error)
  }

}));

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
