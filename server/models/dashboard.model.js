const mongoose = require("mongoose");
const Schema = mongoose.Schema

const dashboardSchema = new Schema({
    totalTracks : {
        type : Number,
        default : 0
    },
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

const dashboard = mongoose.model('dashboard',dashboardSchema)

module.exports = dashboard