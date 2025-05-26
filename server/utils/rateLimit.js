const rateLimit = require('express-rate-limit');
const { userDeviceInfo } = require('./DeviceInfo');
const { getUserInfo } = require('../controllers/userControllers');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: async(req, res, next,) => {
    // 🔔 Custom function: Notify user or admin
    const userInfo = await getUserInfo({email : req.body.email})
    if(userInfo){
      const deviceInfo = userDeviceInfo(req)

      const emailContent = `
      <p> Dear user</p>
      <br/>
      <div>We noticed a recent sign-in attempt to your Syncall account</div>
      <br/>
      <br/>
      <div>-Time : ${email}</div>
      <div>-IP Address : ${deviceInfo.ip}</div>
      <div>-Browser : ${deviceInfo.browser}</div>
      <div>If this was you, you can ignore this message.</div>
      <br/>
      <br/>
      <div>If not, we recommend you:</div>
      <div>- Change your password immediately</div>
      <br/>
      <div style="font-size: 12px;font-style: italic;">${process.env.NODE_ENV == 'development' && 'If you are receiving this email, this was sent for development purpose, kindly disregard'}</div>

      `
      await sendUserAnEmail(userInfo.email,'Account Sign-In Attempt',emailContent)
    }
    

    // Response to user
    res.status(429).json({
      error: 'Too many login attempts. Please try again after 15 minutes.',
    });
  }
});

module.exports = {loginLimiter}
