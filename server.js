require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true,useUnifiedTopology: true });
const db= mongoose.connection ;

db.on('error', (error) => console.error(error));
db.once('open' , () => console.log('Connected to Database'));

app.use(express.json());

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

app.listen(3000, () => console.log("Server Started"))