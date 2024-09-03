const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const { BadRequestError } = require('../utils/CustomError')
const { informQuoteRequest } = require('../utils/mailer')
const multer = require('multer')
const upload = multer({dest: 'uploads/'}).array('attachments', 5)
const cloudinary = require("cloudinary").v2
const fs = require("node:fs")
const { EventEmitterAsyncResource } = require('supertest/lib/test')
const Track = require('../models/dashboard.model').track
const fmtRequest = require('../models/quote.model').fmtRequest
const tvaRequest = require('../models/quote.model').tvaRequest
const videoGamesRequest = require('../models/quote.model').videoGamesRequest
const samplingRequest =  require('../models/quote.model').samplingRequest
const interpolationRequest = require('../models/quote.model').interpolationRequest
const crbtRequest = require('../models/quote.model').crbtRequest
const smcRequest = require('../models/quote.model').smcRequest

router.post('/quote-request/tva', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        const trackId = req.body.track_info
        console.log(req.body)
        try {
            const verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track does not exists')
            }
            if(req.files){
                const attachments = [...req.files]
                let attachmentUrlList = []
                attachments.forEach(async (attachment)=>{
                    const linky = await cloudinary.uploader.upload(attachment.path, {folder : "tva_attachment_requests"})
                    attachmentUrlList.push(linky.secure_url)
                    fs.unlinkSync(attachment.path)
                })
                const request = new tvaRequest({...req.body, user_info : userId, attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else {
                const request = new tvaRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/fmt', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload, asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        const trackId = req.body.track_info
        try {
            const verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track does not exists')
            }
            if(req.files){
                const attachments = [...req.files]
                let attachmentUrlList = []
                attachments.forEach(async (attachment)=>{
                    const linky = await cloudinary.uploader.upload(attachment.path, {folder : "fmt_attachment_requests"})
                    attachmentUrlList.push(linky.secure_url)
                    fs.unlinkSync(attachment.path)
                })
                const request = new fmtRequest({...req.body, user_info : userId, attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else {
                const request = new fmtRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/video_game', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload, asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        const trackId = req.body.track_info
        try {
            const verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track does not exists')
            }
            if(req.files){
                const attachments = [...req.files]
                const attachmentUrlList = []
                attachments.forEach(async attachment => {
                    await cloudinary.uploader.upload(attachment.path,{folder:  "video_game_request_attachments"})
                    .then((linky)=>{
                        fs.unlinkSync(attachment.path)
                        attachmentUrlList.push(linky.secure_url)
                        return; 
                    }) 
                    .catch((error) => {
                        console.log(error)
                        fs.unlinkSync(attachment.path);
                        return;
                    });
                })
                const request = new videoGamesRequest({...req.body, user_info : userId,attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else{
                const request = new videoGamesRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError("An error occured, please try again later")
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/sampling', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload, asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        const trackId = req.body.track_info
        try {
            const  verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track not found')
            }
            if(req.files){
                const attachments = [...req.files]
                let attachmentUrlList = []
                attachments.forEach(async (attachment)=>{
                    const linky = await cloudinary.uploader.upload(attachment.path, {folder : "sampling_attachment_requests"})
                    attachmentUrlList.push(linky.secure_url)
                    fs.unlinkSync(attachment.path)
                })
                const request = new samplingRequest({...req.body, user_info : userId, attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else {
                // informQuoteRequest('deemajor230600@gmail.com')
                const request = new samplingRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
         throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/interpolation', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload, asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        console.log(req.body)
        const trackId = req.body.track_info
        try {
            const verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track does not exists')
            }
            if(req.files){
                const attachments = [...req.files]
                let attachmentUrlList = []
                attachments.forEach(async (attachment)=>{
                    const linky = await cloudinary.uploader.upload(attachment.path, {folder : "interpolation_attachment_requests"})
                    attachmentUrlList.push(linky.secure_url)
                    fs.unlinkSync(attachment.path)
                })
                const request = new interpolationRequest({...req.body, user_info : userId, attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else {
                const request = new interpolationRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/crbt', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        console.log(req.body)
        try {
            const request = new crbtRequest({...req.body, user_info : userId})
            await request.save()
            .then(()=>{
                res.send('Request Sent Successfully')
            })
        } catch (error) {
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else{
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/smc', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),upload, asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        const trackId = req.body.track_info
        try {
            const verifyTrack = await Track.findOne({_id : trackId}).exec()
            if(!verifyTrack){
                throw new BadRequestError('Track does not exists')
            }
            if(req.files){
                const attachments = [...req.files]
                let attachmentUrlList = []
                attachments.forEach(async (attachment)=>{
                    const linky = await cloudinary.uploader.upload(attachment.path, {folder : "smc_attachment_requests"})
                    attachmentUrlList.push(linky.secure_url)
                    fs.unlinkSync(attachment.path)
                })
                const request = new smcRequest({...req.body, user_info : userId, attachments : attachmentUrlList})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }else {
                const request = new smcRequest({...req.body, user_info : userId})
                await request.save()
                .then(()=>{
                    res.send('Request Sent Successfully')
                })
            }
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

module.exports = router