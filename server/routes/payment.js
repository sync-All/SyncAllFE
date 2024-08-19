const router = require('express').Router()
const passport = require('passport');
const asyncHandler = require('express-async-handler')
require('dotenv').config()
const stripe = require('stripe')('sk_test_51PaF3cG5Wy2cNC8ZEcqtEKUu7OIkKdXKN8K28YdgdMDdnVgOmv6Vfl4MnT6Pyj4nRucttajEBBxBVnC4JYSw1QNZ00ICxEVTpC')

router.get('/create-subcription',passport.authenticate('jwt',{session : false, failureRedirect : '/unauthorized'}),asyncHandler(async(req,res,next)=>{
    const {prodId} = req.query
    const customerId = req.user._id
    try {
        const subscription = await stripe.subscriptions.create({
            customer : `${customerId}`,
            items : [
                {
                    priceId : 'price_1Pdf7rG5Wy2cNC8Z7cRKZQqB'
                }
            ],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
        })
        console.log(subscription)
        res.send({prodId, customerId, subscription})
    } catch (error) {
        console.log(error)
    }
    
}))

module.exports = router