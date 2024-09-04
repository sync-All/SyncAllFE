const router = require('express').Router()
const passport = require('passport');
const asyncHandler = require('express-async-handler')
const stripeApi = require('../utils/stripeApi')
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_TESTSECRET_KEY)

router.post('/create-subscription',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(async(req,res,next)=>{
    const {priceId} = req.body
    const userInfo = req.user
    try {
        const customerId = await stripeApi.createNewStripeCus(userInfo)
        await stripe.subscriptions.create({
            customer : customerId,
            items : [
                {
                    price : priceId
                }
            ],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        })
        res.send({priceId, customerId, subscription})
    } catch (error) {
        console.log(error)
    }
}))

module.exports = router