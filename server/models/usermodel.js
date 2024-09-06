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
    facebookLink : {
        type : String,
    },
    instagramLink : {
        type : String,
    },
    twitterLink : {
        type : String,
    },
    stripeCusId : {
        type : String
    },
    tiktokLink : {
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
        prod_id : {
            type : String,
            enum : ['prod_QnB1PkDeRHAGSx', 'prod_QgrvvxGRYPiP7a', 'prod_QUeQtqvvQsy9X8'],
            default : 'prod_QnB1PkDeRHAGSx'
        },
        subscription_id : {
            type : String
        },
        subscription_status : {
            type : String
        },
        frequency : {
            type : String
        },
        next_billing_date : {
            type : String
        },
        amount : {
            type : Number
        },
        last4card_digits : {
            type : String
        },
        card_brand : {
            type : String
        }
    },
    stripeCusId : {
        type : String
    },
    paymentInfo : {
        type : Number,
    },
    tracklist : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "track",
        }
    ], 
    totalLicensedTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "track",
            default : [0]
        }
    ],
    pendingLicensedTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "track_license",
            default : [0]
        }
    ]
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

const syncAdminSchema = new Schema({
    name : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String
    },
    password : {
        required : true,
        type : String
    },
    role : {
        required : true,
        type : String,
        default : "Admin"
    }
}, {timestamps : true})

const admin = mongoose.model('admin',syncAdminSchema)

const uploader = mongoose.model('user',userSchema)

const syncUser = mongoose.model('syncUser',syncUserSchema)

module.exports = {uploader, syncUser, admin}

