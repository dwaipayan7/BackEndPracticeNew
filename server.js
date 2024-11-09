const express = require('express')
const app = express()
const Person = require('./models/person')

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/person', (req, res) =>{
    const data = req.body;

    const newPerson = new Person(data);
    newPerson.save()
    res.status(201).json({message:"Data Saved"})
})

app.listen(3000, ()=>{
    console.log("Server Running");
    
})



// app.get('/', function(req, res){
//     res.send("Dwaipayan")
// });

// app.get('/paneer', (req, res)=>{
//     res.send("Paneer is a very tasty")
// })

// app.get('/idli', (req,res)=>{
//     var customized = {
//         name: 'Paneer Dhosa',
//         size: '10 cm',
//         is_sambar: true,
//         is_chutney: false
//     }
//     res.send(customized)
// })