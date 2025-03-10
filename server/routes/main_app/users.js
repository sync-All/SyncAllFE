var express = require("express");
const asynchandler = require("express-async-handler");
const authcontroller = require("../../controllers/authControllers");
const passport = require("passport");
const multer = require("multer");
const { testUpdate } = require("../../controllers/admin/users");
const uploadProfileImg = multer({ dest: "uploads/" }).single("img");
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

module.exports = router;
