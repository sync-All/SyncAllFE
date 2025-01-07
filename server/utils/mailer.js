const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const { BadRequestError } = require('./CustomError');
require('dotenv').config()

// Create a transporter

const pathtofile = path.join(__dirname, '..', '/views/quoteRequest.ejs')
const pathtoheaderLogo = path.join(__dirname, '..', '/public/images/headerLogo.png')
const pathtofooterLogo = path.join(__dirname, '..', '/public/images/footerLogo.png')
const pathtoIgLogo = path.join(__dirname, '..', '/public/images/ig.svg')
const pathtoLnLogo = path.join(__dirname, '..', '/public/images/ln.png')
const pathtoXLogo = path.join(__dirname, '..', '/public/images/twitter.png')
const pathtoMessageIcon = path.join(__dirname, '..', '/public/images/message.png')
const pathtoLinkIcon = path.join(__dirname, '..', '/public/images/link.png')
const pathtoCallIcon = path.join(__dirname, '..', '/public/images/call.png')
let envi = process.env.NODE_ENV
 
async function sendConfirmationMail(user, issuedJwt){
  const transporter = nodemailer.createTransport({
    service : "Gmail",
  auth: {
    user: 'info@syncallmusic.com',
    pass: process.env.GMAIL_PASS,
  },
});

const pathtofile = path.join(__dirname, '..', '/views/confirmEmail.ejs')

await ejs.renderFile(pathtofile,{ link : envi == 'development' ? `https://syncall-testserver.onrender.com/verifyEmail/?token=${issuedJwt}` : `https://syncallfe.onrender.com/verifyEmail/?token=${issuedJwt}`}, async (err, renderedHtml) => {
  if (err) {
    console.error('Error rendering EJS template:', err);
    return;
  }

  // Compose email options
  const mainOptions = {
    from: '"Syncall Team"info@syncallmusic.com',
    to: user.email,
    subject: 'Hello, Sync User',
    html: renderedHtml,
    attachments: [{
      filename: 'headerLogo.png',
      path: pathtoheaderLogo,
      cid: 'headerLogo' //same cid value as in the html img src
    },
    {
      filename: 'footerLogo.png',
      path: pathtofooterLogo,
      cid: 'footerLogo' //same cid value as in the html img src
    },
    {
      filename: 'ig.svg',
      path: pathtoIgLogo,
      cid: 'ig' //same cid value as in the html img src
    },
    {
      filename: 'ln.png',
      path: pathtoLnLogo,
      cid: 'ln' //same cid value as in the html img src
    },
    {
      filename: 'twitter.png',
      path: pathtoXLogo,
      cid: 'twitter' //same cid value as in the html img src
    },
    {
      filename: 'message.png',
      path: pathtoMessageIcon,
      cid: 'message' //same cid value as in the html img src
    },
    {
      filename: 'link.png',
      path: pathtoLinkIcon,
      cid: 'link' //same cid value as in the html img src
    },
    {
      filename: 'call.png',
      path: pathtoCallIcon,
      cid: 'call' //same cid value as in the html img src
    },
    ]
  };

  // Send the email
transporter.sendMail(mainOptions,(error, info) => {
    if (error) {
       console.error('Error sending email:', error);
    }
    else{
      console.error('Mail Sent Successfully');
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
ejs.renderFile(pathtofile,{ name: user.name, link :`https://www.syncallmusic.com/requestforgotpw/?token=${issuedJwt}&email=${user.email}`}, (err, renderedHtml) => {
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

function informQuoteRequest(email, name){
  const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth: {
      user: 'info@syncallmusic.com',
      pass: process.env.GMAIL_PASS,
    },
  });



  ejs.renderFile(pathtofile,{ title : "Your Quote request", user : {name}}, (err, renderedHtml) => {
    if (err) {
      console.error('Error rendering EJS template:', err);
      return;
    }

    // Compose email options
    const mainOptions = {
      from: '"Ezekiel"info@syncallmusic.com',
      to: email,
      subject: 'Quote Request',
      html: renderedHtml,
      attachments: [{
        filename: 'headerLogo.png',
        path: pathtoheaderLogo,
        cid: 'headerLogo' //same cid value as in the html img src
      },
      {
        filename: 'footerLogo.png',
        path: pathtofooterLogo,
        cid: 'footerLogo' //same cid value as in the html img src
      },
      {
        filename: 'fb.png',
        path: pathtoFbLogo,
        cid: 'fb' //same cid value as in the html img src
      },
      {
        filename: 'ln.png',
        path: pathtoLnLogo,
        cid: 'ln' //same cid value as in the html img src
      },
      {
        filename: 'twitter.png',
        path: pathtoXLogo,
        cid: 'twitter' //same cid value as in the html img src
      },
      {
        filename: 'message.png',
        path: pathtoMessageIcon,
        cid: 'message' //same cid value as in the html img src
      },
      {
        filename: 'link.png',
        path: pathtoLinkIcon,
        cid: 'link' //same cid value as in the html img src
      },
      {
        filename: 'call.png',
        path: pathtoCallIcon,
        cid: 'call' //same cid value as in the html img src
      },
      ]
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

function additionalDocRequest(email, name,ticketId){
  const transporter = nodemailer.createTransport({
    service : "Gmail",
    auth: {
      user: 'info@syncallmusic.com',
      pass: process.env.GMAIL_PASS,
    },
  });

  const pathToEjsTemp = path.join(__dirname, '..', '/views/reqAddtionalDoc.ejs')
  ejs.renderFile(pathToEjsTemp,{name,ticketId}, (err, renderedHtml) => {
    if (err) {
      console.error('Error rendering EJS template:', err);
      throw new BadRequestError('Error rendering EJS template')
    }

    // Compose email options
    const mainOptions = {
      from: '"Team Syncall"info@syncallmusic.com',
      to: email,
      subject: 'Additional Document Request',
      html: renderedHtml,
    };

    // Send the email
    transporter.sendMail(mainOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        throw new BadRequestError('Error sending email:')
      } else {
        console.log('Email sent successfully!');
      }
    });
  });
}


module.exports = {sendConfirmationMail, requestForgotPassword, informQuoteRequest,additionalDocRequest}