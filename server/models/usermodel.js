const mongoose = require("mongoose");
const Schema = mongoose.Schema

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true
    },
    emailConfirmedStatus : {
        type : Boolean,
        default : false
    },
    img : {
        type : String,
        required : true
    },
    authSource : {
        type : String,
        enum : ['local', 'googleAuth'],
        default : 'local'
    },
    fullName : {
        type : String,
    },
    spotifyLink : {
        type : String,
    },
    bio: {
        type : String,
    },

})

const user = mongoose.model('user',userSchema)

module.exports = user