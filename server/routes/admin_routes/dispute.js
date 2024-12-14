const router = require('express').Router()
const ticket =  require('../../models/dashboard.model').ticket

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')
const {assignAdmin, setDisputeStatus} = require('../../controllers/admin/dispute')

router.get('/dispute/all_tickets', checkAdmin, asynchandler(async(req,res,next)=>{
    const tickets = await ticket.find({}).populate('user', 'name email userType').populate('associatedDisputes').exec()
    res.send(tickets)
}))

router.get('/dispute/assign', checkAdmin, asynchandler(assignAdmin))
router.get('/dispute/setstatus', checkAdmin, asynchandler(setDisputeStatus))

module.exports = router