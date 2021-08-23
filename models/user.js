const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        //unique: true,
        minlength: 8,
        maxlength: 1024 
    },

    password1: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024 
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