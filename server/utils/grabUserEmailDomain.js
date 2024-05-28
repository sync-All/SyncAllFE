function grabEmailDomain(user){
    // get user email domain from string
    const emailDomain = user.email.split('@')[1]
    switch (emailDomain){
        case 'gmail.com':
            return "https://mail.google.com";
        case 'outlook.com' || 'hotmail.com' || 'live.com':
            return "https://outlook.live.com/";
        case 'yahoo.com':
            return  'https://mail.yahoo.com/';
        case 'icloud.com':
            return 'https://www.icloud.com/mail';
        case 'aol.com':
            return 'https://mail.aol.com/';
        default:
            return 'https://www.google.com/search?q=login+to+email'; 

    }
}

module.exports.grabEmailDomain = grabEmailDomain