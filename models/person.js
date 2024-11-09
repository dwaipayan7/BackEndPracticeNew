const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    address: {
        type:String,
        required:true
    }


});

module.exports = mongoose.model("Person", personSchema);