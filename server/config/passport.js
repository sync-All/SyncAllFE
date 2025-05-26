const { getUserInfo } = require('../controllers/userControllers')

const User = require('../models/usermodel').uploader
const SyncUser = require('../models/usermodel').syncUser
const Admin = require('../models/usermodel').admin
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
require("dotenv").config()

const pubKey = process.env.PUB_KEY
const cookieExtractor = (req) => {
  return req.signedCookies.sync_token || null;
}

const options = {
    jwtFromRequest : extractJwt.fromExtractors([cookieExtractor,extractJwt.fromUrlQueryParameter('token'),
    extractJwt.fromAuthHeaderAsBearerToken(),]),
    secretOrKey : pubKey,
    algorithms : ['RS256']
};

const resetJwtOptions = {
    jwtFromRequest: extractJwt.fromExtractors([
      extractJwt.fromUrlQueryParameter('token'),
      extractJwt.fromAuthHeaderAsBearerToken(),
    ]),
    secretOrKey: pubKey,
    algorithms: ['RS256'],
  };


const strategy = new jwtStrategy(options, async (payload, done)=>{
  let item = null
  try {
  if(payload.purpose && payload.purpose ==  'reset'){
    return done(null, item)
  }
  if(payload.kid && payload.kid == "admin"){
    item = await Admin.findById(payload.sub).exec()
  }else{
    item = await getUserInfo({_id : payload.sub})  
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

const resetStrategy = new jwtStrategy(resetJwtOptions, async (payload, done) => {
  try {
    if (!payload.purpose || payload.purpose !== 'reset') {
      return done(null, false); // not a reset token
    }
    const user = await getUserInfo({_id : payload.sub})
    return user ? done(null, user) : done(null, false);
  } catch (err) {
    return done(err, false);
  }
});
  

module.exports = (passport)=>{
  passport.use(strategy)
  passport.use('jwt-reset',resetStrategy)
}