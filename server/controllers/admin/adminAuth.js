const bcrypt = require('bcrypt');
const issueJwt = require('../../utils/issueJwt')
const Admin = require('../../models/usermodel').admin;
const generateTempPassword = require('../../utils/userUtils').generateTempPassword

const admin_signup = async function(req, res) {
  try {
    const {name, email,username, role} = req.body
    const reqCred = ['name', 'email',]
    const bodyKeys = Object.keys(req.body)
    const missingItems = reqCred.filter(item => !bodyKeys.includes(item));
    if(missingItems.length > 0){
      throw new BadRequestError(`Missing Parameter : ${missingItems[0]}`)
    }
    const orQuery = []
    if (email) orQuery.push({email : email.toLowerCase()})
    if(username) orQuery.push({ username: username.toLowerCase()})
    const getAdminIdentity = await Admin.findOne({$or : orQuery}).exec()
    if(getAdminIdentity){
      res.status(401).json({success: false, message : "Email or Username Already in use"})
    }else{
      const password = generateTempPassword()
      
      const hashpw = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
      const admin = new Admin({
        name,
        username : username && username.toLowerCase(),
        email : email && email.toLowerCase(),
        role,
        password : hashpw
      })
      const adminInfo = await admin.save()
      const {token} = issueJwt.issueJwtResetPassword(adminInfo)
      const baseUrl = process.env.NODE_ENV == 'development' ? 'https://sync-all-admin-git-development-sync-alls-projects.vercel.app' : "https://admin.syncallmusic.com"
      const resetLink = `${baseUrl}/reset-password/?token=${token}&email=${adminInfo.email}`
      const emailContent = `
      <p> Dear ${name}</p>
      <br/>
      <div>Your admin account has been created for you! Here are your login details</div>
      <br/>
      <div>Email : ${email}</div>
      <div>Username : ${username || 'N/A'}</div>
      <div>Temporary Password : ${password}</div>
      <div>Role : ${role || "Admin"}</div>
      <br/>
      <div style="font-size: 12px;font-style: italic;">You are advised to kindly make use of this <a href=${resetLink}>Link </a> to reset your password</div>
      <br/>
      <div style="font-size: 12px;font-style: italic;">${process.env.NODE_ENV == 'development' && 'If you are receiving this email, this account was created for development purpose, kindly disregard'}</div>

      `
      await sendUserAnEmail(email,'Account Creation',emailContent)
      res.status(200).json({success : true, message : "Account successfully created"})
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('An Error Occured, Invalid Input')
  }

const admin_signin = async(req,res,next)=>{
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
}



module.exports = {admin_signin, admin_signup}