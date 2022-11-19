//Import express to acquire express.Router() function to crate new router object
var express = require('express');
var router = express.Router();

//Import required controllers and middleware
const{getContacts} = require("../controllers/contactController")
const{createContact} =require("../controllers/contactController")
const {validateToken} = require("../middleware/validateTokenHandler");
const {getContact} = require("../controllers/contactController")
const {deleteContact} = require("../controllers/contactController")
const {updateContact} = require("../controllers/contactController")


//API routes for contacts

router.use(validateToken)
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


module.exports = router;

