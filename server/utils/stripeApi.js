require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_TESTSECRET_KEY)
const Uploader = require('../models/usermodel').uploader
const SyncUser = require('../models/usermodel').uploader


const createNewStripeCus = async ( userInfo )=>{
    try {
        if(userInfo.stripeCusId){
            return userInfo.stripeCusId;
        }
        const stripeResponse = await stripe.customers.create({
            name : userInfo.name,
            email : userInfo.email,
        })
        if(userInfo.role == "Music Uploader"){
            await Uploader.findOneAndUpdate(userInfo._id, {stripeCusId : stripeResponse.id})
        }else if(userInfo.role == "Sync User"){
            await SyncUser.findOneAndUpdate(userInfo._id, {stripeCusId : stripeResponse.id})
        }
        return stripeResponse.id
    } catch (error) {
        console.log(error)
    }
}

module.exports = {createNewStripeCus}