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
        enum : ['Music Uploader'],
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
    },
    authSource : {
        type : String,
        enum : ['local', 'googleAuth'],
        default : 'local'
    },
    phoneNumber :{
        type : String
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

}, {timestamps : true})

const syncUserSchema = new Schema({

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
        enum : ['Sync User'],
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
    },
    authSource : {
        type : String,
        enum : ['local', 'googleAuth'],
        default : 'local'
    },
    phoneNumber :{
        type : String
    },
    fullName : {
        type : String,
    },
    billing : {
        plan : {
            type : String,
            enum : ['basic', 'standard', 'premium', 'enterprise'],
            default : 'basic'
        },
        paymentMode : {
            type : String,
            enum : ['monthly', 'quarterly', 'annually', ]
        },
        amount : {
            type : Number,
            default : 0
        }
    },
    paymentInfo : {
        type : Number,
    },
    tracklist : [
        {
            type : Schema.Types.ObjectId,
            ref : "track",
            default : [0]
        }
    ], 
    totalLicensedTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "track",
            default : [0]
        }
    ],
    recentActivity  : [
        {
            type : Schema.Types.ObjectId,
            ref : "userActivity",
            default : 0
        }
    ],
    upcomingRenewals : {
        type : Number,
        default : 0

    },
})

const uploader = mongoose.model('user',userSchema)

const syncUser = mongoose.model('syncUser',syncUserSchema)

module.exports = {uploader, syncUser}

