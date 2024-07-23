var express = require('express');
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('artWork')
const asyncHandler = require('express-async-handler')
const passport = require('passport')
var router = express.Router();
const trackController = require('../controllers/trackController')


router.get('/api/v1/verifyTrackUploaded/:isrc',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(trackController.verifyTrackUpload))

router.post('/api/v1/trackUpload/',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload,asyncHandler(trackController.trackUpload))


router.get('/allsongs', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(trackController.getAllSongs));

router.get('/getTrackByGenre/:genre', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(trackController.getTracksByGenre));

router.get('/getTrackByInstrument/:instrument', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(trackController.getTracksByInstrument));

router.get('/getTrackByMood/:mood', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(trackController.getTracksByMood));

router.get('/querySongs/:queryText', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(trackController.querySongsByIndex));

module.exports = router;
