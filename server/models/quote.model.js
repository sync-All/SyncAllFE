const mongoose = require("mongoose");
const Schema = mongoose.Schema

const syncLicenseSchema = new Schema({
    nameOfProductionCompany : {
        type : String,
        required : true
    },
    titleOfProduction :{
        type : String,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    producer : {
        type : String,
        required : true
    },
    country : {
        type : String,
        required : true
    },
    typeOfMedia : {
        type : String,
        required : true
    },
    nameOfDistributor : {
        type : String,
        required : true
    },
    territoryOfUse : {
        type : String,
        required : true
    },
    term : {
        type : String,
        required : true
    },
    durationOfMusicUsage : {
        type : String,
        required : true
    },
    typeOfMusicUsage : {
        type : String,
        enum : ['Background Instrumental', 'Background Vocal', 'Visual Instrumental', 'Visual Vocal', 'Main Title Theme', 'End Title Theme'],
        required : true
    },
    sceneSynopsis : {
        type : String,
        required : true
    },
    productionSynopsis : {
        type : String,
        required : true
    },
    adviseBudget : {
        type : String,
        required : true
    }
},{timestamps: true})

const samplingSchema = new Schema({
    titleOfNewWork : {
        type : String,
        required : true,
    },
    newArtist : {
        type : String,
        required : true,
    },
    containOthers : [
        {
            type : String,
            required : true,
        }
    ],
    proposedShare : {
        type : String,
        required : true,
    },
    label : {
        type : String,
        required : true,
    },
    distributor : {
        type : String,
        required : true,
    },
    country : {
        type : String,
        required : true,
    },
    format : {
        type : String,
        required : true,
    },
    proposedReleaseDate : {
        type : String,
        required : true,
    },
    territoryOfRelease : {
        type : String,
        required : true,
    },
    additionalInfo : {
        type : String,
        required : true,
    },
    listeningLink : {
        type : String,
        required : true,
    },
    notes : {
        type : String,
        required : true,
    },
}, {timestamps : true})


const samplingRequest = mongoose.model('sampling-request',samplingSchema)

const syncLicenseRequest = mongoose.model('sync-license-request',syncLicenseSchema)

module.exports = {samplingRequest, syncLicenseRequest}