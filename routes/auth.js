const express = require('express');
const router = express.Router();
const User = require('../models/user'); //User is the user schema model constructor
const bcrypt = require('bcrypt');  //this is an async library
const jwt = require('jsonwebtoken')


module.exports = router;

//sign-up route
router.post('/signup', uniqueUsernameValidator, async (req,res) => {
    
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt );

        console.log(salt);
        console.log(hashedPassword);

        const user = new User({
            username: req.body.username,
            password: hashedPassword
            })
    
    
        if (req.body.fav_player != null) user.fav_player = req.body.fav_player;
            
    
        const newUser = await user.save();
        res.status(201).json(newUser);
    


    } catch (error) {
        res.status(500).json({message: error.message});
    }  //500: server error    
    
})

//login route
router.post('/login', authenticateUser, async (req,res) => {
    //Authenticate the User with authUser middleware
    //res.json(res.user);
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken})

})



////////////////////MIDDLEWARE////////////////////////////////



//middleware to check whether a username has already been used 
async function uniqueUsernameValidator(req, res, next){
    let user;
    try {

        user = await User.findOne({username: req.body.username}, function(error, docs) { //finding user by username
            if(error){
              console.error(err);
              return res.status(500).json({message: error.message})
            }
        })


        if (user === null) next(); //if the username isnt in our database, we can use it 
        
        //username is in our database we have to stop duplication of username
        return res.status(409).json({message: "username already exists"})
    }
    catch (error){
        return res.status(500).json({message: error.message})
    }
}





//middleware that allows us to authenticate whether login info
//is of a user and has the correct password 
async function authenticateUser(req, res, next){
    let user;
    try {

        user = await User.findOne({username: req.body.username}, function(error, docs) { //finding user by username
            if(error){
              console.error(err);
              return res.status(500).json({message: error.message})
            }
        })


        if (user == null) return res.status(404).json({message: "cannot find user"}); //if we cant find the user, we return a 404 error
        //user = user[0];


      

        passwordVerification = await bcrypt.compare(req.body.password, user.password) //returns a boolean indicating whether the password provided was correct
        if(!passwordVerification) return res.status(401).json({message: "Password provided was incorrect"})

        console.log("User login authenticated: "+ user.username)


    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.user = user;
    next();
}


//TOKEN AUTHENTICATION MIDDLEWARE
async function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)

    })


}



