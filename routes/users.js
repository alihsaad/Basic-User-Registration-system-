const express = require('express')
const router = express.Router();
const User = require('../models/user')

module.exports = router 

//Getting all
router.get('/', async (req, res) => {
    try {
        const users = await user.find()
    } catch (error) {
        res.status(500).json({message: error.message})  //500: server error    
    }
})

//Getting One 
router.get('/:id',  (req, res) => {
    res.send(req.params.id)
}) 


//Creating One
router.post('/', async (req, res) => {

    try {
        console.log(req.body)

        const user = new User({
            username: req.body.username,
        password1: req.body.password,
        password2: req.body.password
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
router.delete('/:id', (req, res) => {
    
}) 