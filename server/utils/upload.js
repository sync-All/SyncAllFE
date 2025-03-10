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
      const adjustedsongInfo = {...songInfo, artWork : artWork.secure_url, user : request.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration , spotifyArtistIds : spotifyresponse.artistIds}
      const track = new Track(adjustedsongInfo)
      const trackInfo = await track.save()
      await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
      fs.unlinkSync(fileInfo.path)
    }else{
      const adjustedsongInfo = {...songInfo, artWork : spotifyresponse.artwork, user : request.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration, spotifyArtistIds : spotifyresponse.artistIds}
      const track = new Track(adjustedsongInfo)
      const trackInfo = await track.save()
      await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
    }
    return;
  } catch (err) {
    console.log(err)
    throw new BadRequestError(err)
  }

}

// response.status(200).json({success : true, message : 'Music Information has been successfully added'})

// if(songInfo.err_type && songInfo._id){
//   await trackError.findByIdAndDelete(songInfo._id)
//   await uploadErrorHistory.findByIdAndUpdate({user : request.user._id},{$pull : {associatedErrors : songInfo._id}, status : 'Partially Processed'})
// }

module.exports = {fileFilter,disputeFileFilter, trackProcessing}