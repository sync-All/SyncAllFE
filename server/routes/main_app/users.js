var express = require("express");
const asynchandler = require("express-async-handler");
const authcontroller = require("../../controllers/authControllers");
const passport = require("passport");
const multer = require("multer");
const { testUpdate } = require("../../controllers/admin/users");
const { checkUser } = require("../../utils/AuthenticateChecker");
const { notification } = require("../../models/usermodel");
const { Types } = require("mongoose");
const { BadRequestError } = require("../../utils/CustomError");
const uploadProfileImg = multer({ dest: "uploads/" }).single("img");
const User = require('../../models/usermodel').uploader
const SyncUser = require('../../models/usermodel').syncUser
var router = express.Router();

/* GET users listing. */
router.post("/api/v1/signup", asynchandler(authcontroller.signup));

router.post("/api/v1/signin", asynchandler(authcontroller.signin));

router.post("/api/v1/googleauth", asynchandler(authcontroller.googleAuth));

router.post("/api/v1/signin", asynchandler(authcontroller.signin));

router.get(
  "/api/v1/getsyncuserinfo",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
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

router.get(
  "/api/v1/validateToken",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/unauthorized",
  }),
  (req, res, next) => {
    res.status(200).send("Valid Token");
  }
);

router.post(
  "/api/v1/changePassword",
  passport.authenticate("jwt", { session: false }),
  authcontroller.changePassword
);

router.post("/api/v1/request/forgotPassword", authcontroller.requestForgotPw);
router.get("/api/v1/readNotification", checkUser, asynchandler(async (req,res,next)=>{
  const {markOne, markAll} = req.query
  try{
    if(markAll){
      const unreadNotifications = await notification.find({read : false}).where('user').equals(req.user.id)
      if(unreadNotifications.length > 0){
        await Promise.all(unreadNotifications.map(async(item)=>{
          await notification.findByIdAndUpdate(item._id,{read : true})
        }))
      }
    }
    else if(markOne){
      if(!Types.ObjectId.isValid(markOne)){
        throw new BadRequestError("Notification not found")
      }
      await notification.findByIdAndUpdate(markOne,{read : true}).exec()
    }
    res.send('Read Successfully')
  }catch(error){
    console.log(error)
    throw new BadRequestError("Error Occured while reading your notification")
  }
}));

router.get("/api/v1/clearAllNotification", checkUser, asynchandler(async (req,res,next)=>{
  try{
    const user = {req}
    const allNotifications = await notification.find({user : user.id})
    if(allNotifications.length > 0){
      if (user.role === "Music Uploader") {
        await User.findByIdAndUpdate(user.id, { $set: { notifications: [] } });
      } else if (user.role === "Sync User") {
        await SyncUser.findByIdAndUpdate(user.id, { $set: { notifications: [] } });
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
