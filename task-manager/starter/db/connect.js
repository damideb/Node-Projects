const mongoose = require("mongoose");
require('dotenv').config()

const connectString = process.env.MONGO_URI

const connection = async()=>{
    try{
  await  mongoose.connect(connectString)
    }
    catch(err){
      console.log("Error connecting to db", err);
    }
}

module.exports = connection
 
