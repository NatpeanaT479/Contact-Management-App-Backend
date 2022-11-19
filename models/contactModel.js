const mongoose = require("mongoose"); //MongoDB object modelling tool for asynchronous environment

const contactSchema = new mongoose.Schema({  //Initialize schema definition for contact model
    User : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true   //required validator ensure the value is included for user object
    },
    name : {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email : {
        type: String,
        required: [true, "Please add contact email address"]
    },
    phone : {
        type: String,
        required: [true, "Please add the contact phone number"]
    },
    timestamp: {
        type: Date,
        required: true

}
})


module.exports = mongoose.model('Contact', contactSchema)  //"Contact" refers to intended model name. Displayed as 'contacts' in  MongoDB