//load env variables
require("dotenv").config();

//install dependency
const express=require('express');
const cors=require('cors');
const connectToDb = require('./config/connectToDb');
const notesController = require('./controllers/notesController');
 
//create an express app
const app=express();

//configure express app
app.use(express.json());
app.use(cors());

//connect to database
connectToDb()


//routing


//get all notes
app.get('/notes',notesController.fetchNotes)

//get single note
app.get('/notes/:id',notesController.fetchNote)

app.put("/notes/:id",notesController.updateNote)

app.delete("/notes/:id",notesController.deleteNote)  

app.post('/notes',notesController.createNote )

//start our server
app.listen(process.env.PORT);