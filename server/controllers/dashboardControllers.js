const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/dashboard.model").track
const bcrypt = require('bcrypt')
const User = require("../models/usermodel")
const cloudinary = require("cloudinary").v2
const fs = require("node:fs")
require('dotenv').config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    secure : true,
    api_secret : process.env.CLOUD_API_SECRET
})

const dashboardcontrol = async (req,res,next)=>{
        const userId = req.params.userId
        try {
            if(req.user.role == "Music Uploader"){
                const userDashboardDetails = await dashboard.findOne({user : userId}).exec()
                const profileInfo = await User.findById(userId)
            res.status(200).json({success : true, dashboardDetails : userDashboardDetails,profileInfo})
            }else{
                res.status(401).json('Unauthorized access')
            }
        } catch (error) {
            res.status(401).json('User does not exists')
        }

}

const verifyTrackUpload = async(req,res,next)=>{
        try{
            const isrc = req.params.isrc
            const confirmTrackUploaded = await Track.findOne({isrc : isrc}).exec()
            console.log(confirmTrackUploaded)
            if(confirmTrackUploaded){
                res.status(401).json('Track already exists')
            }else{
                res.status(200).json({success : true, message : 'Specific track with ISRC is not available'})
            }
        }catch {
            res.status(404).json("Not found")
        }
    }

const trackUpload = async(req,res,next)=>{
        if(req.user.role == "Music Uploader"){
            try {
                const {isrc} = req.body
                const confirmTrackUploaded = await Track.findOne({isrc : isrc}).exec()
                if(confirmTrackUploaded){
                    res.status(401).json('Track already exists')
                }else{
                    let songInfo = req.body
                    var artWork = await cloudinary.uploader.upload(req.file.path)
                    songInfo = {...songInfo, artWork : artWork, user : req.params.userId}
                    const track = new Track(songInfo)
                    track.save()
                    .then(()=>{
                        res.status(200).json({success : true, message : 'Music Information has been successfully added'})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(401).json(err)
                    })
                }
            } catch (error) {
                res.status(401).json('An error ocurred, please try again')
            }
        }else{
            res.status(401).json('Unauthorized Access, Role not Supported')
        }
    }

const passwordreset = async (req,res,next)=>{
    try {
        if(req.user.role == "Music Uploader"){
        const userId = req.params.userId
        const {oldPassword, newPassword} = req.body
        const userInfo = await User.findById(userId).exec()
        const match = await bcrypt.compare(oldPassword, userInfo.password)
        if(!match){
            res.status(401).json('Password Incorrect')
        }else{
            bcrypt.hash(newPassword,Number(process.env.SALT_ROUNDS), async(error, hashPw)=>{
                await User.findByIdAndUpdate(userId, {password : hashPw}, {new : true})

                res.status(200).json({success : true, message : 'Password Successfully Updated'})
            })
        }
        }else{
            res.status(401).json('Unauthorized Access')
        }

    } catch (error) {
        res.status(404).json('User not Found')
    }
}

module.exports = {dashboardcontrol, passwordreset, verifyTrackUpload, trackUpload}