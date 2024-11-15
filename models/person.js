const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    },
    salary: {
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

personSchema.pre('save', async (next)=>{
    const person = this;

    //Hash the person only it has been modified
    if (!person.isModified('password')) {
        return next();
    }

    try {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword;

        next()
    } catch (error) {
        return next()
    }

});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {

        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        
    } catch (error) {
        throw error
    }
}



module.exports = mongoose.model("Person", personSchema);