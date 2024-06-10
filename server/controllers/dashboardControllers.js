const dashboard = require("../models/dashboard.model")
const passport = require('passport')

const dashboardcontrol = async (req,res,next)=>{
    if(req.isAuthenticated){
        const userId = req.params.userId
        const userDashboardDetails = await dashboard.findOne({user : userId}).exec()
        if(userDashboardDetails){
            res.status(200).json({success : true, dashboardDetails : userDashboardDetails})
        }else{
            res.status(401).json({success : false, message : "An error occured please proceed to sign up"})
        }
    }else{
        res.status(401).json({success : false, message : "Unauthorized please proceed to sign in"})
    }
}

module.exports.dashboardcontrol = dashboardcontrol