const { v4: uuidv4 } = require('uuid');

function grabEmailDomain(user){
    // get user email domain from string
    const emailDomain = user.email.split('@')[1]
    switch (emailDomain){
        case 'gmail.com':
            return {
                link : "https://mail.google.com",
                userType : "Individual"
            };
        case 'outlook.com' || 'hotmail.com' || 'live.com':
            return {
                link : "https://outlook.live.com/",
                userType : "Individual"
            };
        case 'yahoo.com':
            return  {
                link :'https://mail.yahoo.com/',
                userType : "Individual"
            };
        case 'icloud.com':
            return {
                link : 'https://www.icloud.com/mail',
                userType : "Individual"
            };
        case 'aol.com':
            return {
                link : 'https://mail.aol.com/',
                userType : "Individual"
            };
        default:
            return {
                link : 'https://www.google.com/search?q=login+to+email',
                userType : "Company"
            }; 

    }
}


function generateTempPassword() {
  return uuidv4().slice(0, 12); 
}

function camelCaseToNormal(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase words
    .replace(/^./, match => match.toUpperCase()); // Capitalize first character
}


module.exports = {grabEmailDomain,generateTempPassword,camelCaseToNormal}