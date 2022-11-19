const jwt = require("jsonwebtoken");
require('dotenv').config()

//Middle to validate access token
const validateToken = (req, res, next) =>{
    const authHeader = req.headers["authorization"]  //to get authorization header which contains Bearer and token
    if (authHeader && authHeader.startsWith('Bearer')){   //to extract the token after Bearer
          const token = authHeader.split(' ')[1];   // a space is present between Bearer and token
          jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decoded) =>
          {
            if(err){
                res.status(401);
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;  //decodes user information which is stored in req.user for currentUser controller
            next()
            
          })
     }
    
}

module.exports = {validateToken};

