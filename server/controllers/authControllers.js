const confirmEmail = require('../utils/mailer');
const issueJwt = require('../utils/issueJwt')
const EmailDomain = require('../utils/grabUserEmailDomain')
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Dashboard = require('../models/dashboard.model').dashboard;
const cloudinary = require("cloudinary").v2
const passport = require('passport')
require('dotenv').config()


cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_API_KEY,
  secure : true,
  api_secret : process.env.CLOUD_API_SECRET
})


const signup = async function(req, res) {
    const {name, email, password, role, userType} = req.body
    if(!name || !email || !password || !role || !userType){
      if(!name){
        return res.status(401).json({success: false , message : "Name Field Missing, please review input"})
      }else if(!email){
        return res.status(401).json({success : false, message : "Email Field Missing, please review input"})
      }else if(!password){
        return res.status(401).json({success : false, message : "Password Field Missing, please review input"})
      }else if(!role){
        return res.status(401).json({success : false, message : "Role Field Missing, please review input"})
      }else if(!userType){
        return res.status(401).json({success : false, message : "UserType Field Missing, please review input"})
      }
    }else{
      const getIdentity = await User.findOne({ email : email}).exec()
      if(getIdentity){
        res.status(401).json({success: false, message : "Email Already in use"})
      }else{
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS), function(err, password){
          const users = new User({
            name,
            email,
            password,
            role,
            userType,
          })
          users.save()
          .then((users)=> {
               const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(users)
               const grabber = EmailDomain.grabEmailDomain(users)
               confirmEmail.sendConfirmationMail(users,toBeIssuedJwt.token)
               const dashboard = new Dashboard({
                user : users._id
               })
               dashboard.save()
              res.status(200).json({success : true, message : "Account successfully created", emailDomain : grabber})
          })
          .catch(err = console.log(err))
          
        })
      }
    }
  }

  const signin = async(req,res,next)=> {
    const {email,password} = req.body
    const user = await User.findOne({email : email}).exec()
    if(!user){
      return res.status(401).json({success : false, message : "User doesn't Exists"})
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      res.status(401).json({success : false, message : "Incorrect Password, Please check again and retry"})
    }else if(!user.emailConfirmedStatus){
      const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(user)
      confirmEmail.sendConfirmationMail(user,toBeIssuedJwt.token)
      res.status(401).json({success : false, message : 'Oops.., Your email is yet to be confirmed, Kindly check your email for new confirmation Link'})
    }else{
      const toBeIssuedJwt = issueJwt.issueJwtLogin(user)
      const userDetails = await User.findOne({email : email}).select('-password').exec()
      res.status(200).json({success : true, user : userDetails, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
    }
  }

const allUsers = async (req,res,next) =>{
  const users = await User.find().exec()
  if(users){
    res.json({success : true, message : users})
  }else{
    res.json({success : false, message : "Error fetching users"})
  }
}

const profileUpdate = async (req,res,next)=>{
  try {
    const userId = req.params.userId
    if(req.user.role == "Music Uploader"){

      if(req.file){
          var profilePicture = await cloudinary.uploader.upload(req.file.path)
          const profileUpdate = await User.findByIdAndUpdate(userId,{...req.body, img : profilePicture.secure_url}, {new : true}).exec()
          fs.unlinkSync(req.file.path)
          res.status(200).json({success : true, message : 'Profile update successful', profileUpdate})
      }else{
        const profileUpdate = await User.findByIdAndUpdate(userId,req.body,{new : true}).exec()
          res.status(200).json({success : true, message : 'Profile update successful', profileUpdate})
      }
    }else{
      res.status(401).send('Unauthorized')
    }    
  } catch (error) {
    res.status(401).json(error)
  }
}

const verifyEmail =  async (req,res,next)=>{
  if(req.user.emailConfirmedStatus){
      res.redirect('/AlreadyConfirmed')
  }
  else if(req.isAuthenticated()){
      const user = await User.findOneAndUpdate({_id : req.user._id},{emailConfirmedStatus : true},{new : true})
      res.redirect('/confirmedEmail')
  }else{
      res.redirect('/notConfirmed')
  }
}

module.exports = {signup, signin, allUsers, profileUpdate, verifyEmail}

  