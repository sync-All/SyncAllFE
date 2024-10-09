const router = require('express').Router()
const Tracks = require('../../models/track.model').track

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')


router.get('/all_content',checkAdmin,asynchandler(async(req,res,next)=>{
    const items = await Tracks.find({}).populate('user','name email').exec()
    res.send(items)
}))

module.exports = router