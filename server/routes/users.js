var express = require('express');
const asynchandler = require('express-async-handler');
const authcontroller = require('../controllers/authControllers');
const passport = require('passport');
const User = require('../models/usermodel');

var router = express.Router();

/* GET users listing. */
router.post('/api/v1/signup', asynchandler(authcontroller.signup));

router.post('/api/v1/signin', asynchandler(authcontroller.signin));

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

// , {session : false, successRedirect : '/confirmedEmail', failureRedirect : '/notConfirmed'}

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
