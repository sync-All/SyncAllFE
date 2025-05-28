const { adminActivityLog } = require('../../models/activity.model');
const { admin, suspendedAccount } = require('../../models/usermodel');
const { BadRequestError } = require('../../utils/CustomError');
const { sendUserAnEmail } = require('../../utils/mailer');
const { findUserAndUpdate, attachNewNotification } = require('../userControllers');

const User = require('../../models/usermodel').uploader;
const SyncUser = require('../../models/usermodel').syncUser;
const Admin = require('../../models/usermodel').admin

// const allUsers = async (req,res,next) =>{
//   try {
//     const {userTypes} = req.query
//     const allowedFilters = ['all','uploaders','syncUsers']
//     if(userTypes && !allowedFilters.includes(userTypes)){
//       throw new BadRequestError('Invalid query parameters')
//     }
//     if(userTypes == 'all' || !userTypes){
//       const [Users1, Users2] = await Promise.all([User.find().populate('dashboard')
//         .populate({path : 'dashboard', populate : [{path : 'totalTracks', model : 'track'}, {path : 'accountInfo', model : 'uploaderAccountInfo'}]}).select('-password').exec(), 
//       SyncUser.find().populate('totalLicensedTracks')
//       .populate('pendingLicensedTracks').select('-password').exec()])
//       const allusers = [...Users1, ...Users2]
//       res.json({success : true, message : allusers})
//     }else if(userTypes == 'uploaders'){
//       const allusers = await User.find().populate('dashboard')
//       .populate({path : 'dashboard', populate : [{path : 'totalTracks', model : 'track'}, {path : 'accountInfo', model : 'uploaderAccountInfo'}]}).select('-password').exec()
//       res.json({success : true, message : allusers})
//     }else if (userTypes == 'syncUsers'){
//       const allusers = await SyncUser.find().populate('totalLicensedTracks')
//       .populate('pendingLicensedTracks').select('-password').exec()
//       res.json({success : true, message : allusers})
//     }
    
//   } catch (error) {
//     throw new BadRequestError('An Error Occurred While fetching users')
//   }
  
// }

const allUsers = async (req, res, next) => {
  try {
    const { userTypes } = req.query;

    const allowedTypes = ['uploaders', 'syncUsers', 'ContentAdmin', 'SuperAdmin', 'Admin'];
    const typesRequested = userTypes
      ? userTypes.split(',').filter(type => allowedTypes.includes(type))
      : allowedTypes; // Default to all if not specified

    if (userTypes && typesRequested.length === 0) {
      return next(new BadRequestError('Invalid query parameter: userTypes'));
    }

    const promises = [];

    // Uploaders
    if (typesRequested.includes('uploaders')) {
      promises.push(
        User.find()
          .select('-password')
          .populate({
            path: 'dashboard',
            populate: [
              { path: 'totalTracks', model: 'track' },
              { path: 'accountInfo', model: 'uploaderAccountInfo' },
            ],
          })
          .exec()
      );
    }

    // Sync Users
    if (typesRequested.includes('syncUsers')) {
      promises.push(
        SyncUser.find()
          .select('-password')
          .populate('totalLicensedTracks')
          .populate('pendingLicensedTracks')
          .exec()
      );
    }

    // Admin Roles
    if (typesRequested.includes('ContentAdmin')) {
      promises.push(Admin.find({ role: 'ContentAdmin' }).select('name email role').exec());
    }

    if (typesRequested.includes('SuperAdmin')) {
      promises.push(Admin.find({ role: 'SuperAdmin' }).select('name email role').exec());
    }

    if (typesRequested.includes('Admin')) {
      promises.push(Admin.find({ role: 'Admin' }).select('name email role').exec());
    }

    const results = await Promise.all(promises);
    const allUsers = results.flat();

    res.json({ success: true, message: allUsers });
  } catch (error) {
    next(new BadRequestError('An error occurred while fetching users'));
  }
};



const allAdmin = async (req,res,next)=>{
  try {
    const admins = await Admin.find({}).select('name email role').exec()
    res.send({admins})
  } catch (error) {
    throw new BadRequestError('An error occurred, contact dev team')
  }
}


const userSearch = async (req,res,next)=>{
  try {
    const {filter} = req.query
    const regex = new RegExp(filter, 'i');

    const users = await Promise.all([User.find({$or : [
      { username: { $regex: regex } },
      { email: { $regex: regex } },
      { name: { $regex: regex } },
    ]}).populate('dashboard')
      .populate({path : 'dashboard', populate : [{path : 'totalTracks', model : 'track'}, {path : 'accountInfo', model : 'uploaderAccountInfo'}]}).select('-password').exec(), 
    SyncUser.find({
      $or : [
        { username: { $regex: regex } },
        { email: { $regex: regex } },
        { name: { $regex: regex } },
      ]
    }).populate('totalLicensedTracks')
    .populate('pendingLicensedTracks').select('-password').exec()])
    res.send({users : [...users[0], ...users[1]]})
  } catch (error) {
    console.log(error)
    throw new BadRequestError('An error occurred, contact dev team')
  }
}

const suspendUser = async(req,res,next)=>{
  try {
    const {reason, userId} = req.body
    console.log("request body:",req.body)
    if(!reason || !userId){
      throw new BadRequestError("Bad request, invalid parameters")
    }
    const accountDetails = await suspendedAccount.findOne({userId})
    if(accountDetails){
      throw new BadRequestError("Duplicate action rejected, User account is already suspended")
    }
    if(!reason){
      throw new BadRequestError("Provide a valid reason for suspension")
    }

    const adminActivity =   new adminActivityLog({
      action_taken : "Suspended user account",
      performedBy : req.user.id
    })
    adminActivity.save()
    const update = await findUserAndUpdate({_id : userId}, {accountStatus : 'Inactive'})
    new suspendedAccount({
      userId,
      role : update.role,
      reason,
      performedBy : req.user.id
    }).save()
    await attachNewNotification({title : "Account Suspended", message : "Due to the nature of activities, your account has been suspended pending further review, kindly contact support", userId})
    res.send('Account has been suspended')
  } catch (error) {
    throw new BadRequestError(error.message || 'An error occured, try agani later')
  }
}

const activateUser = async(req,res,next)=>{
  try {
    const {userId} = req.body
    if(!userId){
      throw new BadRequestError("Bad request, invalid parameters")
    }
    const accountDetails = await suspendedAccount.findOne({userId})
    if(!accountDetails){
      throw new BadRequestError('Action not allowed!, User account is already active')
    }
    const adminActivity =   new adminActivityLog({
      action_taken : "Activated user account",
      performedBy : req.user.id
    })
    adminActivity.save()
    await findUserAndUpdate({_id : userId}, {accountStatus : 'Active'})
    await suspendedAccount.findOneAndDelete({userId})
    await attachNewNotification({title : "Account activated", message : "After reviewing your activities on our platform, your account has been activated. You can go ahead to perform all actions normally", userId})
    res.send('Account activated')
  } catch (error) {
    throw new BadRequestError(error.message || 'An error occured, try agani later')
  }
}

const sendUserEmail = async(req,res,next)=>{
  try {
    const { content, subject, userEmail } = req.body;
    if(!content || !subject || !userEmail){
      throw new BadRequestError('Missing Parameters, please try again')
    }
    const files = req.files;
    await sendUserAnEmail(userEmail, subject,content,files)
    const adminActivity =   new adminActivityLog({
      action_taken : "Sent a user an email",
      performedBy : req.user.id
    })
    adminActivity.save()
    res.send("Mail sent successfully")
  } catch (error) {
    throw new BadRequestError(error.message)
  }
}


module.exports = {allUsers, allAdmin, userSearch, suspendUser,activateUser, sendUserEmail}