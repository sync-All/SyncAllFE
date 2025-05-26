const UAParser = require('ua-parser-js');
const userDeviceInfo = (req)=>{
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const uaString = req.headers['user-agent'];
    const parser = new UAParser();
    const ua = parser.setUA(uaString).getResult();

    return {
        ip, device : ua.device.type || 'Desktop', browser : ua.browser.name
    }
}

module.exports = {userDeviceInfo}