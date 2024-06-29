var express = require('express');
const asyncHandler = require('express-async-handler')
const dashbordControllers = require('../controllers/dashboardControllers')
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('artWork')
const disputeUpload = multer({dest: 'uploads/'}).single('supportingDoc')
const passport = require('passport');
const Dispute = require('../models/dashboard.model').dispute
const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

router.post('/api/v1/passwordreset/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.passwordreset))

router.get('/api/v1/verifyTrackUploaded/:isrc',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.verifyTrackUpload))

router.post('/api/v1/trackUpload/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload,asyncHandler(dashbordControllers.trackUpload))

router.get('/api/v1/alldispute',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),dashbordControllers.allDispute)

router.post('/api/v1/dispute/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),disputeUpload,dashbordControllers.fileDispute)

router.post('/api/v1/updatepaymentinfo/',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),dashbordControllers.updatePaymentInfo)



module.exports = router; 