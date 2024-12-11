const router = require('express').Router()
const ticket =  require('../../models/dashboard.model').ticket

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')

router.get('/dispute/all_tickets', checkAdmin, asynchandler(async(req,res,next)=>{
    const tickets = await ticket.find({}).populate('user', 'name email userType').populate('associatedDisputes').exec()
    res.send(tickets)
}))

module.exports = router