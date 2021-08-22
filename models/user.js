const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password1: {
        type: String,
        // required: true 
    },

    password2: {
        type: String,
        // required: true 
    },

    fav_player: {
        type: String  //later make it player ID ?
    },

    registrationDate: {
        type: Date,
        required: true,
        default: Date.now 
    }

})

module.exports = mongoose.model('user', userSchema )