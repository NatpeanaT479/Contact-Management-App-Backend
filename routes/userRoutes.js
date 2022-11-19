//Import express to acquire express.Router() function to crate new router object
var express = require('express');
var router = express.Router();

//Import required controllers and middleware
const {registerUser} = require("../controllers/userController")
const {loginUser} =require("../controllers/userController")
const {currentUser} =require("../controllers/userController")
const User = require("../models/userModel")
const {validateToken} = require("../middleware/validateTokenHandler");

//API routes for users
router.post("/",  registerUser)

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);




module.exports = router;

