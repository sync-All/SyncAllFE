const mongoose = require("mongoose");
const Schema = mongoose.Schema

const fmtSchema = new Schema({
    project_title : {
        type : String,
        required : true
    },
    genre:[
        {
        type : String,
        required : true
        }
    ],
    project_director : {
        type : String,
        required : true
    },
    project_producer : {
        type : String,
        required : true
    },
    project_cast : [
        {
            type : String,
            required : true
        }
    ],
    production_budget :
    {
            type : String,
            required : true
    }
    ,
    production_synopsis : {
        type : String,
        required : true
    },
    scene_synopsis : {
        type : String,
        required : true
    },
    distributor : {
        type : String,
        required : true
    },
    distribution : [
        {
            type : String,
            required : true
        }
    ],
    usage : [
        {
            type : String,
            required : true
        }
    ],
    length : {
        type : String,
        required : true
    },
    territories : [
        {
            type : String,
            required : true
        }
    ],
    media : [
        {
            type : String,
            required : true
        }
    ],
    attachments :[
        {
            type : String,
        },
    ],
    license_duration :  { 
        type : String,
        enum : ['Yearly'],
        required : true
    },
    additional_info : {
        type : String,
        default : "N/A"
    },
    role_type : {
        type : String,
        enum : ['Film/Movie/TV Series'],
        default : 'Film/Movie/TV Series',
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser"
    }
},{timestamps: true})

const tvaSchema = new Schema({
    product : {
        type : String,
        required : true,
    },
    theme : {
        type : String,
        required : true,
    },
    length :
        {
            type : String,
            required : true,
        }
    ,
    production_budget : {
        type : String,
        required : true,
    },
    air_date : {
        type : String,
        required : true,
    },
    networks : [
        {
            type : String,
            required : true,
        }
    ],
    duration_of_music_usage : {
        type : String,
        required : true,
    },
    intended_usage : [
        {
            type : String,
            required : true,
        }
    ],
    territories :[
        {
            type : String,
            required : true,
        }
    ],
    license_duration :  { 
        type : String,
        required : true
    },
    media : {
        type : String,
        required : true,
    },
    attachments : [
        {
            type : String,
            default : "N/A"
        },
    ],
    additional_info : {
        type : String,
        default : "N/A"
    },
    role_type : {
        type : String,
        enum : ['TV Commercial/Ads'],
        default : 'TV Commercial/Ads',
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps : true})

const videosGamesSchema = new Schema({
    game_title : { 
        type : String,
        required : true
    },
    genre : [
        { 
            type : String,
            required : true
        }
    ],
    platform :  { 
        type : String,
        required : true
    },
    release_date :  { 
        type : String,
        required : true
    },
    target_audience :  { 
        type : String,
        required : true
    },
    length :  { 
        type : String,
        required : true
    },
    development_stage :  { 
        type : String,
        required : true
    },
    territories : [
        { 
            type : String,
            required : true
        }
    ],
    usage :  [
        { 
            type : String,
            required : true
        }
    ],
    media_format :  { 
        type : String,
        required : true
    },
    license_duration :  { 
        type : String,
        enum : ['Yearly'],
        required : true
    },
    attachments : [
        {
            type : String,
            default : "N/A"
        },
    ],
    additional_info : {
        type : String,
        default : "N/A"
    },
    role_type : {
        type : String,
        enum : ['Video Games'],
        default : 'Video Games',
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps : true})

const samplingSchema = new Schema({
    project_title :  { 
        type : String,
        required : true
    },
    genre : [
        { 
            type : String,
            required : true
        },
    ],
    artists_or_group : [
        { 
            type : String,
            required : true
        }
    ],
    release_date :  { 
        type : String,
        required : true
    },
    distribution_channels : [
        { 
            type : String,
            required : true
        }
    ],
    original_song :  { 
        type : String,
        required : true
    },
    artist_name :
        { 
            type : String,
            required : true
        }
    ,
    portion_to_be_sampled :  { 
        type : String,
        required : true
    },
    intended_usage : [
        { 
            type : String,
            required : true
        }
    ],
    territories : [
        { 
            type : String,
            required : true
        }
    ],
    license_duration : { 
        type : String,
        enum : ['Yearly'],
        required : true
    },
    media_formats : [
        { 
            type : String,
            required : true
        }
    ],
    samples_of_other_songs : { 
        type : String,
        required : true
    },
    additional_info : { 
        type : String,
        default : 'N/A'
    },
    attachments : [
        {
            type : String,
            default : 'N/A'
        },
    ],
    role_type : {
        type : String,
        enum : ['Sampling'],
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps : true})

const interpolationSchema = new Schema({
    project_title :  { 
        type : String,
        required : true
    },
    genre :  [
        { 
            type : String,
            required : true
        }
    ],
    artists_or_group : [
        { 
            type : String,
            required : true
        }
    ],
    release_date :  { 
        type : String,
        required : true
    },
    distribution_channels : [
        { 
            type : String,
            required : true
        }
    ],
    original_song :  { 
        type : String,
        required : true
    },
    artist_name :
    { 
        type : String,
        required : true
    }
    ,
    portion_to_be_sampled :  { 
        type : String,
        required : true
    },
    intended_usage : [
        { 
            type : String,
            required : true
        }
    ],
    territories : [
        { 
            type : String,
            required : true
        }
    ],
    license_duration : { 
        type : String,
        enum : ['Yearly'],
        required : true
    },
    media_formats : [
        { 
            type : String,
            required : true
        }
    ],
    samples_of_other_songs : { 
        type : String,
        required : true
    },
    additional_info : { 
        type : String,
        default : "N/A"
    },
    attachments : [
        {
            type : String,
            default : "N/A"
        },
    ],
    role_type : {
        type : String,
        enum : ['Interpolation'],
        default : 'Interpolation',
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps : true})

const crbtSchema = new Schema({
    carrier : {
        type : String,
        required : true
    },
    target_audience : {
        type : String,
        required : true
    },
    theme : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true
    },
    distribution : [
        {
            type : String,
            required : true
        }
    ],
    territories : [
        {
            type : String,
            required : true
        }
    ],
    license_duration : {
        type : String,
        enum : ['Yearly'],
        required : true
    },
    media : {
        type : String,
        required : true
    },
    additional_info : {
        type : String,
        default : "N/A",
    },
    role_type : {
        type : String,
        enum : ['CRBT'],
        default : "CRBT",
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps :  true})

const smcSchema = new Schema({
    platform : [
        {
            type : String,
            required : true
        }
    ],
    content_type : [
        {
            type : String,
            required : true
        }
    ],
    theme : {
        type : String,
        required : true
    },
    distribution : [
        {
            type : String,
            required : true
        }
    ],
    length : {
        type : String,
        required : true
    },
    territories : [
        {
            type : String,
            required : true
        }
    ],
    license_duration : {
        type : String,
        enum : ['Yearly'],
        required : true
    },
    media : {
        type : String,
        required : true
    },
    additional_info : {
        type : String,
        default : "N/A"
    },
    attachments : [
        {
            type : String,
            default : "N/A"
        },
    ],
    role_type : {
        type : String,
        enum : ['Social Media Content'],
        default : "Social Media Content",
        required : true
    },
    track_info : {
        type : Schema.Types.ObjectId,
        ref : "track",
        required : true
    },
    user_info : {
        type : Schema.Types.ObjectId,
        ref : "syncUser",
        required : true
    }
}, {timestamps : true})



const tvaRequest = mongoose.model('tva-license-request',tvaSchema)

const fmtRequest = mongoose.model('fmt-license-request',fmtSchema)

const videoGamesRequest = mongoose.model('videogames-license-request',videosGamesSchema)

const samplingRequest = mongoose.model('sampling-license-request', samplingSchema)

const interpolationRequest = mongoose.model('interpolation-license-request', interpolationSchema)

const crbtRequest = mongoose.model('crbt-license-request', crbtSchema)

const smcRequest = mongoose.model('smc-license-request', smcSchema)




module.exports = {tvaRequest, fmtRequest, videoGamesRequest, samplingRequest,interpolationRequest, crbtRequest, smcRequest}