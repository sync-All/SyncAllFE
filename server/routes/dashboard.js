var express = require('express');
const asyncHandler = require('express-async-handler')
const dashbordControllers = require('../controllers/dashboardControllers')
const passport = require('passport')

const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

module.exports = router; 