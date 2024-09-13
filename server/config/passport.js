const User = require('../models/usermodel').uploader
const SyncUser = require('../models/usermodel').syncUser
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY

const options = {
    jwtFromRequest : extractJwt.fromExtractors([extractJwt.fromUrlQueryParameter('token'),extractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};


const strategy = new jwtStrategy(options, async (payload, done)=>{e
    const uploader = await User.findOne({_id : payload.sub}).exec()
    const syncUser = await SyncUser.findOne({_id : payload.sub})
    const item = uploader || syncUser

    if(item) {
        return done(null, item)
    }else {
        return done(null, false)
    }
})

module.exports = (passport)=>{
    passport.use(strategy)
}