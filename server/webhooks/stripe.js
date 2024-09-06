const router = require('express').Router()
const SyncUser = require('../models/usermodel').syncUser
router.post('/stripe/webhook',async (req,res,next)=>{
    const event = req.body
    switch (event.type) {
        case 'customer.subscription.created':
            const subscription_created = event.data.object
            console.log({subscription_created})
            break;
        case 'customer.subscription.updated':
            const subscription_updated = event.data.object
            console.log({subscription_updated})
            const syncuserDetails = await SyncUser.findOne({stripeCusId : subscription_updated.customer})
            if(!syncuserDetails.billing || syncuserDetails.billing.subscription_id == subscription_updated.id || (syncuserDetails.billing.prod_id != subscription_updated.plan.product && subscription_updated.status == "active")){
                if(syncuserDetails.billing.prod_id != subscription_updated.plan.product && subscription_updated.status == "active"){
                    await stripe.subscriptions.cancel(
                        syncuserDetails.billing.subscription_id
                      );
                }
                const newInfo = await SyncUser.findOneAndUpdate({stripeCusId : subscription_updated.customer}, {'$set' : {
                        'billing.prod_id' : subscription_updated.plan.product,
                        'billing.subscription_id' : subscription_updated.id,
                        'billing.subscription_status' : subscription_updated.status,
                        'billing.frequency' : subscription_updated.plan.interval,
                        'billing.amount' :  (subscription_updated.plan.amount / 100),
                        'billing.next_billing_date' : new Date(subscription_updated.current_period_end * 1000).toLocaleString('en-US')
                }}, {new : true})
                console.log({sub_update : newInfo})
            }
            
            break;
        case 'customer.subscription.deleted':
            const subscription_deleted = event.data.object
            console.log({subscription_deleted})
            break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          console.log({paymentMethod})
          const newInfo = await SyncUser.findOneAndUpdate({stripeCusId : paymentMethod.customer}, {'$set' : {
                'billing.last4card_digits' : paymentMethod.card.last4,
                'billing.card_brand' : paymentMethod.card.brand
        }},{new : true})
        console.log(newInfo)
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
      }
    
      // Return a response to acknowledge receipt of the event
      res.json({received: true});
})

module.exports = router