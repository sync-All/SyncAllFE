const mongoose = require("mongoose");
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    totalTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "track",
        }
    ],
    accountInfo : {
        type : Schema.Types.ObjectId,
        ref : 'uploaderAccountInfo'
    },

    countryReached : {
        type : Number,
        default : 0,
    },
    totalPlays : {
        type : Number,
        default : 0
    },
    activities : [
        {
            type : Schema.Types.ObjectId,
            ref : "uploaderactivity",
            default : [0]
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
})



const uploaderAccountSchema = new Schema({
    availableBal : {
        type : Number,
        default : 0
    },

    accNumber : {
        type : Number
    },

    accName : {
        type : String
    },

    bankName : {
        type : String
    },

    bankAddress : {
        type : String
    },

    country : {
        type : String
    },

    bicCode : {
        type : String
    },

    sortCode : {
        type : Number
    },

    totalEarnings : {
        type : Number,
        default : 0
    },

    totalWithdrawals : {
        type : Number,
        default : 0
    },
    averageMonthlyEarnings : {
        type : Number,
        default : 0
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
},{timestamps : true})


const disputeSchema = new Schema({
    nameOfTrack  : {
        type : String
    },
    issueType : {
        type : String
    },

    desc : {
        type : String
    },

    supportingDoc : {
        type : Buffer
    },

    isrc : {
        type : String
    },
    status : {
        type : String,
        enum : ['Pending', 'Approved', 'Rejected'],
        default : 'Pending'
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }

},{timestamps : true})

const dashboard = mongoose.model('dashboard',dashboardSchema)
const dispute = mongoose.model('dispute',disputeSchema)
const uploaderAccountInfo = mongoose.model('uploaderAccountInfo', uploaderAccountSchema)

module.exports = {dashboard, dispute, uploaderAccountInfo}