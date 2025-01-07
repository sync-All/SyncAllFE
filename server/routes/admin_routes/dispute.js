const router = require('express').Router()
const ticket =  require('../../models/dashboard.model').ticket

const asynchandler = require('express-async-handler')
const { checkAdmin } = require('../../utils/AuthenticateChecker')
const {assignAdmin, setDisputeStatus, searchTicket,requestAdditionalDocument} = require('../../controllers/admin/dispute')

router.get('/ticket/all_tickets', checkAdmin, asynchandler(async(req,res,next)=>{
    const tickets = await ticket.find({}).populate('user', 'name email userType').populate('associatedDisputes').populate({path : 'associatedDisputes', populate : [{path : 'activityLog', model : 'adminActivityLog'}, {path : 'assignedTo', model : 'admin'}]}).exec()
    res.send(tickets)
}))

router.get('/ticket/search', checkAdmin, asynchandler(searchTicket))

router.get('/dispute/assign', checkAdmin, asynchandler(assignAdmin))
router.get('/dispute/setstatus', checkAdmin, asynchandler(setDisputeStatus))
router.get('/dispute/requestAdditionalDocument', checkAdmin, asynchandler(requestAdditionalDocument))

module.exports = router