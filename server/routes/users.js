var express = require('express');
const asynchandler = require('express-async-handler');
const authcontroller = require('../controllers/authControllers');
const passport = require('passport');
const User = require('../models/usermodel');
const authcontroller = require('../controllers/authControllers')
const passport = require('passport')
const bcrypt = require('bcrypt')
const issueJwt = require('../utils/issueJwt')
const User = require("../models/usermodel")
var router = express.Router();

/* GET users listing. */
router.post('/api/v1/signup', asynchandler(authcontroller.signup));

router.post('/api/v1/signin', asynchandler(authcontroller.signin));
router.post('/api/v1/googleauth', async(req,res,next)=>{
    try {
        const user = await User.findOne({email : req.body.email}).exec()
        if (!user){
            const user = new User({...req.body,authSource : 'googleAuth'})
            await user.save()
        }
        const toBeIssuedJwt = issueJwt.issueJwtLogin(user)
        const userDetails = await User.findOne({email : req.body.email}).select('-password').exec()
        console.log(userDetails)
        res.status(200).json({success : true, user : userDetails, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
        
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
})

router.post('/api/v1/signin',asynchandler(authcontroller.signin))

router.get('/api/v1/allusers', asynchandler(authcontroller.allUsers));
router.post('/api/v1/profilesetup/:userId', async (req, res, next) => {
  if (req.isAuthenticated) {
    const { fullName, spotifyLink, bio } = req.body;
    if (!fullName || !spotifyLink || !bio) {
      res
        .status(401)
        .json({
          success: false,
          message: 'Missing field please check and confirm',
        });
    } else {
      const userId = req.params.userId;
      const profileUpdate = await User.findByIdAndUpdate(
        userId,
        { fullName, spotifyLink, bio },
        { new: true }
      );

      res
        .status(200)
        .json({
          success: true,
          message: 'Profile update successful',
          profileUpdate,
        });
    }
  } else {
    res
      .status(401)
      .json({
        success: false,
        message: 'Unauthorized, Please proceed to login',
      });
  }
});

router.get(
  '/verifyEmail/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/notConfirmed',
  }),
  async (req, res, next) => {
    if (req.user.emailConfirmedStatus) {
      res.redirect('/AlreadyConfirmed');
    } else if (req.isAuthenticated()) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        { emailConfirmedStatus: true },
        { new: true }
      );
      res.redirect('/confirmedEmail');
    } else {
      res.redirect('/notConfirmed');
    }
  }
);
router.post('/api/v1/profilesetup/:userId',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asynchandler(authcontroller.profileSetup) )

router.get('/verifyEmail/', passport.authenticate('jwt',{session : false, failureRedirect : '/notConfirmed'}),authcontroller.verifyEmail)

router.get('/confirmedEmail', (req, res, next) => {
  res.render('emailConfirmed', {
    title: 'Email Verified',
    icon: '/images/verifiedIcon.png',
    heading: 'Email Verified',
    message:
      'Your email address has been successfully verified. Click below to proceed.',
  });
});

router.get('/notConfirmed', (req, res, next) => {
  res.render('emailConfirmed', {
    title: 'Not Verified',
    icon: '/images/notverified.png',
    heading: 'Email Not Verified',
    message:
      'Looks like the link has expired, kindly proceed to Login to get another link sent',
  });
});

router.get('/AlreadyConfirmed', (req, res, next) => {
  res.render('emailConfirmed', {
    title: 'Already Confirmed',
    icon: '/images/verifiedIcon.png',
    heading: 'Email Already Been Setup',
    message: 'Please proceed to login below',
  });
});

module.exports = router;
