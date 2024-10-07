var express = require('express');
const router = express.Router()
const asynchandler = require('express-async-handler');
const kpi = require('../../utils/kpi')
const userControllers = require('../../controllers/admin/users')
const passport = require('passport');
const { BadRequestError } = require('../../utils/CustomError');

router.get('/get_key_metrics/:filter', passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asynchandler(async(req,res,next)=>{
    const filterReq = req.params.filter
    if(filterReq == "this_month" ||  filterReq == "2_month"){
        const kpiDetails = await kpi(req.params.filter)
        res.send({kpiDetails})
    }else{
        throw new BadRequestError('Invalid Filter request')
    }
}))

router.get('/allusers',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}), asynchandler(userControllers.allUsers));

module.exports = router

