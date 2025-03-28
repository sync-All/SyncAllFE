const router = require('express').Router()
const Tracks = require('../../models/track.model').track
const contentManager = require('../../controllers/admin/manage_content')

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')


router.get('/all_content',checkAdmin,asynchandler(async(req,res,next)=>{
    const items = await Tracks.find({}).populate('user','name email').exec()
    res.send(items)
}))
router.get('/manage_content/review',checkAdmin,asynchandler(contentManager.contentReview))

router.get('/manage_content/search',checkAdmin,asynchandler(contentManager.searchContent))

router.post('/manage_content/trackupdate',checkAdmin,asynchandler(contentManager.contentUpdate))

module.exports = router