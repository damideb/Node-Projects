const express = require('express');
const mongoose = require('mongoose');
const app = express();
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect')




//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/v1/tasks', tasks)

app.use((req, res, next)=>{
    res.status(404).send('routes not found')
})


app.use((err, req, res, next)=>{
    return res.status(500).json({msg:err})
})

const port = 3000

connectDb();
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB"); // Log to console when connected to MongoDB
  app.listen(port, () => console.log(`server running on port ${port}`));
});


// app.listen(port, ()=>{
//     console.log(`Server is running on port ${port}`);
// })



