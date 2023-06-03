const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Please provide first name']
    },
    lastName:{
        type:String,
        required:[true,'Please provide last name']
    },
    email:{
        type:String,
        required:[true,'Please provide email'],
        unique:true
    },
    phone:{
        type:String,
        required:[true,'Please provide phone number']
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model('users',userSchema);