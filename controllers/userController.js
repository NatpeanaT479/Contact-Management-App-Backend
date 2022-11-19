require('dotenv').config();
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

//@desc Register a user
//@route POST /api/users/register
//@access public

//REGISTER USER
const registerUser = asyncHandler(async (req, res)=>{
    const{username,email,password} = req.body;  //getting new user according to req.body
    if (!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");

    }
    const userAvailable=await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered!")
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const user = await User.create({     //creating new user following User model
        username: req.body.username,
        email: req.body.email,
        password : hashedPassword,
        timestamp: Date.now()
    })
    try{
        const newUser = await user.save()  //saving information into user collection
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json({message:err.message})
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//LOGIN USER
const loginUser = asyncHandler(async (req, res)=>{
const {email,password} = req.body
if (!email||!password) {
    res.status(403)
    throw new Error("Must have email and password")
}
const user = await User.findOne({email});  //find if user exist based on req.body.email
if (user && (await bcrypt.compare(password, user.password))){   //compare login password to registered password
    const accessToken = jwt.sign(           // create access token using jwt.sign method and secret key saved in ACCESS_TOKEN_SECRET in .env
        {
            user:{
                username: user.username,
                email:user.email,
                id: user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
    );
    res.status(200).json({accessToken});   //access token created will be used for authorization process in validate jwt token middleware.
    console.log(`User ${user.username} with Id:${user.id} has logged in`)
}else{
    res.status(400);
    throw new Error("email or password not valid")

}
 });


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CURRENT USER
const currentUser = asyncHandler(async (req, res)=>{//display current user information after login and authorization
        console.log(`User authorized. Details name:${req.user.username}, email:${req.user.email}, id:${req.user.id}`)
        res.status(200).json({ 
            username: req.user.username, 
            email: req.user.email, 
            id : req.user.id})
});


module.exports = {registerUser, loginUser, currentUser};