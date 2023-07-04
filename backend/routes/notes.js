const express=require('express');
const router=express.Router();
const Notes=require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
//ROUT: 1- Fetching all the notes
router.get('/fetchnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Notes.find({user:req.user.id});
        res.json(notes);
    }catch(error){
        return res.status(500).json({error:"some error occures"});
    }
})
//ROUTE: 2- Adding notes
router.post('/addnotes',fetchuser,[
    body('title','enter a valid title').isLength({min: 5}),
    body('description','enter a valid description').isLength({min: 5})
],async (req,res)=>{
    try{
    const {title,description,tag}=req.body;
    const notes=await new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNotes=await notes.save();
    res.json(savedNotes);
    }catch(error){
        return res.status(500).json({error:"some error occured"});
    }

})
//ROUTE :3 - Updating notes by id
router.post('/updatenotes/:id',fetchuser,[
    body('title','enter a valid title').isLength({min: 5}),
    body('description','enter a valid description').isLength({min: 5})
],async (req,res)=>{
    try{
        const newNote={};
        const {title,description,tag}=req.body;
        if(title){
            newNote.title=title;
        }
        if(description){
            newNote.description=description;
        }
        if(tag){
            newNote.tag=tag;
        }
        let notes=await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send("note not found")
        }
        if(notes.user.toString()!==req.user.id){
           return res.status(401).send("access not available");
        }
        notes=await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true});
        res.json(notes);
    }catch{
        res.status(500).json("some error occured");
    }
})
//ROUTE: 4- Deleting a note
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
    try{
        let notes=await Notes.findById(req.params.id);
        if(!notes){
            return res.status(404).send("note not found");
        }
        if(notes.user.toString()!==req.user.id){
            return res.status(401).send("you are unauthorized to delete this note");
        }
        notes=await Notes.findByIdAndDelete(req.params.id);
        res.json("Note deleted successfully");
    }catch{
        return res.status(500).json("some error occured");
    }
})
module.exports=router;