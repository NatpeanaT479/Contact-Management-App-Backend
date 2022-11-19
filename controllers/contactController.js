const Contact = require("../models/contactModel");
const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@route GET/api/contacts
//@access private

//GET ALL CONTACTS FOR CURRENT USER AFTER LOGGED IN
const getContacts = asyncHandler(async(req,res)=>{
    const contacts = await Contact.find({User:req.user.id}); //Returns a list of contact objects based on User id.
    if (contacts.length == 0){ 
        res.status(404);
        throw new Error("No contacts stored")
    }
    res.status(200).json(contacts);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CREATE A CONTACT
const createContact = asyncHandler(async (req, res)=>{
    const{name,email,phone} = req.body;
    if (!name||!email||!phone){   //Check if name, email, and phone number is stored in req.body
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable=await Contact.findOne({phone, User:req.user.id});  //Search in database if phone number registered under given user id is already stored. 
    if (userAvailable){
        res.status(400);
        throw new Error("Contact already registered!")
    }
    const contact = await Contact.create({
        User: req.user.id,  // req.user.id is based on payload of the access token used for authorization
        name: req.body.name,
        email: req.body.email,
        phone : req.body.phone,
        timestamp: Date.now() //method to get timestamp of contact creation
    })
    try{
        const newContact = await contact.save() //save new contact into contact collection
        res.status(201).json(newContact)
        console.log("Contact created")
    } catch (err){
        res.status(400).json({message:err.message})
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//GET CONTACT ID
const getContact = asyncHandler(async(req,res)=>{
    const contact = await Contact.find({_id:req.params.id, User: req.user.id});  //find contact based on id and user id. To return error contact does not belong to user
    if (contact.length === 0){
         res.status(404)
         throw new Error(`Contact with Id:${req.params.id} does not exist.`)
    }
     res.status(200).json(contact);
  
   }
);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//UPDATE CONTACT BY ID
const updateContact = asyncHandler(async(req,res)=>{
   const {name,email,phone} = req.body;
    if (!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
   const contactToUpdate = await Contact.findOne({_id:req.params.id, User: req.user.id}) //find contact based on id and user id. To return error contact does not belong to user
   if(!contactToUpdate){
         res.status(404);
        throw new Error("Contact does not exist")
    };
    contactToUpdate.name = name;    //change contact info according  to req.body
    contactToUpdate.email = email;
    contactToUpdate.phone = phone;
    try{
        const updatedContact = await contactToUpdate.save() //saving updated information into contacts collection
        res.status(200).json(updatedContact)
    }catch (err){
            res.status(400).json({message:err.message})
    }

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//DELETE CONTACT BY ID
const deleteContact = asyncHandler(async(req,res)=>{
   const contactAvailable = await Contact.findOne({_id:req.params.id, User: req.user.id}) //find contact based on id and user id. To return error contact does not belong to user
    if(!contactAvailable){
         res.status(404);
        throw new Error("Contact does not exist")
    };
    const contact = await Contact.deleteOne({_id:req.params.id});  //deleting contact based on req.params.id
    res.status(200).json({message:`Contact with Id:${req.params.id} was deleted`})

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = {getContacts, createContact, getContact, updateContact, deleteContact};