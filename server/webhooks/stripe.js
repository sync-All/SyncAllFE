const router = require('express').Router()
const SyncUser = require('../models/usermodel').syncUser
router.post('/stripe/webhook',async (req,res,next)=>{
    const event = req.body
    switch (event.type) {
        case 'customer.subscription.created':
            const subscription_created = event.data.object
            console.log({subscription_created})
            await SyncUser.findOneAndUpdate({stripeCusId : subscription_created.customer}, {'$set' : {
                'billing' : {
                    prod_id : subscription_created.plan.product,
                    subscription_id : subscription_created.id,
                    subscription_status : subscription_created.status,
                    frequency : subscription_created.plan.interval,
                }
            }})
            break;
        case 'customer.subscription.updated':
            const subscription_updated = event.data.object
            console.log({subscription_updated})
            await SyncUser.findOneAndUpdate({stripeCusId : subscription_updated.customer}, {'$set' : {
                'billing' : {
                    prod_id : subscription_updated.plan.product,
                    subscription_id : subscription_updated.id,
                    subscription_status : subscription_updated.status,
                    frequency : subscription_updated.plan.interval,
                    amount :  (subscription_updated.plan.amount / 100),
                    next_billing_date : new Date(subscription_updated.current_period_end * 1000).toLocaleString('en-US')
                }
            }})
            break;
        case 'customer.subscription.deleted':
            const subscription_deleted = event.data.object
            console.log({subscription_deleted})
            break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          console.log('payeer')
          console.log({paymentMethod})
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
      }
    
      // Return a response to acknowledge receipt of the event
      res.json({received: true});
})

module.exports = router