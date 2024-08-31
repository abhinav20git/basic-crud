const mongoose = require('mongoose');
async function connectToDb(){
    try {
        await mongoose.connect('mongodb://localhost:27017/notes');
        console.log("database connection established");
      } catch (error) {
        console.error("Error connecting to db")
      }
}

module.exports=connectToDb;

