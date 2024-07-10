const dashboard = require("../models/dashboard.model").dashboard
const Track = require("../models/dashboard.model").track
const bcrypt = require('bcrypt')
const User = require("../models/usermodel").uploader
const Transaction = require('../models/transactions.model').transaction
const cloudinary = require("cloudinary").v2
const Dispute = require('../models/dashboard.model').dispute
const fs = require("node:fs")
require('dotenv').config()

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    secure : true,
    api_secret : process.env.CLOUD_API_SECRET
})

const dashboardcontrol = async (req,res,next)=>{
        const userId = req.user.id
        try {
            console.log('eee')
            if(req.user.role == "Music Uploader"){
                const userDashboardDetails = await dashboard.findOne({user : userId}).populate('totalTracks').exec()
                console.log(userDashboardDetails)
                const profileInfo = await User.findById(userId)
                const transactions = await Transaction.find({user : userId})
            res.status(200).json({success : true, dashboardDetails : userDashboardDetails,profileInfo, transactions})
            console.log(userDashboardDetails)
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
                const {isrc} = req.body
                const confirmTrackUploaded = await Track.findOne({isrc : isrc}).exec()
                if(confirmTrackUploaded){
                    res.status(401).json('Track already exists')
                }else{
                    let songInfo = req.body
                    var artWork = await cloudinary.uploader.upload(req.file.path)
                    songInfo = {...songInfo, artWork : artWork.secure_url, user : req.user.id}
                    const track = new Track(songInfo)
                    track.save()
                    .then(async (track)=>{
                        await dashboard.findOneAndUpdate({user : req.user.id},{ $push: { totalTracks: track._id } }).exec()
                        fs.unlinkSync(req.file.path)
                        res.status(200).json({success : true, message : 'Music Information has been successfully added'})
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(401).json(err)
                    })
                }
        }else{
            res.status(401).json('Unauthorized Access, Role not Supported')
        }
    }

const passwordreset = async (req,res,next)=>{
    try {
        if(req.user.role == "Music Uploader"){
        const userId = req.user.id
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

const fileDispute = async (req,res,next)=>{
    if(req.user.role == "Music Uploader"){
        if(req.file){
            const fileBuffer = fs.readFileSync(req.file.path)
            let newDispute = new Dispute({
                ...req.body, supportingDoc : fileBuffer, user : req.user.id
            })
            newDispute.save()
                .then((response)=>{
                    fs.unlinkSync(req.file.path)
                    res.status(200).json({success : true, message : response})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(404).json(err)
                })
        }else{
            let newDispute = new Dispute({
                ...req.body, user : req.user.id
            })
                newDispute.save()
                .then((response)=>{
                    res.status(200).json({success : true, message : response})
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(404).json(err)
                })
        }
    }else{
        res.status(401).json('Unauthorized')
    }
}

const allDispute = async (req,res,next)=>{
    if(req.user.role == "Music Uploader"){
        const user = req.user.id
        const allUserDispute = await Dispute.find({user}).exec()
        res.status(200).json({success : true, message : allUserDispute})
    }else{
        res.status(401).json('Unauthorized')
    }
}

const updatePaymentInfo = async (req,res,next)=>{
    if(req.user.role == 'Music Uploader'){
        const userId = req.user.id
        const dashboardAccInfoUpdate = await dashboard.findOneAndUpdate({user : userId}, {
           '$set' : {
            'earnings' : {...req.body}
           }
        },{new : true})
        res.status(200).json({success : true, message : dashboardAccInfoUpdate})
    }else{
        res.status(401).json('Unauthorized')
    }
}


module.exports = {dashboardcontrol, passwordreset, verifyTrackUpload, trackUpload, fileDispute, updatePaymentInfo, allDispute}