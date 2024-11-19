const express = require('express')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000;


app.get('/', function(req, res){
    res.send('Dwaipayan')
})


app.listen(PORT, (req, res)=>{
    console.log(`Server Running in PORT: 3000`)
})