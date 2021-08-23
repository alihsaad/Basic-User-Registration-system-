const express = require('express')
const router = express.Router();
const User = require('../models/user') //User is the user schema model constructor 

module.exports = router 

//Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message})  //500: server error    
    }
})

//Getting One 
router.get('/:id',  getUser, (req, res) => {
    res.json(res.user);
}) 


//Creating One
router.post('/', async (req, res) => {

    try {
        // console.log(req.body)

        const user = new User({
        username: req.body.username,
        password1: req.body.password
        })
    
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})  //400: user error
    }
})

//Updating One
router.patch('/', (req, res) => {
    
})  

// Deleting One 
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({message: "User deleted."})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    
}) 


async function getUser(req, res, next){
    let user
    try {
        let id = req.params.id
        //console.log(id)
        user = await User.findById(id);
        if (user == null) return res.status(404).json({message: "cannot find user"})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    res.user = user;
    next();
}