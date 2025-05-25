var express = require("express");
const asynchandler = require("express-async-handler");
const authcontroller = require("../../controllers/authControllers");
const passport = require("passport");
const multer = require("multer");
const { testUpdate } = require("../../controllers/admin/users");
const { checkRoles, checkAllUsers, checkAllUsersReset } = require("../../utils/AuthenticateChecker");
const Notification = require("../../models/usermodel").notification;
const { Types } = require("mongoose");
const { BadRequestError } = require("../../utils/CustomError");
const { loginLimiter } = require("../../utils/rateLimit");
const uploadProfileImg = multer({ dest: "uploads/" }).single("img");
const User = require('../../models/usermodel').uploader
const SyncUser = require('../../models/usermodel').syncUser
var router = express.Router();

/* GET users listing. */
router.post("/api/v1/signup", asynchandler(authcontroller.signup));

router.post("/api/v1/signin", loginLimiter, asynchandler(authcontroller.signin));

router.post("/api/v1/googleauth",loginLimiter, asynchandler(authcontroller.googleAuth));

router.get("/api/v1/who_am_i",checkAllUsers, asynchandler(authcontroller.who_am_i));

router.get(
  "/api/v1/getsyncuserinfo",checkRoles(['Sync User']),
  asynchandler(authcontroller.getsyncuserinfo)
);
router.post(
  "/api/v1/profilesetup",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  asynchandler(authcontroller.profilesetup)
);

router.post(
  "/api/v1/profileupdate",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  uploadProfileImg,
  asynchandler(authcontroller.profileUpdate)
);

router.get(
  "/verifyEmail/",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/notConfirmed",
  }),
  authcontroller.verifyEmail
);

const confirmationEmailPaths = [
  "/notConfirmed",
  "/AlreadyConfirmed",
  "/confirmedEmail",
];

router.get(confirmationEmailPaths, (req, res, next) => {
  switch (req.path) {
    case "/confirmedEmail":
      res.render("emailConfirmed", {
        title: "Email Verified",
        icon: "/images/verifiedIcon.png",
        heading: "Email Verified",
        message:
          "Your email address has been successfully verified. Click below to proceed.",
      });
      break;

    case "/notConfirmed":
      res.render("emailConfirmed", {
        title: "Not Verified",
        icon: "/images/notverified.png",
        heading: "Email Not Verified",
        message:
          "Looks like the link has expired, kindly proceed to Login to get another link sent",
      });
      break;
    case "/AlreadyConfirmed":
      res.render("emailConfirmed", {
        title: "Already Confirmed",
        icon: "/images/verifiedIcon.png",
        heading: "Email Already Been Setup",
        message: "Please proceed to login below",
      });
      break;
  }
});


router.post("/api/v1/request/forgotPassword", authcontroller.requestForgotPw);

router.post(
  "/api/v1/resetPassword",
  checkAllUsersReset,
  authcontroller.resetPassword
);


router.post('/api/v1/changePassword/',checkAllUsers,asynchandler(authcontroller.changePassword))

router.get("/api/v1/readNotification", checkAllUsers, asynchandler(async (req,res,next)=>{
  const {markOne, markAll} = req.query
  try{
    if(markAll){
      const unreadNotifications = await Notification.find({read : false}).where('user').equals(req.user.id)
      if(unreadNotifications.length > 0){
        await Promise.all(unreadNotifications.map(async(item)=>{
          await Notification.findByIdAndUpdate(item._id,{read : true})
        }))
      }
    }
    else if(markOne){
      if(!Types.ObjectId.isValid(markOne)){
        throw new BadRequestError("Notification not found")
      }
      await Notification.findByIdAndUpdate(markOne,{read : true}).exec()
    }
    res.send('Read Successfully')
  }catch(error){
    console.log(error)
    throw new BadRequestError("Error Occured while reading your notification")
  }
}));

router.get("/api/v1/clearAllNotification", checkAllUsers, asynchandler(async (req,res,next)=>{
  try{
    const {user} = req
    const allNotifications = await Notification.find({user : user.id})
    if(allNotifications.length > 0){
      if (user.role === "Music Uploader") {
        await User.findByIdAndUpdate(user.id, { $set: { notifications: [] } });
      } else if (user.role === "Sync User") {
        await SyncUser.findByIdAndUpdate(user.id, { $set: { notifications: []}});
      }
      const notificationIds = allNotifications.map((item) => item._id);
      await Notification.deleteMany({ _id: { $in: notificationIds } });
    }
    res.send('Cleared Successfully')
  }catch(error){
    console.log(error)
    throw new BadRequestError("Error Occured while reading your notification")
  }
}));


module.exports = router;
