var express = require('express');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require("../models/usermodel")
const Track = require('../models/dashboard.model').track
const dashbordControllers = require('../controllers/dashboardControllers')
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('artWork')
const passport = require('passport')

const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

router.post('/api/v1/passwordreset/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.passwordreset))

router.get('/api/v1/verifyTrackUploaded/:isrc',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.verifyTrackUpload))

router.post('/api/v1/trackUpload/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload,asyncHandler(dashbordControllers.trackUpload))

module.exports = router; 