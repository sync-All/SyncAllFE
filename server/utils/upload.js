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

const lyricsFilter = (req, file, cb) => {
  const allowedExt = ['.txt', '.lrc'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExt.includes(ext)) {
    return cb(new Error('Only .txt and .lrc files are allowed'), false);
  }
  cb(null, true);
};

const trackUploadFIlter = (req,file,cb) =>{
  const ext = path.extname(file.originalname).toLowerCase();
  if (file.fieldname === "artWork") {
    // Accept only image files
    const allowedImageTypes = [".jpg", ".jpeg", ".png", ".webp"];
    if (allowedImageTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed for artWork (JPG, PNG, WEBP)"));
    }
  }else if (file.fieldname === "lyricsFile") {
    // Accept only .txt or .lrc
    const allowedLyricsTypes = [".txt", ".lrc"];
    if (allowedLyricsTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only .lrc or .txt files are allowed for lyrics"));
    }

  } else {
    cb(new Error("Unexpected file field"));
  }
}

const parseLRC = (raw) => {
  return raw
  .split('\n')
  .map(line => line.replace(/\[\d{1,2}:\d{1,2}(?:\.\d{1,3})?\]/g, '').trim()) // remove timestamp
  .filter(line => line.length > 0)
  .join('\n');
};

const trackProcessing = async (songInfo,fileInfos,spotifyresponse,request)=>{
  try {
    if(fileInfos){
      if(fileInfos.artWork?.[0]){
        const artFile = fileInfos.artWork?.[0]
        var artWork = await cloudinary.uploader.upload(artFile.path,{folder:  "track_artwork"})
        songInfo.artWork = artWork.secure_url
        
        fs.unlinkSync(artFile.path)
      }
      if(fileInfos.lyricsFile?.[0]){

      }
      const adjustedsongInfo = {...songInfo, user : request.user.id, trackLink : spotifyresponse.preview_url, spotifyLink : spotifyresponse.spotifyLink, duration : spotifyresponse.duration , spotifyArtistIds : spotifyresponse.artistIds,userModel : request.user.role == 'Music Uploader' ? 'user' : 'admin'}
        const track = new Track(adjustedsongInfo)
        const trackInfo = await track.save()
        if(request.user.role == 'Music Uploader'){
          await dashboard.findOneAndUpdate({user : request.user.id},{ $push: { totalTracks: trackInfo._id }}).exec()
        }
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


module.exports = {fileFilter,disputeFileFilter, trackProcessing,lyricsFilter,parseLRC}