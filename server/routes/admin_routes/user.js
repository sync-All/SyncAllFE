var express = require('express');
const router = express.Router()
const asynchandler = require('express-async-handler');
const kpi = require('../../utils/kpi')
const {checkAdmin} = require('../../utils/AuthenticateChecker')
const userControllers = require('../../controllers/admin/users')
const passport = require('passport');
const { BadRequestError } = require('../../utils/CustomError');

router.get('/get_key_metrics/', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asynchandler(async(req,res,next)=>{
    const filterReq = Number(req.query?.filter)
    if(filterReq  > 0 ){
        const kpiDetails = await kpi(filterReq)
        res.send({kpiDetails})
    }else{
        throw new BadRequestError('Invalid Filter request')
    }
}))

router.get('/allusers',checkAdmin, asynchandler(userControllers.allUsers));

router.get('/userFilter', checkAdmin, asynchandler(userControllers.userFilter))

router.get('/allAdmins',checkAdmin, asynchandler(userControllers.allAdmin))

module.exports = router

