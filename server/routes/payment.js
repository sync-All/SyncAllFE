const router = require('express').Router()
const passport = require('passport');
const asyncHandler = require('express-async-handler')
const axios = require('axios')
require('dotenv').config()

const pk_path = process.env.PK_ROOT_PATH
const pk_sk = process.env.PK_SK

router.post('/initialize_payment',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(async(req,res,next)=>{
    const {planInfo} = req.body
    const userInfo = req.user
    try {
        const response = await axios.post(`https://${pk_path}/transaction/initialize`,{email : userInfo.email, plan : planInfo, amount : "35000"}, {
            headers : {
                Authorization : `Bearer ${pk_sk}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        res.send(response.data)
    } catch (error) {
        res.status(422).send('An error occured, kindly inform the dev team',error)
        console.log(error)
    }
}))

router.post('/transaction_status',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(async(req,res,next)=>{
    try {
        const {trxref} = req.body
        const response = await axios.get(`https://${pk_path}/transaction/verify/:${trxref}`, {
            headers : {
                Authorization : `Bearer ${pk_sk}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        res.send(response.data)
    } catch (error) {
        res.status(422).send('An error occured, kindly inform the dev team',error)
        console.log(error)
    }
}))

module.exports = router