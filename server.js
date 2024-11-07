const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send("Dwaipayan")
});

app.get('/paneer', (req, res)=>{
    res.send("Paneer is a very tasty")
})

app.get('/idli', (req,res)=>{
    var customized = {
        name: 'Paneer Dhosa',
        size: '10 cm',
        is_sambar: true,
        is_chutney: false
    }
    res.send(customized)
})

app.listen(3000, ()=>{
    console.log("Server Running");
    
})