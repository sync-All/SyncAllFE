const { ForbiddenError, BadRequestError } = require("./CustomError")
const cloudinary = require("cloudinary").v2
const Track = require("../models/track.model").track
const dashboard = require("../models/dashboard.model").dashboard
const { trackError, uploadErrorHistory } = require("../models/track.model")
const fs = require('fs')

function fileFilter (req, file, cb) {
  if(!file){
    return
  }
  if(file.mimetype === "text/csv"){
      cb(null, true)
  }else{
      cb(new ForbiddenError('Upload forbidden'))
  }
}


const disputeFileFilter = (req, file, cb) => {
  if(!file){
    return
  }
  const originalName = file.originalname
    const fileMime = originalName.endsWith('.pdf') ? 'application/pdf' : originalName.endsWith('.png') ? 'image/png' : ''
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedMimeTypes.includes(fileMime)) {
      req.fileMime = fileMime
      cb(null, true); // Accept the file
    } else {
      cb(new ForbiddenError('Invalid file type. Only PNG, and PDF files are allowed.')
      , false); // Reject the file
    }
};

const trackProcessing = async (songInfo,fileInfo,spotifyresponse,request)=>{
  try {
    if(fileInfo){
      var artWork = await cloudinary.uploader.upload(fileInfo.path,{folder:  "track_artwork"})
      const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : request.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration , spotifyArtistIds : spotifyresponse.artistIds,userModel : request.user.role == 'Music Uploader' ? 'user' : 'admin'}
      const track = new Track(adjustedsongInfo)
      const trackInfo = await track.save()
      if(request.user.role == 'Music Uploader'){
        await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
      }
      fs.unlinkSync(fileInfo.path)
    }else{
      const adjustedsongInfo = {...songInfo, artWork : spotifyresponse.artwork, user : request.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration, spotifyArtistIds : spotifyresponse.artistIds,userModel : request.user.role == 'Music Uploader' ? 'user' : 'admin'}
      const track = new Track(adjustedsongInfo)
      const trackInfo = await track.save()
      if(request.user.role == 'Music Uploader'){
        await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
      }
      await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
    }
    return;
  } catch (err) {
    console.log(err)
    throw new BadRequestError(err)
  }

}


module.exports = {fileFilter,disputeFileFilter, trackProcessing}