var express = require('express');
const asyncHandler = require('express-async-handler')
const dashbordControllers = require('../../controllers/dashboardControllers')
const multer = require("multer")
const disputeFileFilter = require('../../utils/upload').disputeFileFilter
const disputeUpload = multer({dest: 'uploads/', fileFilter : disputeFileFilter, limits : {fieldSize : 5 * 1024 * 1024 }}).single('supportingDoc')
const passport = require('passport');
const router = express.Router()

router.get('/api/v1/dashboardhome',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

router.post('/api/v1/passwordreset/',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.passwordreset))

router.get('/api/v1/alldispute',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),dashbordControllers.allDispute)

router.post('/api/v1/dispute/',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),disputeUpload,dashbordControllers.fileDispute)

router.post('/api/v1/updatepaymentinfo/',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),dashbordControllers.updatePaymentInfo)



module.exports = router; 