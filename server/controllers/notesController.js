const Note=require('../models/note');

const createNote=async (req,res)=>{
    //get the sent in data off req body
    const {title,body}=req.body;
    
    //create a note with it
    const note=await Note.create({
        title,
        body,
    })
    //respond with the new note
    res.json({note});

}

const fetchNotes=async (req,res)=>{
    const notes=await Note.find();
    res.json({notes});
}


const fetchNote=async (req,res)=>{
    //get the id from url
    const noteId=req.params.id;
    //find the note of that id
    const note=await Note.findById(noteId);
    //respond with the note
    res.json({note});
}


const updateNote=async(req,res)=>{
    //get the id from url
    const noteId=req.params.id;
    //get the sent in data from the req body
    const {title,body}=req.body;
    //find and update record
    await Note.findByIdAndUpdate(noteId,{
        title,
        body,
    })
    //find updated note
    const note=await Note.findById(noteId);
    //respond with the record
    res.json({note});
}

const deleteNote=async(req,res)=>{
    //get id from url
    const noteId=req.params.id;
    //delete the record
    try{
        await Note.findOneAndDelete({_id:noteId});
    }
    catch(err){
        console.error(err); 
    }
    //respond
    res.json({success:"Record deleted successfully"});
}

module.exports={
    createNote:createNote,
    fetchNotes:fetchNotes,
    fetchNote:fetchNote,
    deleteNote:deleteNote,
    updateNote:updateNote,
    
}