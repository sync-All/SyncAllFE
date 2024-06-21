const mongoose = require("mongoose");
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    totalTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "tracks",
        }
    ],
    totalEarnings : {
        type : Number,
        default : 0
    },
    countryReached : {
        type : Number,
        default : 0,
    },
    totalPlays : {
        type : String,
        default : 0
    },
    activities : [
        {
            type : Schema.Types.ObjectId,
            ref : "activity",
            default : [0]
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
})

const trackSchema = new Schema({
    mainArtist : {
        type : String,
        required : true
    },
    featuredArtist : [
        {
            type : String,
            required : true
        }
    ],
    releaseType : {
        type : String,
        required : true
    },
    releaseTitle: {
        type : String,
        required : true
    },
    trackTitle : {
        type : String,
        required : true
    },
    trackLink : {
        type : String,
        required : true
    },
    upc : {
        type : Number,
        required : true
    },
    isrc : {
        type : Number,
        required : true
    },

    
    
    
    

    
})

const dashboard = mongoose.model('dashboard',dashboardSchema)

module.exports = dashboard