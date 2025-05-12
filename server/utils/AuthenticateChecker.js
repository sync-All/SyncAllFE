const passport = require('passport');
const { unauthorizedError, ForbiddenError, TokenExpiredError } = require('./CustomError');

const checkAdmin = (req,res,next)=>{
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        if(info && info.name == "TokenExpiredError"){
           return next(new TokenExpiredError('Session expired, proceed to login'))
        }
        if(err || !user){
            console.log(err)
            return next(new unauthorizedError('Authentication failed'));
        }
        if (user.role !== 'Admin') {
            return next(new ForbiddenError('Admin access required'));
        }
        req.user = user
        return next();
    })(req,res,next)
}

const allowUnauthentication = (req,res,next)=>{
    req.allowUnauthentication = true
    next()
}

const checkUser = (req,res,next)=>{
    const allowedTypes =  ["Music Uploader", "Sync User"]
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        if(info && info.name == "TokenExpiredError"){
           return next(new TokenExpiredError('Session expired, proceed to login'))
        }
        if(err || !user){
            console.log(err)
            return next(new unauthorizedError('Authentication failed'));
        }
        if (!allowedTypes.includes(user.role)) {
            return next(new ForbiddenError('Attempt Forbidden'));
        }
        req.user = user
        return next();
    })(req,res,next)
}

const checkUploader = (req,res,next)=>{
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        if(info && info.name == "TokenExpiredError"){
           return next(new TokenExpiredError('Session expired, proceed to login'))
        }
        if(err || !user){
            if(req.allowUnauthentication){
                return next()
            }
            return next(new unauthorizedError('Authentication failed'));
        }
        if (user.role !== 'Music Uploader') {
            return next(new ForbiddenError('Attempt Forbidden'));
        }
        req.user = user
        return next();
    })(req,res,next)
}

const checkSyncUser = (req,res,next)=>{
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        if(info && info.name == "TokenExpiredError"){
           return next(new TokenExpiredError('Session expired, proceed to login'))
        }
        if(err || !user){
            if(req.allowUnauthentication){
                return next()
            }
            return next(new unauthorizedError('Authentication failed, not Authorized!'));
        }
        if (user.role !== "Sync User") {
            return next(new ForbiddenError('Attempt Forbidden'));
        }
        req.user = user
        return next();
    })(req,res,next)
}

const checkRoles = (allowedRoles = []) => {
    return (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (info && info.name === 'TokenExpiredError') {
          return next(new TokenExpiredError('Session expired, proceed to login'));
        }
  
        if (err || !user) {
          if (req.allowUnauthentication) {
            return next();
          }
          return next(new unauthorizedError('Authentication failed'))
        }
        const role = user.role;
  
        if (!allowedRoles.includes(role)) {
          return next(new ForbiddenError('Attempt Forbidden'));
        }
  
        req.user = user;
        return next();
      })(req, res, next);
    };
  };
  
module.exports = {checkAdmin, checkUser, checkUploader, checkSyncUser,allowUnauthentication, checkRoles}