var express = require('express');
const asyncHandler = require('express-async-handler')
const User = require('../models/usermodel')
const Track = require('../models/dashboard.model').track
const dashbordControllers = require('../controllers/dashboardControllers')
const multer = require("multer")
const upload = multer({dest: 'uploads/'}).single('artWork')
const uploadProfileImg = multer({dest: 'uploads/'}).single('img')
const disputeUpload = multer({dest: 'uploads/'}).single('supportingDoc')
const passport = require('passport')
const fs = require('node:fs')
const path = require('path')

const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

router.post('/api/v1/passwordreset/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.passwordreset))

router.get('/api/v1/verifyTrackUploaded/:isrc',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.verifyTrackUpload))

router.post('/api/v1/trackUpload/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload,asyncHandler(dashbordControllers.trackUpload))

router.post('/api/v1/dispute/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),disputeUpload,async (req,res,next)=>{
    if(req.file){
        console.log('File size is ' + req.file.size)
        const filepath = req.file.path
        const fileBuffer = fs.readFileSync(req.file.path)
        console.log(fileBuffer.toString('base64'))

        fs.unlinkSync(req.file.path)
        res.send('yay')
    }
})



module.exports = router; 