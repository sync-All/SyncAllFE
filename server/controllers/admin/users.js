const User = require('../../models/usermodel').uploader;
const SyncUser = require('../../models/usermodel').syncUser;

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

module.exports = {allUsers}