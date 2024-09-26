var express = require('express');
const router = express.Router()
const asynchandler = require('express-async-handler');
const Admin = require('../../models/usermodel').admin;
const bcrypt = require('bcrypt');
const issueJwt = require('../../utils/issueJwt')
const passport = require('passport');
require('dotenv').config()

// router.post('/admin_signup', asynchandler(async function(req, res) {
//     const {name, email, password} = req.body
//     if(!name || !email || !password){
//       if(!name){
//         return res.status(401).json({success: false , message : "Name Field Missing, please review input"})
//       }else if(!email){
//         return res.status(401).json({success : false, message : "Email Field Missing, please review input"})
//       }else if(!password){
//         return res.status(401).json({success : false, message : "Password Field Missing, please review input"})
//       }
//     }else{
//       const getAdminIdentity = await Admin.findOne({ email : email.toLowerCase()}).exec()
//       if(getAdminIdentity){
//         res.status(401).json({success: false, message : "Email Already in use"})
//       }else{
//           bcrypt.hash(password, Number(process.env.SALT_ROUNDS), function(err, password){
//             const admin = new Admin({
//               name,
//               email : email.toLowerCase(),
//               password,
//             })
//             admin.save()
//             .then(async ()=> {
//                 res.status(200).json({success : true, message : "Account successfully created"})
//             })
//             .catch(err => {
//               console.log(err)
//               res.status(400).send('An Error Occured, Invalid Input')
//             })
//           })
//         } 
//     }
//   }));

router.post('/admin_signin', asynchandler(async(req,res,next)=>{
    const {email,password} = req.body
    const admin = await Admin.findOne({email : email.toLowerCase()}).exec()
    if(!admin){
      return res.status(401).json({success : false, message : "Invalid Credentials"})
    }
    const match = await bcrypt.compare(password, admin.password);

    if(!match){
      return res.status(401).json({success : false, message : "Incorrect Password, Please check again and retry"})
    }else{
      const toBeIssuedJwt = issueJwt.issueJwtAdminLogin(admin)
      const adminDetails = await Admin.findOne({email : email.toLowerCase()}).select('-password').exec()
      res.status(200).json({success : true, user : adminDetails, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
    }
}));



module.exports = router