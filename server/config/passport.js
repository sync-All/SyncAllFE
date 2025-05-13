const User = require('../models/usermodel').uploader
const SyncUser = require('../models/usermodel').syncUser
const Admin = require('../models/usermodel').admin
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY
const cookieExtractor = (req) => {
    console.log(req.signedCookies.sync_token)
    return req.signedCookies.sync_token || null;
}

const options = {
    jwtFromRequest : extractJwt.fromExtractors([extractJwt.fromUrlQueryParameter('token'),extractJwt.fromAuthHeaderAsBearerToken(),cookieExtractor]),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};


const strategy = new jwtStrategy(options, async (payload, done)=>{
    let admin, uploader, syncUser = {}
    let item = {}
   try {
    if(payload.kid && payload.kid == "admin"){
        admin = await Admin.findById(payload.sub).exec()
        item = admin
    }else{
        uploader = await User.findOne({_id : payload.sub}).exec()
        syncUser = await SyncUser.findOne({_id : payload.sub}).exec()
        item = uploader || syncUser
        
    }
    if(item) {
        return done(null, item)
    }else {
        return done(null, false)
    }
   } catch (error) {    
    return done(error, false)
   }
})

module.exports = (passport)=>{
    passport.use(strategy)
}