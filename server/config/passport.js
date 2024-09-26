const User = require('../models/usermodel').uploader
const SyncUser = require('../models/usermodel').syncUser
const Admin = require('../models/usermodel').admin
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY

const options = {
    jwtFromRequest : extractJwt.fromExtractors([extractJwt.fromUrlQueryParameter('token'),extractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};


const strategy = new jwtStrategy(options, async (payload, done)=>{
    let admin, uploader, syncUser = {}
    if(payload.kid && payload.kid == "admin"){
        admin = await Admin.findOne({_id : payload.sub})
    }else{
        uploader = await User.findOne({_id : payload.sub}).exec()
        syncUser = await SyncUser.findOne({_id : payload.sub})
    }
    const item = uploader || syncUser || admin

    if(item) {
        return done(null, item)
    }else {
        return done(null, false)
    }
})

module.exports = (passport)=>{
    passport.use(strategy)
}