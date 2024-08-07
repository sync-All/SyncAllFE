const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/dashboard.model").track
const cloudinary = require("cloudinary").v2
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
                var artWork = await cloudinary.uploader.upload(req.file.path)
                const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : req.user.id, trackLink : response.preview_url}
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
    const allTracks = await Track.find({}).exec()
    res.json({allTracks})
}

const getTracksByGenre = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({genre : req.params.genre}).exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByInstrument = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({featuredInstrument : req.params.instrument}).exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByMood = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({mood : req.params.mood}).exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const querySongsByIndex = async(req,res,next)=>{
    const query = req.params.queryText
    try {
      const allTracks = await Track.find({$text : {$search : query}}).exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
  }

module.exports = {verifyTrackUpload, trackUpload, getAllSongs, getTracksByGenre, getTracksByInstrument, getTracksByMood, querySongsByIndex}