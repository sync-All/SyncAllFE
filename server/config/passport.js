const User = require('../models/usermodel')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY

const options = {
    jwtFromRequest : extractJwt.fromExtractors([extractJwt.fromUrlQueryParameter('token'),extractJwt.fromAuthHeaderAsBearerToken()]),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};


const strategy = new jwtStrategy(options, (payload, done)=>{
    console.log('here')
    User.findOne({_id : payload.sub})
    .then((user)=>{
        if(user){
            return done(null, user)
        }else{
            console.log('here i am')
            return done(null, false)
        }
    })
    .catch((err)=>{
        console.log('here i am')
        return done(null, false)
    })
})

module.exports = (passport)=>{
    passport.use(strategy)
}