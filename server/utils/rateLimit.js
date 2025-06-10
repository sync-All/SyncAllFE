const rateLimit = require('express-rate-limit');
const { userDeviceInfo } = require('./DeviceInfo');
const { getUserInfo } = require('../controllers/userControllers');
const { sendUserAnEmail } = require('./mailer');
const { TooManyRequestError } = require('./CustomError');
const { issueJwtResetPassword } = require('./issueJwt');

const notifiedUsers = new Map(); 

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 4,
  message: 'Too many login attempts. Please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
  handler: async(req, res, next,) => {
    // 🔔 Custom function: Notify user or admin
    const userInfo = await getUserInfo({email : req.body.email})

    if(userInfo){
      if (!notifiedUsers.has(userInfo.email)) {
        const deviceInfo = userDeviceInfo(req)

        const now = new Date(Date.now());

        const date = now.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          timeZone: 'UTC'
        });

        const time = now.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
          timeZone: 'UTC',
          timeZoneName: 'short'
        });

        const formattedDate = `${date} – ${time}`;

        const resetJwt = issueJwtResetPassword(userInfo)
        
        const resetLink = `https://www.syncallmusic.com/requestforgotpw/?token=${resetJwt.token}&email=${userInfo.email}`

        const emailContent = `
        <p> Dear user</p>
        <br/>
        <div>We noticed a recent sign-in attempt to your Syncall account</div>
        <br/>
        <div style="font-weight: 600;"> - Time : ${formattedDate}</div>
        <div style="font-weight: 600;"> - IP Address : ${deviceInfo.ip}</div>
        <div style="font-weight: 600;"> - Browser : ${deviceInfo.browser || "N/A"}</div>
        <div>If this was you, you can ignore this message.</div>
        <br/>
        <div>If not, we recommend you:</div>
        <div> - Change your password immediately via this <a href=${resetLink} target='_blank'>Link</a></div>
        <br/>
        <div style="font-size: 12px;font-style: italic;">${process.env.NODE_ENV == 'development' && 'If you are receiving this email, this was sent for development purpose, kindly disregard'}</div>
        `
        await sendUserAnEmail(userInfo.email,'Account Sign-In Attempt',emailContent)
        // Store with expiry timer
        notifiedUsers.set(userInfo.email, true);
        setTimeout(() => {
          notifiedUsers.delete(userInfo.email); // Clear after windowMs
        }, 15 * 60 * 1000);
      }
    }
    

    // Response to user
    next(new TooManyRequestError('Too many login attempts. Please try again after 15 minutes.'))
  }
});

module.exports = {loginLimiter}
