const router = require('express').Router()
const Dispute =  require('../../models/dashboard.model').dispute

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')

router.get('/dispute/all_disputes', checkAdmin, asynchandler(async(req,res,next)=>{
    const disputes = await Dispute.find({}).exec()
    res.send(disputes)
}))

module.exports = router