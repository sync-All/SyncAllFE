const passport = require('passport');
const { unauthorizedError, ForbiddenError, TokenExpiredError } = require('./CustomError');

const checkAdmin = (req,res,next)=>{
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        console.log({info})
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
        return next();
    })(req,res,next)
}

const checkUser = (req,res,next)=>{
    passport.authenticate('jwt',{session : false},(err,user,info)=>{
        console.log({info})
        if(info && info.name == "TokenExpiredError"){
           return next(new TokenExpiredError('Session expired, proceed to login'))
        }
        if(err || !user){
            console.log(err)
            return next(new unauthorizedError('Authentication failed'));
        }
        if (user.role !== 'Music Uploader' || user.role !== "Sync User") {
            return next(new ForbiddenError('Attempt Forbidden'));
        }
        return next();
    })(req,res,next)
}

module.exports = {checkAdmin, checkUser}