const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/track.model").track
const User = require('../models/usermodel').uploader
const cloudinary = require("cloudinary").v2
const { BadRequestError, unauthorizedError, ForbiddenError, spotifyError } = require("../utils/CustomError")
const spotifyCheck = require('../utils/spotify')
const fs = require("node:fs")
const csv = require('fast-csv');
const mongoose = require('mongoose')
const { uploadTrackError } = require("../models/track.model")
require('dotenv').config()



const verifyTrackUpload = async(req,res,next)=>{
  const trackLink = req.query.trackLink
  let response = await spotifyCheck.SpotifyPreview(res, trackLink)
  console.log(response)
  const confirmTrackUploaded = await Track.findOne({isrc : response.isrc}).exec()
  if(confirmTrackUploaded){
      res.status(401).json('Track already exists')
  }else{
      res.status(200).json({success : true, message : 'Specific track with ISRC is not available', isrc : response.isrc, explicit_content : response.explicit_content, release_date : response.release_date})
  }
}

const trackUpload = async(req,res,next)=>{
  if(req.user.role == "Music Uploader"){
    const {trackLink} = req.body
    let spotifyresponse = await spotifyCheck.SpotifyPreview(res, trackLink)
    console.log(spotifyresponse)
    const confirmTrackUploaded = await Track.findOne({isrc : spotifyresponse.isrc}).exec()
    if(confirmTrackUploaded){
        res.status(401).json('Track already exists')
    }else{
      let songInfo = req.body
      if(req.file){
        var artWork = await cloudinary.uploader.upload(req.file.path,{folder:  "track_artwork"})
        const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : req.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration , spotifyArtistIds : spotifyresponse.artistIds}
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
      }else{
        const adjustedsongInfo = {...songInfo, artWork : spotifyresponse.artwork, user : req.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration, spotifyArtistIds : spotifyresponse.artistIds}
        const track = new Track(adjustedsongInfo)
        track.save()
        .then(async (track)=>{
          await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }}).exec()
          res.status(200).json({success : true, message : 'Music Information has been successfully added'})
        })
        .catch((err)=>{
          console.log(err)
          res.status(401).json(err)
        })
      }
    }
  }else{
    res.status(401).json('Unauthorized Access, Role not Supported')
  }
}

const trackBulkUpload = async(req,res,next)=>{
  if(req.user.role == "Music Uploader"){
    if(!req.file){
      throw new ForbiddenError('Kindly input a valid file type')
    }
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let newMuiscData = []
    let duplicateData = []
    let invalidSpotifyLink = []
    let sortedMusicData = []
    let rowCount = 0
    let parsedRows = 0
    let failedCount = 0
    let successCount = 0
    fs.createReadStream(req.file.path)
    .pipe(csv.parse({ignoreEmpty : true, headers : ['releaseType', 'releaseTitle', 'mainArtist', 'featuredArtist', 'trackTitle', 'upc', 'isrc', 'trackLink', 'genre', 'subGenre','claimBasis', 'role', 'percentClaim', 'recordingVersion', 'featuredInstrument', 'producers', 'recordingDate', 'countryOfRecording', 'writers', 'composers', 'publishers', 'copyrightName', 'copyrightYear', 'releaseDate', 'countryOfRelease', 'mood', 'tag', 'lyrics', 'audioLang', 'releaseLabel', 'releaseDesc'], renameHeaders: true }))
    .on('data', (data) => {
      rowCount++
      newMuiscData.push(data)
    })
    .on('error', (error) => {
      res.write(`event: error\n`);
      console.error(error)
      res.write(`data: ${JSON.stringify({ error })}\n\n`);
      fs.unlinkSync(req.file.path)

    })
    .on('end', async (rowCount) => {
      res.write(`event: total\n`);
      res.write(`data: ${JSON.stringify({ rowCount})}\n\n`);
      try {
        const spotifyToken = await spotifyCheck.grabSpotifyToken()
        for(const row of newMuiscData){
          parsedRows++;
          let spotifyresponse = {}
          let confirmTrackUploaded = {}

          try {
            spotifyresponse = await spotifyCheck.spotifyResult(row.trackLink, spotifyToken);
            confirmTrackUploaded = await Track.findOne({isrc : spotifyresponse.isrc}).populate('user').exec()
          } catch (error) {
            if(error instanceof spotifyError){
              res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);
              failedCount++
              invalidSpotifyLink.push({...row, message  : error.message, err_type : 'spotify link error', user : req.user._id})
            }else if (error instanceof mongoose.MongooseError){
              console.log(error)
            }
            continue;
          }

          if(confirmTrackUploaded){
            res.write(`event: warning duplicate data\n`);
            res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);
            failedCount++
            duplicateData.push({...row, trackOwner : confirmTrackUploaded.user._id, message : 'Duplicate data found', err_type : 'duplicate', user : req.user._id})
            continue;
          }
          res.write(`event: progress\n`);
          res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);

          row.spotifyLink = spotifyresponse.spotifyLink
          row.user = req.user.id
          row.trackLink = spotifyresponse.preview_url
          row.duration = spotifyresponse.duration
          successCount++
          sortedMusicData.push(row)
        }
        res.write(`event: done\n`);
        res.write(`data: ${JSON.stringify({failedCount, successCount, duplicateData, invalidSpotifyLink})}\n\n`);
        await Track.insertMany(sortedMusicData)
        const errorRes = await uploadTrackError.insertMany([...invalidSpotifyLink, ...duplicateData])
        if(errorRes){
          for(let i = 0; i < errorRes.length; i++){
            await User.findOneAndUpdate({_id : req.user._id},{$push : {uploadErrors : errorRes[i]._id}}).exec()

          }
        }
        fs.unlinkSync(req.file.path)
        res.end();
    
      } catch (error) {
        console.log(error)
        fs.unlinkSync(req.file.path)
      }
    });
    
  }else{
    throw new unauthorizedError('Unauthorized User')
  }
  
}

const getAllSongs = async(req,res,next)=>{
    const allTracks = await Track.find({}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
    res.json({allTracks})
}

const getTracksByGenre = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({genre : {$regex : req.params.genre, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByInstrument = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({featuredInstrument : {$regex : req.params.instrument, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByMood = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({mood : {$regex : req.params.mood, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").exec()
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
      if(req.user.billing.prod_id == "free"){
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

module.exports = {verifyTrackUpload, trackUpload, getAllSongs, getTracksByGenre, getTracksByInstrument, getTracksByMood, querySongsByIndex, queryTrackInfo, trackBulkUpload}