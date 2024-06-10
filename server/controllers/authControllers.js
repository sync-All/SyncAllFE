const confirmEmail = require('../utils/mailer');
const issueJwt = require('../utils/issueJwt')
const EmailDomain = require('../utils/grabUserEmailDomain')
const bcrypt = require('bcrypt');
const User = require('../models/usermodel');
const Dashboard = require('../models/dashboard.model');

const signup = async function(req, res) {
    const {name, email, password, role, userType} = req.body
    if(!name || !email || !password || !role || !userType){
      if(!name){
        return res.json({success: false , message : "Name Field Missing, please review input"})
      }else if(!email){
        return res.json({success : false, message : "Email Field Missing, please review input"})
      }else if(!password){
        return res.json({success : false, message : "Password Field Missing, please review input"})
      }else if(!role){
        return res.json({success : false, message : "Role Field Missing, please review input"})
      }else if(!userType){
        return res.json({success : false, message : "UserType Field Missing, please review input"})
      }
    }else{
      const getIdentity = await User.findOne({ email : email}).exec()
      if(getIdentity){
        res.json({success: false, message : "Email Already in use"})
      }else{
        bcrypt.hash(password, 10, function(err, password){
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
      res.status(200).json({success : true, user : user, message : 'Welcome back',token : toBeIssuedJwt.token, expires : toBeIssuedJwt.expires})
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

module.exports.signup = signup
module.exports.signin = signin
module.exports.allUsers = allUsers

  