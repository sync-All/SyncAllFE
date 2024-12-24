const { admin } = require('../../models/usermodel');
const { BadRequestError } = require('../../utils/CustomError');

const User = require('../../models/usermodel').uploader;
const SyncUser = require('../../models/usermodel').syncUser;
const Admin = require('../../models/usermodel').admin

const allUsers = async (req,res,next) =>{
    const [Users1, Users2] = await Promise.all([User.find().populate('dashboard')
      .populate({path : 'dashboard', populate : [{path : 'totalTracks', model : 'track'}, {path : 'accountInfo', model : 'uploaderAccountInfo'}]}).select('-password').exec(), 
    SyncUser.find().populate('totalLicensedTracks')
    .populate('pendingLicensedTracks').select('-password').exec()])
    const allusers = [...Users1, ...Users2]
    if(allusers){
      res.json({success : true, message : allusers})
    }else{
      res.json({success : false, message : "Error fetching users"})
    }
}

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

module.exports = {allUsers, allAdmin, userSearch}