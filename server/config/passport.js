const User = require('../models/usermodel')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY

const options = {
    jwtFromRequest : extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};

const options2 = {
    jwtFromRequest : extractJwt.fromUrlQueryParameter('token'),
    secretOrKey : pubKey,
    algorithms : ['RS256']
}

const strategy = new jwtStrategy(options, (payload, done)=>{
    User.findOne({_id : payload.sub})
    .then((user)=>{
        if(user){
            return done(null, user)
        }else{
            return done(null, false)
        }
    })
    .catch((err)=>{
        return done(err, false)
    })
})

module.exports = (passport)=>{
    passport.use(strategy)
}