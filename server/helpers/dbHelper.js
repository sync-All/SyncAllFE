const Track = require("../models/track.model").track;
const dashboard = require('../models/dashboard.model').dashboard
const User = require('../models/usermodel').uploader
const mongoose = require("mongoose");
const { grabSpotifyToken, spotifyResult } = require("../utils/spotify")
require('dotenv').config



const mongoString = process.env.MONGO_CONNECT_STRING
const mongoTestString = process.env.MONGO_TEST_CONNECT_STRING

try {
    main()
  } catch (error) {
    console.log(err)
  }
  
  async function main(){
    await mongoose.connect( process.env.NODE_ENV == 'test' ? mongoTestString :  mongoString)
    return
  }

// const Utwa = async()=> {
//     const allSongData = await Track.find({}).exec()
//     const spotifyToken = await grabSpotifyToken()
//     console.log(spotifyToken)
//     let parsedItems = 0
//     let previouslyresolved = 0
//     let dataLength = allSongData.length
//     for(var i = 0; i < dataLength; i++){
//         try {
//             if(allSongData[i].spotifyArtistIds.length > 0){
//                 console.log( `PreviousResolved : ${previouslyresolved++}`)
//                 continue;
//             }
//             const response = await spotifyResult(allSongData[i].spotifyLink, spotifyToken)

//             const refinedTrack = await Track.findOneAndUpdate({_id : allSongData[i]._id},{spotifyArtistIds : response.artistIds}).exec()
//             console.log(`parsedItems : ${parsedItems++}`)
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// Utwa()

async function toogleTrackUploadStatus(){
  try {
    const allDMCETracks = await Track.find({user : '66fa6eb39b6d88aacad97852'}).exec()
    for(var i = 0; i < allDMCETracks.length; i++){
      const updateTrack = await Track.findByIdAndUpdate(allDMCETracks[i]._id, {uploadStatus : 'Approved'}, {new : true})
      console.log(updateTrack.uploadStatus)
    }
    return;
  } catch (error) {
    console.log(error)
  }
}

toogleTrackUploadStatus()


// async function addFieldToExistingDocuments() {
//   try {
//       const result = await dashboard.updateMany(
//           { accountInfo: { $exists: false } }, // Only update if the field doesn't exist
//       );
//       console.log(`Updated ${result.modifiedCount} documents with newField.`);
//   } catch (error) {
//       console.error("Error updating documents:", error);
//   }
// }

// addFieldToExistingDocuments()