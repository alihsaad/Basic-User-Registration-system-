require('dotenv').config();  //need this to use .env

const express = require('express')  //using express for routing
const mongoose = require('mongoose') //using mongodb to store our user db 


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
//We're using the above middleware to Parse URL-encoded bodies


mongoose.connect(process.env.DATABASE_URL, 
    {useNewUrlParser: true,useUnifiedTopology: true }); //connecting to mongodb 


const db= mongoose.connection; //intializing our database 

db.on('error', (error) => console.error(error)); 
db.once('open' , () => console.log('Connected to Database')); 
//db.once(): runs this command only once



const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
//this was for routing our users for the prelim structure 



const authRouter = require('./routes/auth');
app.use('/auth', authRouter);
//this is to route our authentication, ie. Login/Signup 




app.listen(3000, () => console.log("Server Started"))
//We use this to bind and listen to the connections 
// the on specified host and port 