const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@description get all contacts
//@route GET /api/contacts
//@access public 

const getContacts = asyncHandler(async (req,res) =>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@description get contacts by id
//@route GET /api/contacts/:id
//@access public 

const getContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

//@desc Create New contacts
//@route GET /api/contacts
//@access public 

const createContact = asyncHandler(async(req,res) =>{
    console.log("the request body is: ", req.body);
    const {name , email , phone } = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All files are manadatory");
    }
    const contacts = await Contact.create({
        name,
        email,
        phone,
    });

    res.status(201).json(contacts);
});

//@desc update contact 
//@route PUT /api/contacts/:id
//@access public 

const updateContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    )
    res.status(200).json(updateContact);
});

//@desc delete contact 
//@route DELETE /api/contacts/:id
//@access public 

const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.remove();
    res.status(200).json(contact);
});




module.exports = { getContacts ,getContact , createContact , updateContact , deleteContact }