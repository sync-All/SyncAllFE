const Track = require("../models/track.model").track;
const dashboard = require('../models/dashboard.model').dashboard
const User = require('../models/usermodel').uploader
const mongoose = require("mongoose");
const { grabSpotifyToken, spotifyResult } = require("../utils/spotify");
const { uploadErrorHistory } = require("../models/track.model");
require('dotenv').config



const mongoString = process.env.MONGO_CONNECT_STRING
const mongoTestString = process.env.MONGO_TEST_CONNECT_STRING

try {
    main()
  } catch (error) {
    console.log(err)
  }
  
  async function main(){
    await mongoose.connect( process.env.NODE_ENV == 'development' ? mongoTestString :  mongoString)
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
    const {uploadErrors} = await User.findOne({_id : '675824cd97dc98e98eaa6c04'}).exec()
    await Promise.all(uploadErrors.map(async(history)=>{
      const result = await uploadErrorHistory.findByIdAndUpdate(history, {user : '675824cd97dc98e98eaa6c04'}, {new : true})

      console.log(result)
    }))
    return;
  } catch (error) {
    console.log(error)
  }
}

toogleTrackUploadStatus()

// async function clearUploadErrors(){
//   const user = await User.findByIdAndUpdate('675824cd97dc98e98eaa6c04',{$set : {uploadErrors : []}}, {new : true})
//   console.log(user)
//   return
// }
// clearUploadErrors()
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