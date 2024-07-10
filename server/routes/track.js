var express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport')
var router = express.Router();
const Track = require('../models/dashboard.model').track

/* GET home page. */
router.get('/allsongs', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async(req,res,next)=>{
  const allTracks = await Track.find({}).exec()
  res.json({allTracks})
}));

router.get('/getsongs/:genre', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async(req,res,next)=>{
  console.log(req.params.genre)
  try {
    const allTracks = await Track.find({genre : req.params.genre}).exec()
    res.json({allTracks})
  } catch (error) {
    res.status(404).json({message : ' Looks like we dont have any music that fits this category'})
  }
}));

module.exports = router;
