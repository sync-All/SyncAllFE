var express = require('express');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const User = require("../models/usermodel")
const dashbordControllers = require('../controllers/dashboardControllers')
const passport = require('passport')

const router = express.Router()

router.get('/api/v1/dashboardhome/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.dashboardcontrol))

router.post('/api/v1/passwordreset/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(dashbordControllers.passwordreset))

module.exports = router; 