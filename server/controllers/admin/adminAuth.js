const bcrypt = require('bcrypt');
const issueJwt = require('../../utils/issueJwt');
const { sendUserAnEmail } = require('../../utils/mailer');
const Admin = require('../../models/usermodel').admin;

const admin_signup = async function(req, res) {
  try {
    const {name, email,username, password, role} = req.body
    const reqCred = ['name', 'email', 'password']
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
      res.status(401).json({success: false, message : "Email Already in use"})
    }else{
      const hashpw = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS))
      const admin = new Admin({
        name,
        username : username && username.toLowerCase(),
        email : email && email.toLowerCase(),
        role,
        password : hashpw
      })
      console.log(admin)
      admin.save()
      const emailContent = `
      <p> Dear ${name}</p>
      <br/>
      <div>Your admin account has been created for you! Here are your login details</div>
      <br/>
      <div>Email : ${email}</div>
      <div>Username : ${username || 'N/A'}</div>
      <div>Password : ${password}</div>
      <div>Role : ${role || "Admin"}</div>
      <br/>
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
}

const admin_signin = async(req,res,next)=>{
  const {email,password} = req.body
  const admin = await Admin.findOne({$or : [
  {email : email.toLowerCase()},
  { username: email.toLowerCase()}
  ]}).exec()
  if(!admin){
    return res.status(401).json({success : false, message : "Invalid Credentials"})
  }
  const match = await bcrypt.compare(password, admin.password);

  if(!match){
    return res.status(401).json({success : false, message : "Incorrect Password, Please check again and retry"})
  }else{
    // res.clearCookie("sync_token", { path: '/', httpOnly: true, signed: true, sameSite: isProduction ? 'None' : 'Lax', secure: true });
    const toBeIssuedJwt = issueJwt.issueJwtAdminLogin(admin)
    const details = admin.toObject()
    delete details.password

    console.log(req.secure)

    res.cookie('sync_token', toBeIssuedJwt.token, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      signed : true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({success : true, user : details, message : 'Welcome back'})
  }
}




module.exports = {admin_signin, admin_signup}