const mongoose = require("mongoose");
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    totalTracks : [
        {
            type : Schema.Types.ObjectId,
            ref : "track",
        }
    ],
    earnings : {

        availableBal : {
            type : Number,
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
        }

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
        type : String,
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
    featuredInstrument : [
        {
            type : String,
            required : true
        }
    ],
    producers : [
        {
            type : String,
            required : true
        }
    ],
    recordingDate : {
        type : Date,
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
    ],
    claimBasis :  {
        type : String,
        required : true
    },
    claimingUser : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true
    },
    percentClaim : {
        type : Number,
        required : true
    },
    copyrightName : {
        type : String,
        required : true
    },
    copyrightYear : {
        type : Number,
        required : true
    },
    releaseDate : {
        type : Date,
        required : true
    },
    countryOfRelease : {
        type : String,
        required : true
    },
    mood : [
        {
            type : String,
            required : true
        }
    ],
    tag : [
        {
            type : String,
            required : true
        }
    ],
    lyrics : {
        type : String,
        required : true
    },
    audioLang : {
        type : String,
        required : true
    },
    explicitCont : {
        type : Boolean,
        required : true
    },
    releaseLabel : {
        type : String,
        required : true
    },
    releaseDesc : {
        type : String,
        required : true
    },
    uploadStatus : {
        type : String,
        enum : ['Pending', 'Approved', 'Rejected'],
        default : 'Pending'
    },
    earnings : {
        type : Number,
        default : 0
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
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

    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }


},{timestamps : true})

const track = mongoose.model('track', trackSchema)
const dashboard = mongoose.model('dashboard',dashboardSchema)
const dispute = mongoose.model('dispute',disputeSchema)

module.exports.dashboard = dashboard
module.exports.track = track
module.exports.dispute = dispute