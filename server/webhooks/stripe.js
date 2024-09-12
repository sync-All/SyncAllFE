const router = require('express').Router()
const SyncUser = require('../models/usermodel').syncUser
const axios = require('axios')
const { syncUser } = require('../models/usermodel')
const Flutterwave = require('flutterwave-node-v3');
require('dotenv').config()
const flw = new Flutterwave(process.env.FLW_PK, process.env.FLW_SK);

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
                if(syncuserDetails.billing.prod_id != subscription_updated.plan.product && subscription_updated.status == "active" && syncuserDetails.billing.prod_id !== 'prod_QnB1PkDeRHAGSx'){
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


// {
//     id: 6605515,
//     txRef: 'tx_ref_1726097269651',
//     flwRef: 'FLW-MOCK-b537994432cec1ed6cdb05e270dd5d38',
//     orderRef: 'URF_1726097328390_84235',
//     paymentPlan: 68767,
//     paymentPage: null,
//     createdAt: '2024-09-11T23:28:49.000Z',
//     amount: 20,
//     charged_amount: 20,
//     status: 'successful',
//     IP: '54.75.161.64',
//     currency: 'USD',
//     appfee: 0.76,
//     merchantfee: 0,
//     merchantbearsfee: 1,
//     charge_type: 'normal',
//     customer: {
//       id: 2492411,
//       phone: 'N/A',
//       fullName: 'Oladimeji Momoh',
//       customertoken: null,
//       email: 'momoh.oladimeji@gmail.com',
//       createdAt: '2024-09-11T21:50:32.000Z',        
//       updatedAt: '2024-09-11T21:50:32.000Z',        
//       deletedAt: null,
//       AccountId: 2537141
//     },
//     entity: {
//       card6: '418742',
//       card_last4: '4246',
//       card_country_iso: 'NG',
//       createdAt: '2020-06-14T14:29:30.000Z'
//     },
//     'event.type': 'CARD_TRANSACTION'
//   }

router.post('/fl_webhook', async(req,res,next)=>{
    try {
        const secretHash = process.env.FLW_SH;
        const signature = req.headers["verif-hash"];
        if (!signature || (signature !== secretHash)) {
            // This request isn't from Flutterwave; discard
            res.status(401).end();
        }
        const payload = req.body;
        // It's a good idea to log all received events.
        console.log(payload);
        res.status(200).end()
        switch(payload['event.type']){
            case 'CARD_TRANSACTION':
                if(payload.status == "successful"){
                    const cusDetails = await syncUser.findOne({email : payload.customer.email}).exec()
                    if(cusDetails.billing.sub_id){
                        await cancelSub(cusDetails.billing.sub_id)
                    }
                    const new_sub_id = await grabSubId(payload.customer.email)
                    await syncUser.findOneAndUpdate({email : payload.customer.email}, {
                        '$set' : {
                            'billing.prod_id' : payload.paymentPlan,
                            'billing.sub_id' : new_sub_id,
                            'billing.sub_status' : payload.status,
                            'billing.frequency' : 'Monthly',
                            'billing.next_billing_date' : expiryDOS(payload.createdAt),
                            'billing.amount' : payload.amount,
                            'billing.last4card_digits' : payload.entity.card_last4,
                        }
                    })

                }

        }
        // Do something (that doesn't take too long) with the payload
        
    } catch (error) {
        console.log(error)
    }
})



async function grabSubId(userEmail){

    const response = await axios.get(`https://api.flutterwave.com/v3/subscriptions/?email=${userEmail}&status=active`, {
        headers: {
            Authorization: `Bearer ${process.env.FLW_SK}`
        },
    })
    return response.data.data[0].id
    
}


async function cancelSub(sub_id){
   try {
    const payload = {"id": `${sub_id}`};
    const response = await flw.Subscription.cancel(payload)
    console.log(response)
   } catch (error) {
    console.log(error)
   }
    return ;
}

function expiryDOS(DOS){
    const date = new Date(DOS).getTime()
    const expirydate = date + 2592000000
    return expirydate
}

module.exports = router