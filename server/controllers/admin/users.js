const { admin } = require('../../models/usermodel');
const { BadRequestError } = require('../../utils/CustomError');

const User = require('../../models/usermodel').uploader;
const SyncUser = require('../../models/usermodel').syncUser;
const Admin = require('../../models/usermodel').admin

const allUsers = async (req,res,next) =>{
    const [Users1, Users2] = await Promise.all([User.find().select('-password').exec(), SyncUser.find().select('-password').exec()])
    const allusers = [...Users1, ...Users2]
    console.log(allusers)
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

module.exports = {allUsers, allAdmin}