const confirmEmail = require('../utils/mailer');
const issueJwt = require('../utils/issueJwt')
const EmailDomain = require('../utils/grabUserEmailDomain')
const bcrypt = require('bcrypt');
const User = require('../models/usermodel').uploader;
const SyncUser = require('../models/usermodel').syncUser;
const issueJwtForgotPassword = require('../utils/issueJwt').issueJwtForgotPassword
const requestForgotPassword = require('../utils/mailer').requestForgotPassword
const Dashboard = require('../models/dashboard.model').dashboard;
const spotifyChecker = require('../utils/spotify')
const cloudinary = require("cloudinary").v2
const fs = require('node:fs')
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
      const getUploaderIdentity = await User.findOne({ email : email.toLowerCase()}).exec()
      const getSyncUserIdentity = await SyncUser.findOne({ email : email.toLowerCase()}).exec()
      if(getUploaderIdentity || getSyncUserIdentity){
        res.status(401).json({success: false, message : "Email Already in use"})
      }else{
        if(role == "Music Uploader"){
          bcrypt.hash(password, Number(process.env.SALT_ROUNDS), function(err, password){
            const users = new User({
              name,
              email : email.toLowerCase(),
              password,
              role,
              userType,
            })
            users.save()
            .then(async (users)=> {
                const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(users)
                const grabber = EmailDomain.grabEmailDomain(users)
                await confirmEmail.sendConfirmationMail(users,toBeIssuedJwt.token)
                 const dashboard = new Dashboard({
                  user : users._id
                })
                await dashboard.save()
                res.status(200).json({success : true, message : "Account successfully created", emailDomain : grabber})
            })
            .catch(err => console.log(err))
          })
        }else {
          bcrypt.hash(password, Number(process.env.SALT_ROUNDS), function(err, password){
            const users = new SyncUser({
              name,
              email : email.toLowerCase(),
              password,
              role,
              userType,
            })
            users.save()
            .then((users)=> {
                  const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(users)
                 const grabber = EmailDomain.grabEmailDomain(users)
                 confirmEmail.sendConfirmationMail(users,toBeIssuedJwt.token)
                res.status(200).json({success : true, message : "Account successfully created", emailDomain : grabber})
            })
            .catch(err => console.log(err))
          })
        }
        
      }
    }
  }

  const signin = async(req,res,next)=> {
    const {email,password} = req.body
    const user = await User.findOne({email : email.toLowerCase()}).exec()
    const syncUser = await SyncUser.findOne(({email : email.toLowerCase()})).exec()
    let item = user || syncUser
    if(!item){
      return res.status(401).json({success : false, message : "User doesn't Exists"})
    }
    const match = await bcrypt.compare(password, item.password);

    if(!match){
      return res.status(401).json({success : false, message : "Incorrect Password, Please check again and retry"})
    }else if(!item.emailConfirmedStatus){
      const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(user ||  syncUser)
      confirmEmail.sendConfirmationMail(user ||  syncUser,toBeIssuedJwt.token)
      return res.status(401).json({success : false, message : 'Oops.., Your email is yet to be confirmed, Kindly check your email for new confirmation Link'})
    }else{

      const toBeIssuedJwt = issueJwt.issueJwtLogin(user || syncUser)

      const userDetails = await User.findOne({email : email.toLowerCase()}).select('-password').exec()

      const syncUserDetails = await SyncUser.findOne({email : email.toLowerCase()}, "name email role").select('-tracklist').select('-password').exec()

      res.status(200).json({success : true, user : userDetails ||  syncUserDetails, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
    }
 
  }

  const googleAuth = async(req,res,next)=>{
        try {
          const user = await User.findOne({email : req.body.email.toLowerCase()}).exec() 
          const syncUser = await SyncUser.findOne({email : req.body.email.toLowerCase()}).exec()
          let item = user || syncUser
          if (!item){
            if(req.body.role){
              if(req.body.role == "Music Uploader"){
                const user = new User({...req.body,authSource : 'googleAuth'})
                var newUser = await user.save()
                const dashboard = new Dashboard({
                  user : newUser._id
                })
                await dashboard.save()
                newUser = newUser.toObject()
                delete newUser.password
              }else{
                const user = new SyncUser({...req.body,authSource : 'googleAuth'})
                var newSyncUser = await user.save()
                newSyncUser = newSyncUser.toObject()
                delete newSyncUser.password
              }
              item = newUser || newSyncUser
              let toBeIssuedJwt = issueJwt.issueJwtLogin(item)

              res.status(200).json({success : true, user : item, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
            }else{
              return res.status(302).json({success : false, message : "You are yet to Identify with a role", path : '/selectRole'})
            }
            
          }else{
            let toBeIssuedJwt = issueJwt.issueJwtLogin(item)

            res.status(200).json({success : true, user : item, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
          }
          
        } catch (error) {
          console.log(error)
          res.status(401).send(error)
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

const getsyncuserinfo = async (req,res,next)=>{
  const userId = req.user._id
  const details = await SyncUser.findOne({_id : userId}).populate('tracklist', "artWork trackTitle mainArtist trackLink duration genre mood producers").populate('pendingLicensedTracks').select('-password').exec()
  res.send({user : details, success : true})
}

const profilesetup = async (req, res, next) => {
  if (req.isAuthenticated) {
    const { fullName, spotifyLink, bio } = req.body;
    await spotifyChecker.validateSpotifyArtistLink(spotifyLink)
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

      res.status(200).json({
          success: true,
          message: 'Profile update successful',
          profileUpdate,
        });
    }
  }else {
    res.status(401).json({
        success: false,
        message: 'Unauthorized, Please proceed to login',
      });
  }
}

const profileUpdate = async (req,res,next)=>{
  const userId = req.user.id
  if(req.body.email !== req.user.email){
    return res.status(401).send('unauthorized buddy 😒, unable to make change')
  }
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
  }
  else if(req.user.role == "Sync User")
  {
    if(req.file){
      var profilePicture = await cloudinary.uploader.upload(req.file.path)
      if(req.body.firstName  && req.body.lastName){
        var fullName = req.body.firstName + " " + req.body.lastName
      }
      const profileUpdate = await SyncUser.findByIdAndUpdate(userId,{...req.body, img : profilePicture.secure_url, name : fullName}, {new : true}).exec()
      fs.unlinkSync(req.file.path)
      res.status(200).json({success : true, message : 'Profile update successful', profileUpdate})
    }
    else{
      if(req.body.firstName  && req.body.lastName){
        var fullName = req.body.firstName + " " + req.body.lastName
      }
      const profileUpdate = await SyncUser.findByIdAndUpdate(userId,{...req.body, name : fullName},{new : true}).exec()
      res.status(200).json({success : true, message : 'Profile update successful', profileUpdate})
    }
  }else{
    res.status(401).send('Unauthorized')
  }    
}

const verifyEmail =  async (req,res,next)=>{
  if(req.user.emailConfirmedStatus){
      res.redirect('/AlreadyConfirmed')
  }
  else if(req.isAuthenticated()){
    if(req.user.role == "Music Uploader"){
      await User.findOneAndUpdate({_id : req.user._id},{emailConfirmedStatus : true},{new : true})
      res.redirect('/confirmedEmail')
    }else{
      await SyncUser.findOneAndUpdate({_id : req.user._id},{emailConfirmedStatus : true},{new : true})
      res.redirect('/confirmedEmail')
    }
      
  }else{
      res.redirect('/notConfirmed')
  }
}

const changePassword = async(req,res,next)=>{
  const {password, confirmPassword} = req.body
 if(req.isAuthenticated()){
  const userId = req.user.id
  if(password !== confirmPassword){
    return res.status(422).send('Password Mismatch please try again')
  }
  try {
    if(req.user.role == "Music Uploader"){
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async function(err, hashPw){
        await User.findByIdAndUpdate(userId, {password : hashPw}, {new : true})
        res.status(200).json({success : true, message : 'Password Successfully Updated'})
      })
    }else if(req.user.role == "Sync User"){
      bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async function(err, hashPw){

        await SyncUser.findByIdAndUpdate(userId, {password : hashPw}, {new : true})
        res.status(200).json({success : true, message : 'Password Successfully Updated'})
      })
    }
  } catch (error) {
    res.status(422).send("Invalid Email Address")
  }
 }else{
  res.status(400).send("Link Expired")
 }
}

const requestForgotPw = async (req,res,next)=>{
  const {email} = req.body

    const user = await User.findOne({email}).exec() || await SyncUser.findOne({email}).exec()
    console.log(user)

    if(user){
      const {token} = issueJwtForgotPassword(user)
      requestForgotPassword(user, token)
      res.status(200).send({success :  true, message : 'Kindly Check your Mail to Proceed'})
    }else{
      res.status(422).send("Invalid Emailee Address")
    }
}

module.exports = {signup, signin, googleAuth, allUsers, profileUpdate, verifyEmail, changePassword, requestForgotPw, getsyncuserinfo, profilesetup}

  