const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.send("Dwaipayan")
});

app.get('/paneer', (req, res)=>{
    res.send("Paneer is a very tasty")
})

app.listen(3000, ()=>{
    console.log("Server Running");
    
})