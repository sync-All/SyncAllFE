const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/track.model").track
const User = require('../models/usermodel').uploader
const cloudinary = require("cloudinary").v2
const { BadRequestError, unauthorizedError, ForbiddenError, spotifyError } = require("../utils/CustomError")
const spotifyCheck = require('../utils/spotify')
const fs = require("node:fs")
const csv = require('fast-csv');
const  {writeToBuffer} = require('@fast-csv/format');
const mongoose = require('mongoose')
const { trackError, uploadErrorHistory } = require("../models/track.model")
const {v4 : uuidv4} = require('uuid')
const { trackProcessing } = require("../utils/upload")
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
  try {
    const {trackLink} = req.body
    let spotifyresponse = await spotifyCheck.SpotifyPreview(res, trackLink)
    const confirmTrackUploaded = await Track.findOne({isrc : spotifyresponse.isrc}).exec()
    if(confirmTrackUploaded){
      throw new unauthorizedError('Track already exists')
    }
    let songInfo = req.body
    let fileInfo = req.file
    await trackProcessing(songInfo,fileInfo,spotifyresponse,req)
    res.status(201).json({success : true, message : 'Music Information has been successfully added'})
  // if(req.file){
  //   var artWork = await cloudinary.uploader.upload(req.file.path,{folder:  "track_artwork"})
  //   const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : req.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration , spotifyArtistIds : spotifyresponse.artistIds}
  //   const track = new Track(adjustedsongInfo)
  //   track.save()
  //   .then(async (track)=>{
  //     await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }}).exec()
  //     if(songInfo.err_type && songInfo._id){
  //       await trackError.findByIdAndDelete(songInfo._id)
  //       await uploadErrorHistory.findByIdAndUpdate({user : req.user._id},{$pull : {associatedErrors : songInfo._id}, status : 'Partially Processed'})
  //     }
  //     fs.unlinkSync(req.file.path)
  //     res.status(200).json({success : true, message : 'Music Information has been successfully added'})
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     res.status(401).json(err)
  //   })
  // }else{
  //   const adjustedsongInfo = {...songInfo, artWork : spotifyresponse.artwork, user : req.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration, spotifyArtistIds : spotifyresponse.artistIds}
  //   const track = new Track(adjustedsongInfo)
  //   track.save()
  //   .then(async (track)=>{
  //     await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }}).exec()
  //     if(songInfo.err_type && songInfo._id){
  //       await trackError.findByIdAndDelete(songInfo._id)
  //       await uploadErrorHistory.findByIdAndUpdate({user : req.user._id},{$pull : {associatedErrors : songInfo._id}, status : 'Partially Processed'})
  //     }
  //     res.status(200).json({success : true, message : 'Music Information has been successfully added'})
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //     res.status(401).json(err)
  //   })
  // }
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

const singleUploadErrorResolution = async(req,res,next)=>{
  try {
    const {_id} = req.body
    
    // if(songInfo.err_type && songInfo._id){
//   await trackError.findByIdAndDelete(songInfo._id)
//   await uploadErrorHistory.findByIdAndUpdate({user : request.user._id},{$pull : {associatedErrors : songInfo._id}, status : 'Partially Processed'})
// }
  } catch (error) {
    
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
    const seen = new Set();
    const duplicates = new Set();
    const allowedHeaders = ['releaseType', 'releaseTitle', 'mainArtist', 'featuredArtist', 'trackTitle', 'upc', 'isrc', 'trackLink', 'genre', 'subGenre','claimBasis', 'role', 'percentClaim', 'recordingVersion', 'featuredInstrument', 'producers', 'recordingDate', 'countryOfRecording', 'writers', 'composers', 'publishers', 'copyrightName', 'copyrightYear', 'releaseDate', 'countryOfRelease', 'mood', 'tag', 'lyrics', 'audioLang', 'releaseLabel', 'releaseDesc']
    fs.createReadStream(req.file.path)
    .pipe(csv.parse({ignoreEmpty : true, headers : allowedHeaders, renameHeaders: true }))
    .on('data', (data) => {
      res.write(`event: processing\n`);
      res.write(`data: Scanning and Sorting for duplicate entries\n\n`);
      const fieldValue = data['isrc'];
      if (fieldValue){
        if (seen.has(fieldValue)){
          duplicates.add(fieldValue);
        }else if(!seen.has(fieldValue)){
          rowCount++
          newMuiscData.push(data);
          seen.add(fieldValue);
        }
      }
    })
    .on('error', (err) => {
      res.status(400).write(`event: error\n`);
      res.status(400).write(`data: ${JSON.stringify({ error: err.message})}\n\n`);
      fs.unlinkSync(req.file.path)
      res.status(400).end()

    })
    .on('end', async () => {
      if (duplicates.size > 0) {
        res.write(`event: processing\n`);
        res.write(`data: ${Array.from(duplicates)} duplicate fields found and have been filtered\n\n`);
      } else {
        res.write(`event: processing\n`);
        res.write(`data: No Duplicates Found\n\n`);
      }
      res.write(`event: total\n`);
      res.write(`data: ${JSON.stringify({rowCount})}\n\n`);
      try {
        const spotifyToken = await spotifyCheck.grabSpotifyToken()
        for(const row of newMuiscData){
          parsedRows++;
          let spotifyresponse = {}
          let confirmTrackUploaded = {}
          try {
            spotifyresponse = await spotifyCheck.spotifyResult(row.trackLink, spotifyToken);
          } catch (error) {
            if(error instanceof spotifyError){
              res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);
              failedCount++
              invalidSpotifyLink.push({...row, message  : error.message, err_type : 'InvalidSpotifyLink', user : req.user._id})
            }else if (error instanceof mongoose.MongooseError){
              console.log('here')
            }
            continue;
          }
          confirmTrackUploaded = await Track.findOne({isrc : spotifyresponse.isrc}).populate('user').exec()

          if(confirmTrackUploaded){
            res.write(`event: warning duplicate data\n`);
            res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);
            failedCount++
            duplicateData.push({...row, message : 'Duplicate data found', err_type : 'duplicateTrack', user : req.user._id, trackOwner : confirmTrackUploaded.user._id})
            continue;
          }
          res.write(`event: progress\n`);
          res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);

          row.spotifyLink = spotifyresponse.spotifyLink
          row.user = req.user.id
          row.trackLink = spotifyresponse.preview_url
          row.artWork = spotifyresponse.artwork
          row.duration = spotifyresponse.duration
          successCount++
          sortedMusicData.push(row)
        }
        const uploadedTracks = await Track.insertMany(sortedMusicData)
        await Promise.all(uploadedTracks.map(async (track)=>{
          await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }}).exec()
        }))
        let fileBuffer;
        if(invalidSpotifyLink.length > 0 || duplicateData.length > 0){
          if(invalidSpotifyLink.length > 0){
            let errorFile = [
              [...allowedHeaders, 'message', 'err_type', 'user'],
              ...invalidSpotifyLink
            ]
            fileBuffer = await writeToBuffer(errorFile)
          }
          res.write(`event: progress\n`);
          res.write(`data: Cleaning up\n\n`);
          const errorRes = await trackError.insertMany([...invalidSpotifyLink, ...duplicateData])
          const errorIds = errorRes.map((error)=> error._id)
          const uploadHistory = new uploadErrorHistory({
            uploadId : `UI_${uuidv4()}`,
            associatedErrors : errorIds,
            filename : req.file.originalname,
            fileBuffer,
            user : req.user._id
          })
          await uploadHistory.save().then(async(res)=>{
            await User.findOneAndUpdate({_id : req.user._id},{$push : {uploadErrors : res._id}}).exec()
          })
        }

        const errorCsv = invalidSpotifyLink.length > 0 && {fileBuffer, filename : `${req.file.originalname}`, fileType : 'text/csv'}

        res.write(`event: done\n`);
        res.write(`data: ${JSON.stringify({failedCount, successCount, duplicateData, invalidSpotifyLink, errorCsv })}\n\n`);

        fs.unlinkSync(req.file.path)
        res.end();
    
      } catch (error) {
        if(error.name == 'MongoBulkWriteError'){
          res.status(400).write(`event: error\n`);
          res.end()
        }
        console.log(error)
        fs.unlinkSync(req.file.path)
      }
    });
    
  }else{
    throw new unauthorizedError('Unauthorized User')
  }
  
}

const getAllSongs = async(req,res,next)=>{
    const allTracks = await Track.find({}, "artWork trackTitle mainArtist trackLink duration genre mood producers").where('uploadStatus').equals('Approved').exec()
    res.json({allTracks})
}

const getTracksByGenre = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({genre : {$regex : req.params.genre, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByInstrument = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({featuredInstrument : {$regex : req.params.instrument, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByMood = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({mood : {$regex : req.params.mood, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const querySongsByIndex = async(req,res,next)=>{
    const query = req.params.queryText
    try {
      const allTracks = await Track.find({$text : {$search : query}}, "artWork trackTitle mainArtist trackLink duration genre mood producers").where('uploadStatus').equals('Approved').exec()
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