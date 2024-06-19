const dashboard = require("../models/dashboard.model")

const dashboardcontrol = async (req,res,next)=>{
        const userId = req.params.userId
        try {
            const userDashboardDetails = await dashboard.findOne({user : userId}).exec()
            res.status(200).json({success : true, dashboardDetails : userDashboardDetails})
        } catch (error) {
            res.status(401).json('User does not exists')
        }

}

module.exports.dashboardcontrol = dashboardcontrol