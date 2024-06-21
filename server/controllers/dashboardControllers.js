const dashboard = require("../models/dashboard.model")
const bcrypt = require('bcrypt')
const User = require("../models/usermodel")
require('dotenv').config()

const dashboardcontrol = async (req,res,next)=>{
        const userId = req.params.userId
        try {
            if(req.user.role == "Music Uploader"){
                const userDashboardDetails = await dashboard.findOne({user : userId}).exec()
                const profileInfo = await User.findById(userId)
            res.status(200).json({success : true, dashboardDetails : userDashboardDetails,profileInfo})
            }else{
                res.status(401).json('Unauthorized access')
            }
        } catch (error) {
            res.status(401).json('User does not exists')
        }

}

const passwordreset = async (req,res,next)=>{
    try {
        if(req.user.role == "Music Uploader"){
        const userId = req.params.userId
        const {oldPassword, newPassword} = req.body
        const userInfo = await User.findById(userId).exec()
        const match = await bcrypt.compare(oldPassword, userInfo.password)
        if(!match){
            res.status(401).json('Password Incorrect')
        }else{
            bcrypt.hash(newPassword,Number(process.env.SALT_ROUNDS), async(error, hashPw)=>{
                await User.findByIdAndUpdate(userId, {password : hashPw}, {new : true})

                res.status(200).json({success : true, message : 'Password Successfully Updated'})
            })
        }
        }else{
            res.status(401).json('Unauthorized Access')
        }

    } catch (error) {
        res.status(404).json('User not Found')
    }
}

module.exports = {dashboardcontrol, passwordreset}