const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        reqired: true, 
        min: 3, 
        max: 20, 
        unique: true
    },
    email: { 
        type: String, 
        reqired: true, 
        max: 50,
        unique: true
    },
    password: { 
        type: String, 
        reqired: true, 
        min: 8,
        max: 50,
    },
    isAvatar:{
        type: Boolean,
        default: false
    },
    avatar:{
        type: String,
        default: ""
    }
    
});

module.exports = mongoose.model("Users", userSchema);
