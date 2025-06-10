const UAParser = require('ua-parser-js');
const userDeviceInfo = (req)=>{
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : req.ip;
    const uaString = req.headers['user-agent'];
    const parser = new UAParser();
    const ua = parser.setUA(uaString).getResult();

    return {
        ip, device : ua.device.type || 'Desktop', browser : ua.browser.name
    }
}

module.exports = {userDeviceInfo}