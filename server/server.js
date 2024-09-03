//load env variables
require("dotenv").config();

//install dependency
const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const connectToDb = require('./config/connectToDb');
const notesController = require('./controllers/notesController');
const usersController = require('./controllers/usersController');
const requireAuth  = require("./middleware/requireAuth");
//create an express app
const app=express();

//configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:true,
    credentials:true,
}));

//connect to database
connectToDb()


//routing

app.post('/signup',usersController.signup);
app.post("/login",usersController.login);
app.get("/logout",usersController.logout);
app.get("/check-auth",requireAuth, usersController.checkAuth);
//get all notes
app.get('/notes',notesController.fetchNotes)

//get single note
app.get('/notes/:id',notesController.fetchNote)

app.put("/notes/:id",notesController.updateNote)

app.delete("/notes/:id",notesController.deleteNote)  

app.post('/notes',notesController.createNote )

//start our server
app.listen(process.env.PORT);