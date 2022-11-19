const mongoose = require("mongoose")  //Import mongose. MongoDB object modelling tool for asynchronous environment

const userSchema = new mongoose.Schema ({   //Initialize schema definition for user model
    username: {
        type: String,
        required: [true, "Please add the username"]  //required validator ensure the value is included for user object
    },
    email: {
        type: String,
        required: [true, "Please add the user email address"]
    },
    password:{
        type: String,
        required: [true, "Please add the user password"]
    },
    
    timestamp:{
        type: Date,
        required: true
    }}
    )

module.exports = mongoose.model('User', userSchema) //"User" refers to intended model name. Displayed as 'users' in  MongoDB