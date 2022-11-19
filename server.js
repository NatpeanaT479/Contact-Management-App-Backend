//Import all required packages, controllers, and middleware
const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const {connect} = require("./config/dbConnection")
const app = express();
const {errorHandler} = require("./middleware/errorHandler")

//Listening port for contact management app
const port = process.env.PORT || 5001
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
}); 

mongoose.connect //connect to MongoDB

app.use(express.json())  //to parse the incoming requests with JSON payload


app.get("/", (req,res) =>{ //to handle error when accessing non-existent route
    res.status(404)
    throw new Error("Path does not exist. Please login at http://localhost:3000/api/users/login")
} )


//Routes directory for users and contacts
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

module.exports = app;


