const mongoose = require("mongoose");
const Schema = mongoose.Schema

const trackSchema = new Schema({
    mainArtist : {
        type : String,
        required : true
    },
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
    },
    isrc : {
        type : String,
        required : true,
        unique : true
        },
    featuredArtist : [
        {
            type : String,
        }
    ],
    upc : {
        type : Number,
        unique : false
        // required : true
    },
    genre : {
        type : String,
        // required : true
    },
    artWork : {
        type : String,
        // required : true
    },
    recordingVersion : {
        type : String,
        // required : true
    },
    featuredInstrument : [
        {
            type : String,
            // required : true
        }
    ],
    producers : [
        {
            type : String,
            // required : true
        }
    ],
    recordingDate : {
        type : Date,
        // required : true
    },
    countryOfRecording : {
        type : String,
        // required : true
    },
    writers : [
        {
            type : String,
            // required : true
        }
    ],
    composers : [
        {
            type : String,
            // required : true
        }
    ],
    publishers : [
        {
            type : String,
            // required : true
        }
    ],
    claimBasis :  {
        type : String,
        // required : true
    },
    claimingUser : {
        type : String,
        // required : true
    },
    role : {
        type : String,
        // required : true
    },
    percentClaim : {
        type : Number,
        // required : true
    },
    copyrightName : {
        type : String,
        // required : true
    },
    copyrightYear : {
        type : Number,
        // required : true
    },
    releaseDate : {
        type : Date,
        // required : true
    },
    countryOfRelease : {
        type : String,
        // required : true
    },
    mood : [
        {
            type : String,
            // required : true
        }
    ],
    tag : [
        {
            type : String,
            // required : true
        }
    ],
    lyrics : {
        type : String,
        // required : true
    },
    audioLang : {
        type : String,
        // required : true
    },
    explicitCont : {
        type : Boolean,
        // required : true
    },
    releaseLabel : {
        type : String,
        // required : true
    },
    releaseDesc : {
        type : String,
        // required : true
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
    likes : [
        {
            type : Schema.Types.ObjectId,
            ref : "syncUser"
        }
    ],
    spotifyLink : {
        type : String,
        // required : true
    },
    spotifyArtistIds : [
        {
            type : String
        }
    ],
    duration : {
        type : String,
    },
    userModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    }
},{timestamps : true})

const rejectedTrackSchema = new Schema({
    contentId : {
        type : Schema.Types.ObjectId,
        ref : "track"
    },
    reason : {
        type : String,
        required : true
    },
    performedBy : {
        type : Schema.Types.ObjectId,
        ref : 'admin'
    }

},{timestamps : true})

const trackErrorSchema = new Schema()
trackErrorSchema.add(trackSchema).add({
    mainArtist : {
    type : String,
    required : false
    },
    releaseType : {
        type : String,
        required : false
    },
    releaseTitle: {
        type : String,
        required : false
        },
    trackTitle : {
        type : String,
        required : false
        },
    trackLink : {
        type : String,
        required : false
        },
    isrc : {
        type : String,
        required : false
        }, 
    message : String, 
    userModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    },
    err_type : {
        type : String
    },
    trackOwnerModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    trackOwner : {
        type : mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    }
    
})

const uploadErrorHistorySchema =  new Schema({
    uploadId : {
        type : String
    },
    associatedErrors : [
        {
            type : Schema.Types.ObjectId,
            ref : 'trackError'
        }
    ],
    filename : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Partially Processed', 'Not Processed', 'Processed'],
        default : 'Not Processed'
    },
    fileBuffer : {
        type : Buffer,
    },
    fileType : {
        type : String,
    },
    userModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        refPath: 'userModel'
    },
},{timestamps : true})


const trackLicenseSchema = new Schema({
    track_name : {
        type : String,
        required : true
    },
    license_status : {
        type : String,
        enum : ['pending', 'approved', 'expired', 'rejected'],
        default : 'pending',
        required : true
    },
    amount : {
        type : String,
        required : true
    },
    trackLink : {
        type : String,
        required : true
    },
    quote_id : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    quote_type : {
        type : String,
        required : true
    },
    sync_user_info : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : "syncUser",
    },
    music_uploader_info : {
        type : Schema.Types.ObjectId,
        ref : "user"
    },
},{timestamps : true})

const transferOwnershipSchema = new Schema({
    trackId : {
        type : Schema.Types.ObjectId,
        ref : "track"
    },
    fromUser : {
        type : Schema.Types.ObjectId,
        refPath : "fromUserModel"
    },
    fromUserModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    toUser : {
        type : Schema.Types.ObjectId,
        refPath : "toUserModel"
    },
    toUserModel : {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default : 'user'
    },
    comment : {
        type : String,
        required : true
    },
    performedBy : {
        type : Schema.Types.ObjectId,
        ref : "admin"
    }
},{timestamps : true})

trackSchema.index({lyrics : 'text', trackTitle : "text", mood : 'text', genre : 'text', featuredInstrument : 'text'})

const track = mongoose.model('track', trackSchema)
const ownershipTransfer = mongoose.model('ownershipTransfer', transferOwnershipSchema)
const trackError = mongoose.model('trackError', trackErrorSchema)
const uploadErrorHistory = mongoose.model('uploadErrorHistory', uploadErrorHistorySchema)
const trackLicense = mongoose.model('track_license', trackLicenseSchema)
const rejectedTrack = mongoose.model('rejectedTrack', rejectedTrackSchema)

module.exports = {track, trackLicense, trackError, uploadErrorHistory, rejectedTrack}
