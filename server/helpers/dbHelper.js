const Track = require("../models/track.model").track;
const dashboard = require('../models/dashboard.model').dashboard
const User = require('../models/usermodel').uploader
const mongoose = require("mongoose");
const { grabSpotifyToken, spotifyResult } = require("../utils/spotify");
const { uploadErrorHistory } = require("../models/track.model");
const { dispute } = require("../models/dashboard.model");
const { attachNewNotification } = require("../controllers/userControllers");
require('dotenv').config



const mongoString = process.env.MONGO_CONNECT_STRING
const mongoTestString = process.env.MONGO_TEST_CONNECT_STRING

try {
  main()
} catch (error) {
  console.log(error)
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

const bulkOperation = async()=>{
  const bulkOps = await Track.find().then(tracks =>
    tracks.map(track => {
      // if(track.userRole){
      //   let userModel = track.userRole === 'Music Uploader' ? 'user' : 'admin';
      // }
      let userModel;

      if(track.user.equals('66ffcf8e3bbc86bd5da85486')){
        console.log('object')
        userModel = 'admin';
      }
      
      return {
        updateOne: {
          filter: { _id: track._id },
          update: { userModel }
        }
      };
    })
  );
  
  if (bulkOps.length) {
    try {
      console.log(bulkOps.length)
      await Track.bulkWrite(bulkOps);
      console.log('done')
    } catch (error) {
      console.log(error)
    }
  }
  return;
}
bulkOperation()


