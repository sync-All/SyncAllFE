const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const { BadRequestError } = require('../utils/CustomError')
const { informQuoteRequest } = require('../utils/mailer')
const fmtRequest = require('../models/quote.model').fmtRequest
const tvaRequest = require('../models/quote.model').tvaRequest
const videoGamesRequest = require('../models/quote.model').videoGamesRequest
const samplingRequest =  require('../models/quote.model').samplingRequest
const interpolationRequest = require('../models/quote.model').interpolationRequest
const crbtRequest = require('../models/quote.model').crbtRequest
const smcRequest = require('../models/quote.model').smcRequest

router.post('/quote-request/tva', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        try {
            const request = new tvaRequest({...req.body, user_info : userId})
            await request.save()
            .then(()=>{
                res.send('Request Sent Successfully')
            })
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/fmt', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        try {
            const request = new fmtRequest({...req.body, user_info : userId})
            await request.save()
            .then(()=>{
                res.send('Request Sent Successfully')
            })
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/video_game', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        try {
            const request = new videoGamesRequest({...req.body, user_info : userId})
            await request.save()
            .then(()=>{
                res.send('Request Sent Successfully')
            })
        } catch (error) {
            console.log(error)
            throw new BadRequestError('Invalid Request, try again later')
        }
    }else {
        throw new BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/quote-request/sampling', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        try {
            const request = new samplingRequest({...req.body, user_info : userId})
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

router.post('/quote-request/interpolation', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        try {
            const request = new interpolationRequest({...req.body, user_info : userId})
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

router.post('/quote-request/crbt', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        try {
            informQuoteRequest('deemajor230600@gmail.com')
            // const request = new crbtRequest({...req.body, user_info : userId})
            // await request.save()
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

router.post('/quote-request/smc', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        const userId = req.user._id
        try {
            const request = new smcRequest({...req.body, user_info : userId})
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

module.exports = router