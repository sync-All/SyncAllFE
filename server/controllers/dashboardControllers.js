const dashboard = require("../models/dashboard.model").dashboard
const bcrypt = require('bcrypt')
const User = require("../models/usermodel").uploader
const Transaction = require('../models/transactions.model').transaction
const uploaderAccountInfo = require('../models/dashboard.model').uploaderAccountInfo
const cloudinary = require("cloudinary").v2
const Dispute = require('../models/dashboard.model').dispute
const Ticket = require('../models/dashboard.model').ticket
const nanoId = require('nanoid')
const fs = require("node:fs")
const { request } = require("node:http")
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
            if(req.user.role == "Music Uploader"){
                const userDashboardDetails = await dashboard.findOne({user : userId}).populate('totalTracks').exec()
                const profileInfo = await User.findById(userId)
                const transactions = await Transaction.find({user : userId})
                res.status(200).json({success : true, dashboardDetails : userDashboardDetails,profileInfo, transactions})
            }else{
                res.status(401).json('Unauthorized access')
            }
        } catch (error) {
            console.log(error)
            res.status(401).json('User does not exists')
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
                    let newTicket = new Ticket({
                        tickId : `Tick_${nanoId()}`,
                        user : req.user.id,
                        associatedDisputes : [response._id]
                    })
                    newTicket.save()
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
                    let newTicket = new Ticket({
                        tickId : `Tick_${nanoId()}`,
                        user : req.user.id,
                        associatedDisputes : [response._id]
                    })
                    newTicket.save()
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
        const existingAccountinfo = await uploaderAccountInfo.findOne({user : userId})
        if (existingAccountinfo){
            await uploaderAccountInfo.findOneAndUpdate({user : userId},{...req.body})
        }else{
            const newInfo = new uploaderAccountInfo({...req.body, user : userId})
            await newInfo.save()
            await dashboard.findOneAndUpdate({user : userId}, {accountInfo : newInfo._id},{new : true})
        }
        res.status(200).json({success : true, message : 'Update Successful'})
    }else{
        res.status(401).json('Unauthorized')
    }
}


module.exports = {dashboardcontrol, passwordreset, fileDispute, updatePaymentInfo, allDispute}