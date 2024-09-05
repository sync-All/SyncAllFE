const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/dashboard.model").track
const cloudinary = require("cloudinary").v2
const { BadRequestError } = require("../utils/CustomError")
const grabSpotifyPreview = require('../utils/grabSpotifyPreview')
const fs = require("node:fs")
require('dotenv').config()



const verifyTrackUpload = async(req,res,next)=>{
  const trackLink = req.query.trackLink
  let response = await grabSpotifyPreview(res, trackLink)
  const confirmTrackUploaded = await Track.findOne({isrc : response.isrc}).exec()
  if(confirmTrackUploaded){
      res.status(401).json('Track already exists')
  }else{
      res.status(200).json({success : true, message : 'Specific track with ISRC is not available', isrc : response.isrc})
  }
}

const trackUpload = async(req,res,next)=>{
  if(req.user.role == "Music Uploader"){
    const {trackLink} = req.body
    let response = await grabSpotifyPreview(res, trackLink)
    const confirmTrackUploaded = await Track.findOne({isrc : response.isrc}).exec()
    if(confirmTrackUploaded){
        res.status(401).json('Track already exists')
    }else{
      console.log('track not avaiable please continue')
      let songInfo = req.body
      var artWork = await cloudinary.uploader.upload(req.file.path,{folder:  "track_artwork"})
      const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : req.user.id, trackLink : response.preview_url, spotifyLink : response.spotifyLink, duration : response.duration}
      const track = new Track(adjustedsongInfo)
      track.save()
      .then(async (track)=>{
        await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }}).exec()
        fs.unlinkSync(req.file.path)
        res.status(200).json({success : true, message : 'Music Information has been successfully added'})
      })
      .catch((err)=>{
        console.log(err)
        res.status(401).json(err)
      })
    }
  }else{
    res.status(401).json('Unauthorized Access, Role not Supported')
  }
}

const getAllSongs = async(req,res,next)=>{
    const allTracks = await Track.find({}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
    res.json({allTracks})
}

const getTracksByGenre = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({genre : req.params.genre}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByInstrument = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({featuredInstrument : req.params.instrument}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByMood = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({mood : req.params.mood}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const querySongsByIndex = async(req,res,next)=>{
    const query = req.params.queryText
    try {
      const allTracks = await Track.find({$text : {$search : query}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const queryTrackInfo =async(req,res,next)=>{
  const trackId = req.params.trackId
  if(req.user.role == "Sync User"){
    try {
      if(req.user.billing.prod_id == "prod_QnB1PkDeRHAGSx"){
        const details = await Track.findOne({_id : trackId}, "genre mood producers trackTitle artWork trackLink mainArtist duration releaseDate").exec()
        console.log(details)
        return res.json({details})
      }else{
          const details = await Track.findOne({_id : trackId}).exec()
          return res.json({details})
      }
    } catch (error) {
      console.log(error)
      throw new BadRequestError('Invalid Request')
    }
  }
  res.status(400).send("Bad request")
}

module.exports = {verifyTrackUpload, trackUpload, getAllSongs, getTracksByGenre, getTracksByInstrument, getTracksByMood, querySongsByIndex, queryTrackInfo}