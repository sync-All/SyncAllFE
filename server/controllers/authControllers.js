const confirmEmail = require('../utils/mailer');
const issueJwt = require('../utils/issueJwt')
const EmailDomain = require('../utils/userUtils').grabEmailDomain
const bcrypt = require('bcrypt');
const User = require('../models/usermodel').uploader;
const SyncUser = require('../models/usermodel').syncUser;
const issueJwtForgotPassword = require('../utils/issueJwt').issueJwtForgotPassword
const requestForgotPassword = require('../utils/mailer').requestForgotPassword
const Dashboard = require('../models/dashboard.model').dashboard;
const spotifyChecker = require('../utils/spotify')
const cloudinary = require("cloudinary").v2
const fs = require('node:fs');
const { BadRequestError } = require('../utils/CustomError');
const { getUserInfo, createNewSyncUser, attachNewNotification, findUserAndUpdate } = require('./userControllers');
require('dotenv').config()


cloudinary.config({
  cloud_name : process.env.CLOUD_NAME,
  api_key : process.env.CLOUD_API_KEY,
  secure : true,
  api_secret : process.env.CLOUD_API_SECRET
})


const signup = async function(req, res) {
  try {
    const {email, name, password, role, userType} = req.body
    const allowedItems = ['name','email', 'password', 'role', 'userType']
    const bodyKeys = Object.keys(req.body)
    const missingItems = allowedItems.filter(item => !bodyKeys.includes(item));
    if(missingItems.length > 0){
      throw new BadRequestError(`Missing Parameter : ${missingItems[0]}`)
    }else{
      const userInfo = await getUserInfo({email : email.toLowerCase()})
      if(userInfo){
        res.status(401).json({success: false, message : "Email Already in use"})
      }else{
        if(role == "Music Uploader"){
          const hashpassword = bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
          const newUserData = await createNewMusicUploader({name,email,hashpassword,role,userType})
          const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(newUserData)
          const grabber = EmailDomain.grabEmailDomain(newUserData)
          await confirmEmail.sendConfirmationMail(newUserData,toBeIssuedJwt.token)
          const dashboard = new Dashboard({
          user : newUserData._id
          })
          await dashboard.save()
          await User.findByIdAndUpdate(newUserData.id, {dashboard : dashboard._id})
          res.status(200).json({success : true, message : "Account successfully created", emailDomain : grabber})

        }else {
          const hashpassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
          if(hashpassword){
            const newUserData = await createNewSyncUser({name,email,hashpassword,role,userType})
            if(!newUserData) throw new BadRequestError('An error occured while creating your account')
            const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(newUserData)
            const grabber = EmailDomain.grabEmailDomain(newUserData)
            confirmEmail.sendConfirmationMail(newUserData,toBeIssuedJwt.token)
            res.status(200).json({success : true, message : "Account successfully created", emailDomain : grabber.link})
          }
        }
      }
    }
  } catch (error) {
    console.log(error)
    throw new BadRequestError(error.message)
  }
}

const signin = async(req,res,next)=> {
  let {email,password} = req.body
  email = email.toLowerCase()
  const userInfo = await getUserInfo({email})
  if(!userInfo){
    return res.status(401).json({success : false, message : "Invalid Email or Password"})
  }
  if(!userInfo.password){
    return res.status(401).json({success : false, message : "Invalid Email or Password"})
    
  }
  const match = await bcrypt.compare(password, userInfo.password);
  if(!match){
    return res.status(401).json({success : false, message : "Invalid Email or Password"})
  }else if(!userInfo.emailConfirmedStatus){
    const toBeIssuedJwt = issueJwt.issueJwtConfirmEmail(userInfo)
    confirmEmail.sendConfirmationMail(userInfo,toBeIssuedJwt.token)
    return res.status(401).json({success : false, message : 'Oops.., Your email is yet to be confirmed, Kindly check your email for new confirmation Link'})
  }else{
    const toBeIssuedJwt = issueJwt.issueJwtLogin(userInfo)
    const userDetails = await User.findOne({email : email.toLowerCase()}).select('-password').exec()

    const syncUserDetails = await SyncUser.findOne({email : email.toLowerCase()}, "name email role").select('-tracklist').select('-password').populate('notifications').exec()


    res.status(200).json({success : true, user : userDetails ||  syncUserDetails, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
  }

}

const googleAuth = async(req,res,next)=>{
  try {
    const userInfo = await getUserInfo({email : req.body.email.toLowerCase()},{select : '-password'})
    if (!userInfo){
      let newUser;
      if(req.body.role){
        const {userType} = EmailDomain.grabEmailDomain(req.body)
        if(req.body.role == "Music Uploader"){
          newUser = new User({...req.body,authSource : 'googleAuth', userType})
          await newUser.save()
          const dashboard = new Dashboard({
            user : newUser._id
          })
          await dashboard.save()
        }else{
          newUser = new SyncUser({...req.body,authSource : 'googleAuth', userType})
          await newUser.save()
        }
        newUser = newUser.toObject()
        delete newUser.password
        let toBeIssuedJwt = issueJwt.issueJwtLogin(newUser)

        res.status(200).json({success : true, user : newUser, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
      }else{
        return res.status(302).json({success : false, message : "You are yet to Identify with a role", path : '/selectRole'})
      }
      
    }else{
      let toBeIssuedJwt = issueJwt.issueJwtLogin(userInfo)

      res.status(200).json({success : true, user : userInfo, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
    }
    
  } catch (error) {
    console.log(error)
    res.status(401).send(error)
  }
      
}

const who_am_i = async(req,res,next)=>{
  try {
    const userInfo = req.user.toObject()
    delete userInfo.password
    res.json(userInfo)
  } catch (error) {
    console.log(error)
    throw new BadRequestError("An error occurred while fetching your information")
  }
}

const getsyncuserinfo = async (req,res,next)=>{
  try {
    const userId = req.user._id
    const details = await SyncUser.findOne({_id : userId}).populate('tracklist', "artWork trackTitle mainArtist trackLink duration genre mood producers spotifyLink").populate('pendingLicensedTracks').select('-password').exec()
    res.send({user : details, success : true})
  } catch (error) {
    throw new BadRequestError('Error Fetching user data')
  }
}

const profilesetup = async (req, res, next) => {
  let bodyParams = {...req.body}
  if(req.user.userType == "Individual"){
    const {username, spotifyLink, bio} = req.body;
    const duplicateUsername = await User.findOne({username}).exec()
    if(duplicateUsername){
      throw new BadRequestError('Username exist already')
    }
    const spotifyId = await spotifyChecker.validateSpotifyArtistLink(spotifyLink)
    bodyParams = {...req.body, spotifyId}
    if (!username || !spotifyLink || !bio) {
      return res.status(401).json({success: false, message: 'Missing field please check and confirm',})
    }  
  }else if(req.user.userType == "Company"){
    const {address, representative, phoneNumber} = req.body;
    if (!address || !representative || !phoneNumber) {
      return res.status(401).json({success: false,message: 'Missing field please check and confirm',})
    } 
  }
  const userId = req.user._id;
  try {
    await User.findByIdAndUpdate(userId,bodyParams,{ new: true });
    res.status(200).json({success: true,message: 'Profile setup successful'});
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

const profileUpdate = async (req,res,next)=>{
  const userId = req.user.id
  if(req.body.email || req.body.username){
    if(req.body.email !== req.user.email){
      return res.status(401).send('unauthorized buddy 😒, unable to make changes to email')
    }
    if(req.user.username){
      if(req.body.username !== req.user.username){
        const duplicateUsername = await User.findOne({username}).exec()
        if(duplicateUsername){
          throw new BadRequestError('Username in exist already')
        }
      }
    }
  }
  if(req.user.role == "Music Uploader"){
    if(req.file){
      var profilePicture = await cloudinary.uploader.upload(req.file.path)
      await User.findByIdAndUpdate(userId,{...req.body, img : profilePicture.secure_url}, {new : true}).exec()
      fs.unlinkSync(req.file.path)
      res.status(200).json({success : true, message : 'Profile update successful'})
    }else{
      await User.findByIdAndUpdate(userId,req.body,{new : true}).exec()
      res.status(200).json({success : true, message : 'Profile update successful'})
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

const resetPassword = async(req,res,next)=>{
  const {password, confirmPassword} = req.body
  const userId = req.user.id
  if(password !== confirmPassword){
    return res.status(422).send('Password Mismatch please try again')
  }
  try {
    const hashPw = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
    await findUserAndUpdate({_id : userId}, {password : hashPw})
    res.status(200).json({success : true, message : 'Password Successfully Updated'})
  } catch (error) {
    console.log(error)
    res.status(422).send("Error Occurred while Performing action")
  }
}

const changePassword = async (req,res,next)=>{
  try {
    const userInfo = req.user
    const {oldPassword, newPassword} = req.body
    const match = await bcrypt.compare(oldPassword, userInfo.password)
    if(!match){
      res.status(401).json('Password Incorrect')
    }else{
      const hashPw = await bcrypt.hash(newPassword,Number(process.env.SALT_ROUNDS))
      await findUserAndUpdate({_id : userInfo.id},{password : hashPw})

      res.status(200).json({success : true, message : 'Password Successfully Updated'})
    }
  } catch (error) {
    res.status(404).json('User not Found')
  }
}

const requestForgotPw = async (req,res,next)=>{
  const {email} = req.body

  const user = await getUserInfo({email})

  if(user){
    const {token} = issueJwtForgotPassword(user)
    console.log(token)
    requestForgotPassword(user, token)
    res.status(200).send({success :  true, message : 'Kindly Check your Mail to Proceed'})
  }else{
    res.status(422).send("Invalid Email Address")
  }
}

module.exports = {signup, signin, googleAuth, profileUpdate, verifyEmail, changePassword,resetPassword, requestForgotPw, getsyncuserinfo, profilesetup,who_am_i}

  