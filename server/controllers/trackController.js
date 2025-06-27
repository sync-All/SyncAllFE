const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/track.model").track
const User = require('../models/usermodel').uploader
const Admin = require('../models/usermodel').admin
const { BadRequestError, unauthorizedError, ForbiddenError, spotifyError, formatMongooseError } = require("../utils/CustomError")
const spotifyCheck = require('../utils/spotify')
const fs = require("node:fs")
const csv = require('fast-csv');
const  {writeToBuffer} = require('@fast-csv/format');
const mongoose = require('mongoose')
const { trackError, uploadErrorHistory } = require("../models/track.model")
const {v4 : uuidv4} = require('uuid')
const { trackProcessing } = require("../utils/upload")
const Ticket = require("../models/dashboard.model").ticket
const Dispute = require("../models/dashboard.model").dispute
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
    let fileInfos = req.files
    await trackProcessing(songInfo,fileInfos,spotifyresponse,req)
    res.status(201).json({success : true, message : 'Music Information has been successfully added'})
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}

const invalidSpotifyResolution = async(req,res,next)=>{
  try {
    const {_id, trackLink, err_type} = req.body
    if(!_id || !trackLink || !err_type){
      throw new BadRequestError('Bad request, missing parameter')
    }
    const trackDetails = await trackError.findById(_id).exec()
    if(!trackDetails || trackDetails.err_type != 'InvalidSpotifyLink'){
      throw new BadRequestError('Bad request, Only SpotifyLink Fixes are allowed')
    }
    const uploadHistory = await uploadErrorHistory.findOne({associatedErrors : {$in : [_id]}}).where('user').equals(req.user._id)
    if(!uploadHistory){
      throw new BadRequestError('Bad request, Error track not found')
    }

    let spotifyresponse = await spotifyCheck.SpotifyPreview(res, trackLink)
    const confirmTrackUploaded = await Track.findOne({isrc : spotifyresponse.isrc}).exec()

    if(confirmTrackUploaded){
      throw new unauthorizedError('Track already exists')
    }

    let songInfo = req.body
    let fileInfo = req.file

    await trackProcessing(songInfo,fileInfo,spotifyresponse,req)
    const newuploadHistory = await uploadErrorHistory.findOneAndUpdate({user : req.user._id},{$pull : {associatedErrors : songInfo._id}, status : 'Partially Processed'},{new : true})
    trackError.findByIdAndDelete(songInfo._id).exec()
    if(newuploadHistory.associatedErrors.length < 1){
      await uploadErrorHistory.findOneAndUpdate({user : req.user._id},{status : 'Processed'},{new : true})
      .then(async({_id})=>{
        if(req.user.role == 'Music Uploader'){
          await User.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : _id}},{new : true})
        }else{
          await Admin.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : _id}},{new : true})
        }
        
      })
    }

    res.send('Track successfully uploaded and error resolved.')
    
  } catch (error) {
    console.log({error})
    throw new BadRequestError(error.message)
  }
}

const ignoreBulkResolution = async(req,res,next)=>{
  try {
    const {bulkErrorId, errorType} = req.query
    const allowedErrorType = ['duplicateTrackByAnother','InvalidSpotifyLink', 'duplicateTrack']
    if(!allowedErrorType.includes(errorType)){
      throw new BadRequestError('Invalid error type parameter')
    }
    const uploadHistory = await uploadErrorHistory.findOne({_id : bulkErrorId}).populate('associatedErrors').where('user').equals(req.user._id)
    if(!uploadHistory){
      throw new BadRequestError('Bad request, Error track not found')
    }
    await Promise.all(uploadHistory.associatedErrors.filter((trackErrorInfo)=> trackErrorInfo.err_type === errorType ).map(async (trackErrorInfo)=>{
      await trackError.findOneAndDelete({_id : trackErrorInfo._id})
      await uploadErrorHistory.findByIdAndUpdate(bulkErrorId, {$pull : {associatedErrors : trackErrorInfo._id}, status : 'Partially Processed'}).exec()
    }))
    const errorHistory = await uploadErrorHistory.findById(bulkErrorId).populate('associatedErrors').exec()
    if(errorHistory.associatedErrors.length < 1){
      await uploadErrorHistory.findByIdAndDelete(bulkErrorId).exec()
      if(req.user.role == "Music Uploader"){
        await User.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : bulkErrorId}},{new : true})
      }else{
        await Admin.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : bulkErrorId}},{new : true})
      }
      
    }
    res.send({message : 'Errors cleared successfully',errorHistory})
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Bad request, invalid parameters')
  }
}

const ignoreSingleResolution = async(req,res,next)=>{
  try {
    const {errorId} = req.query

    await trackError.findByIdAndDelete(errorId).exec()

    const newuploadHistory = await uploadErrorHistory.findOneAndUpdate({associatedErrors : {$in : [errorId]}}, {$pull : {associatedErrors : errorId}},{new : true}).where('user').equals(req.user._id)

    if(newuploadHistory.associatedErrors.length < 1){
      await uploadErrorHistory.findByIdAndUpdate(newuploadHistory._id,{status : 'Processed'},{new : true})
      .then(async(item)=>{
        if(req.user.role == "Music Uploader"){
          await User.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : item._id}},{new : true})
        }else{
          await Admin.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : item._id}},{new : true})
        }
      })
    }
    res.send('Track disposed successfully')
  } catch (error) {
    console.log(error)
    throw new BadRequestError('Bad request, invalid parameters')
  }
}

const bulkUploadFileDispute = async(req,res,next)=>{
  try {
    const {errorId, disputeType} = req.query
    const allowedDisputeTypes = ['single','bulk']
    let savedDispute;
  if(!errorId || !allowedDisputeTypes.includes(disputeType)){
    throw new BadRequestError('Missing or invalid Parameters')
  }
  if(disputeType == 'single'){
    const errorExist = await trackError.findById(errorId).where('user').equals(req.user._id)
    console.log(errorExist)
    if(!errorExist || errorExist.err_type != 'duplicateTrackByAnother'){
      throw new BadRequestError('Error Track not found')
    }
    let newDispute = new Dispute({
      nameOfTrack : errorExist.trackTitle,
      issueType : 'claimRights',
      desc : 'Filed due to duplicity of track info after a bulk upload error occured',
      isrc : errorExist.isrc,
      user : req.user.id
    })
    savedDispute = [await newDispute.save()]
    const newuploadHistory = await uploadErrorHistory.findOneAndUpdate({associatedErrors : {$in : [errorId]}}, {$pull : {associatedErrors : errorId}},{new : true}).where('user').equals(req.user._id)
    if(newuploadHistory.associatedErrors.length < 1){
      await uploadErrorHistory.findByIdAndUpdate(newuploadHistory._id,{status : 'Processed'},{new : true})
      .then(async(item)=>{
        const newDetails = await User.findByIdAndUpdate(req.user._id,{$pull : {uploadErrors : item._id}},{new : true})
        console.log(newDetails);
      })
    }
  }else{
    const errorHistory = await uploadErrorHistory.findById(errorId).populate('associatedErrors').where('user').equals(req.user._id).exec()
    const duplicateList = errorHistory.associatedErrors.filter((item)=>item.err_type == "duplicateTrackByAnother")
    const disputes = duplicateList.map((track)=>{
      return{
        nameOfTrack : track.trackTitle,
        issueType : 'claimRights',
        desc : 'Filed due to duplicity of track info after a bulk upload error occured',
        isrc : track.isrc,
        user : req.user.id
      }
    })
    savedDispute = await Dispute.insertMany(disputes)
  }
  const disputesIds = savedDispute.map(item => item._id)
  let newTicket = new Ticket({
    tickId : `Tick_${uuidv4()}`,
    user : req.user.id,
    associatedDisputes : disputesIds
  })
  await newTicket.save()
  await uploadErrorHistory.findByIdAndDelete(errorId).where('user').equals(req.user._id)
  await User.findByIdAndUpdate(req.user.id,{$pull : {uploadErrors : errorId}})
  res.status(200).json('Dispute Filed Successfully')
  }catch (error) {
    console.log(error)
    throw new BadRequestError('Bad request, try again later')
  }
}

const trackBulkUpload = async(req,res,next)=>{
  if(!req.file){
    throw new ForbiddenError('Kindly input a valid file type')
  }
  const session = await mongoose.startSession();
  session.startTransaction();
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
  let uploadErrorId = ''
  const userModel = req.user.role === "Music Uploader" ? 'user' : 'admin';
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
    res.write(`event: error\n`);
    res.write(`data: ${JSON.stringify({ status : 400, message: err.message})}\n\n`);
    fs.unlinkSync(req.file.path)
    res.end()

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
            invalidSpotifyLink.push({...row, message  : error.message, err_type : 'InvalidSpotifyLink', user : req.user._id,userRole: req.user.role,userModel})
          }else if (error instanceof mongoose.MongooseError){
            console.log('Mongoose Error', error)
          }
          continue;
        }
        confirmTrackUploaded = await Track.findOne({$or : [{isrc : spotifyresponse.isrc},{trackLink : row.trackLink}]}).populate('user').exec()

        if(confirmTrackUploaded){
          res.write(`event: warning duplicate data\n`);
          res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);
          failedCount++
          if(confirmTrackUploaded.user._id.equals(req.user._id)){
            duplicateData.push({...row, message : 'Duplicate data found', err_type : 'duplicateTrack', userModel, user : req.user._id, trackOwner : confirmTrackUploaded.user._id, trackOwnerModel : confirmTrackUploaded.user.role == "Music Uploader" ? 'user' : 'admin'})
          }else{
            duplicateData.push({...row, message : 'Duplicate data found', err_type : 'duplicateTrackByAnother', userModel, user : req.user._id, trackOwner : confirmTrackUploaded.user._id, trackOwnerModel : confirmTrackUploaded.user.role == "Music Uploader" ? 'user' : 'admin'})
          }
          continue;
        }
        res.write(`event: progress\n`);
        res.write(`data: ${JSON.stringify({ parsedRows, rowCount })}\n\n`);

        row.spotifyLink = spotifyresponse.spotifyLink
        row.isrc = spotifyresponse.isrc
        row.userModel = userModel
        row.user = req.user.id
        row.trackLink = spotifyresponse.preview_url
        row.artWork = spotifyresponse.artwork
        row.duration = spotifyresponse.duration
        successCount++
        sortedMusicData.push(row)
      }
      const uploadedTracks = await Track.insertMany(sortedMusicData)
      if(req.user.role == 'Music Uploader'){
        await Promise.all(uploadedTracks.map(async (track)=>{
          await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id }},{session}).exec()
        }))
      }
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
        invalidSpotifyLink = await trackError.insertMany(invalidSpotifyLink,{session})
        duplicateData = await trackError.insertMany(duplicateData,{session})
        const errorRes = [...invalidSpotifyLink, ...duplicateData]
        const errorIds = errorRes.map((error)=> error._id)
        const uploadHistory = new uploadErrorHistory({
          uploadId : `UI_${uuidv4()}`,
          associatedErrors : errorIds,
          filename : req.file.originalname,
          fileBuffer,
          userModel,
          user : req.user._id
        })
        await uploadHistory.save({session}).then(async(res)=>{
          uploadErrorId = res._id
          if(req.user.role == 'Music Uploader'){
            await User.findOneAndUpdate({_id : req.user._id},{$push : {uploadErrors : res._id}},{session}).exec()
          }else {
            await Admin.findOneAndUpdate({_id : req.user._id},{$push : {uploadErrors : res._id}},{session}).exec()
          }
          
        })
      }

      const errorCsv = invalidSpotifyLink.length > 0 && {fileBuffer, filename : `${req.file.originalname}`, fileType : 'text/csv'}
      await session.commitTransaction();
      session.endSession();

      res.write(`event: done\n`);
      res.write(`data: ${JSON.stringify({failedCount, errorData : {uploadErrorId,invalidSpotifyLink, duplicateData}, errorCsv })}\n\n`);

      fs.unlinkSync(req.file.path)
      res.end();
  
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      if(error instanceof mongoose.MongooseError){
        res.write(`data: ${JSON.stringify({ status : 400, message : formatMongooseError(error)})}\n\n`);
      }else{
        res.write(`data: ${JSON.stringify({ status : 400, message : error.message })}\n\n`);
      }
      res.end()
      fs.unlinkSync(req.file.path)
    }
  });
  
}

const myTracks = async(req,res,next)=>{
  try {
    const myTracks = await Track.find({user : req.user.id})
    res.json({message : 'Tracks successfully gotten', tracks : myTracks})
  } catch (error) {
    console.log(error)
    throw new BadRequestError('An error occurred while fetching your tracks')
  }
}

const getUploadErrorHistory = async (req, res, next) => {
  try {
    const { bulkErrorId, page = 1, limit = 10 } = req.query; // Pagination support
    let errorHistory;

    if (bulkErrorId) {
      errorHistory = await uploadErrorHistory
        .findById(bulkErrorId)
        .populate("associatedErrors")
        .exec();

      if (!errorHistory) {
        throw new BadRequestError("Error history not found for the provided ID");
      }
    } else {
      const skip = (page - 1) * limit; // Calculate skip value for pagination
      const totalErrors = await uploadErrorHistory.countDocuments({ user: req.user.id });

      errorHistory = await uploadErrorHistory
        .find({ user: req.user.id })
        .populate("associatedErrors")
        .sort({ createdAt: -1 }) // Sort by most recent first
        .skip(skip)
        .limit(Number(limit))
        .exec();

      return res.send({
        success: true,
        totalRecords: totalErrors,
        currentPage: Number(page),
        totalPages: Math.ceil(totalErrors / limit),
        errorHistory,
      });
    }
    res.send({ success: true, errorHistory });
  } catch (error) {
    console.error("Error fetching upload error history:", error);
    next(new BadRequestError("An error occurred while fetching error history"));
  }
};


const getAllSongs = async(req,res,next)=>{
  const allTracks = await Track.find({}, "artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
  res.json({allTracks})
}

const getTracksByGenre = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({genre : {$regex : req.params.genre, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByInstrument = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({featuredInstrument : {$regex : req.params.instrument, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const getTracksByMood = async(req,res,next)=>{
    try {
      const allTracks = await Track.find({mood : {$regex : req.params.mood, $options : 'i'}}, "artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
      res.json({allTracks})
    } catch (error) {
      res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
    }
}

const querySongsByIndex = async(req,res,next)=>{
  const query = req.params.queryText
  const regex = new RegExp(query, 'i');
  try {
    const allTracks =  await Track.find({$or : [
      {trackTitle : {$regex : regex}},
      {mainArtist : {$regex : regex}},
    ]},"artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
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
        const details = await Track.findOne({_id : trackId}, "genre mood producers trackTitle artWork trackLink mainArtist duration releaseDate spotifyLink featuredArtist releaseTitle tag").exec()
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

const freequerySong = async(req,res,next)=>{
  const query = req.params.queryText
  const regex = new RegExp(query, 'i');
  try {
    const allTracks =  await Track.find({$or : [
      {trackTitle : {$regex : regex}},
      {mainArtist : {$regex : regex}},
    ]},"artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").where('uploadStatus').equals('Approved').exec()
    res.json({allTracks})
  } catch (error) {
    res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
  }
}

module.exports = {verifyTrackUpload, trackUpload, getAllSongs, getTracksByGenre, getTracksByInstrument, getTracksByMood, querySongsByIndex, queryTrackInfo, trackBulkUpload,invalidSpotifyResolution,freequerySong, ignoreBulkResolution, ignoreSingleResolution,bulkUploadFileDispute, getUploadErrorHistory,myTracks}
