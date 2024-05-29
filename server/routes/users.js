var express = require('express');
const asynchandler = require('express-async-handler');
const authcontroller = require('../controllers/authControllers')
const passport = require('passport')

var router = express.Router();

/* GET users listing. */
router.post('/api/v1/signup', asynchandler(authcontroller.signup));

router.post('/api/v1/signin',asynchandler(authcontroller.signin))

router.get('/api/v1/allusers', asynchandler(authcontroller.allUsers))

router.post('/verifyEmail', passport.authenticate('jwt', {session : false, successRedirect : '/confirmedEmail'}))

router.post('/confirmedEmail',(req,res,next)=>{

    res.json('Welcome')
})

module.exports = router;
