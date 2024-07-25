const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path')
require('dotenv').config()

// Create a transporter

function sendConfirmationMail(user, issuedJwt){
  const transporter = nodemailer.createTransport({
    service : "Gmail",
  auth: {
    user: 'info@syncallmusic.com',
    pass: process.env.GMAIL_PASS,
  },
});

const pathtofile = path.join(__dirname, '..', '/views/confirmEmail.ejs')

console.log(pathtofile)
ejs.renderFile(pathtofile,{ name: user.name, link :`https://syncallfe.onrender.com/verifyEmail/?token=${issuedJwt}`}, (err, renderedHtml) => {
  if (err) {
    console.error('Error rendering EJS template:', err);
    return;
  }

  // Compose email options
  const mainOptions = {
    from: '"Ezekiel"info@syncallmusic.com',
    to: user.email,
    subject: 'Hello, Sync USer',
    html: renderedHtml,
  };

  // Send the email
  transporter.sendMail(mainOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully!');
    }
  });
});
}

function requestForgotPassword(user, issuedJwt){
  const transporter = nodemailer.createTransport({
    service : "Gmail",
  auth: {
    user: 'info@syncallmusic.com',
    pass: process.env.GMAIL_PASS,
  },
});

const pathtofile = path.join(__dirname, '..', '/views/forgotPassword.ejs')

console.log(pathtofile)
ejs.renderFile(pathtofile,{ name: user.name, link :`https://sync-all-fe-1brn.vercel.app/requestforgotpw/?token=${issuedJwt}&email=${user.email}`}, (err, renderedHtml) => {
  if (err) {
    console.error('Error rendering EJS template:', err);
    return;
  }

  // Compose email options
  const mainOptions = {
    from: '"Ezekiel"info@syncallmusic.com',
    to: user.email,
    subject: 'Forgot Password',
    html: renderedHtml,
  };

  // Send the email
  transporter.sendMail(mainOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent successfully!');
    }
  });
});
}

module.exports.sendConfirmationMail = sendConfirmationMail
module.exports.requestForgotPassword = requestForgotPassword