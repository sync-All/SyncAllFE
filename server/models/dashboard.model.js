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
    genre : {
        type : String,
        required : true
    },
    artWork : {
        type : String,
        required : true
    },
    recordingVersion : {
        type : String,
        required : true
    },
    featuredInstrument : {
        type : String,
        required : true
    },
    producers : {
        type : String,
        required : true
    },
    recordingDate : {
        type : String,
        required : true
    },
    countryOfRecording : {
        type : String,
        required : true
    },
    countryOfRecording : {
        type : String,
        required : true
    },
    writers : [
        {
            type : String,
            required : true
        }
    ],
    composers : [
        {
            type : String,
            required : true
        }
    ],
    publishers : [
        {
            type : String,
            required : true
        }
    ]

    
})

const dashboard = mongoose.model('dashboard',dashboardSchema)

module.exports = dashboard