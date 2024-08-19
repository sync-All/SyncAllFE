var express = require('express');
const asynchandler = require('express-async-handler');
const authcontroller = require('../controllers/authControllers');
const passport = require('passport');
const User = require('../models/usermodel').uploader;
const SyncUser = require('../models/usermodel').syncUser
const multer = require("multer")
const uploadProfileImg = multer({dest: 'uploads/'}).single('img')
var router = express.Router();

/* GET users listing. */
router.post('/api/v1/signup', asynchandler(authcontroller.signup));

router.post('/api/v1/signin', asynchandler(authcontroller.signin));
router.post('/api/v1/googleauth', asynchandler(authcontroller.googleAuth))

router.post('/api/v1/signin',asynchandler(authcontroller.signin))

router.get('/api/v1/allusers', asynchandler(authcontroller.allUsers));
router.get('/api/v1/getsyncuserinfo',passport.authenticate('jwt',{session : false,failureRedirect : '/unauthorized'}), asynchandler(async (req,res,next)=>{
  const userId = req.user._id
  const details = await SyncUser.findOne({_id : userId}).populate('tracklist').select('-password').exec()
  res.send({user : details, success : true})
}))
router.post('/api/v1/profilesetup', async (req, res, next) => {
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
      const userId = req.user.userId;
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

router.post('/api/v1/profileupdate',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),uploadProfileImg,asynchandler(authcontroller.profileUpdate) )

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

router.get('/api/v1/validateToken',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),(req,res,next)=>{
  res.status(200).send('Valid Token')
})

router.post('/api/v1/changePassword', passport.authenticate('jwt',{session : false}), authcontroller.changePassword)

router.post('/api/v1/request/forgotPassword', authcontroller.requestForgotPw)

module.exports = router;
