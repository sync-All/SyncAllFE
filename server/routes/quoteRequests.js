const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const passport = require('passport')
const { BadRequestError } = require('../utils/CustomError')
const syncLicenseRequest = require('../models/quote.model').syncLicenseRequest
const samplingRequest =  require('../models/quote.model').samplingRequest

router.post('/request/sync-license', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        try {
            const request = new syncLicenseRequest({...req.body})
            await request.save()
            .then(()=>{
                res.send('Request Sent Successfully')
            })
        } catch (error) {
            BadRequestError('Invalid Request, try again later')
        }
    }else {
        BadRequestError('Invalid Request, try again later')
    }
}))

router.post('/request/sampling-interpolation', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asyncHandler(async (req,res,next)=>{
    if(req.user.role == "Sync User"){
        try {
            const request = new samplingRequest({...req.body})
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