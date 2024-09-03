const router = require('express').Router()

router.post('/stripe/webhook',(req,res,next)=>{
    const event = req.body
    switch (event.type) {
        case 'invoice.created':
            const created = event.data.object
            console.log({created})
            break;
        case 'payment_intent.succeeded':
          const paymentIntent = event.data.object;
          console.log({paymentIntent})
          // Then define and call a method to handle the successful payment intent.
          // handlePaymentIntentSucceeded(paymentIntent);
          break;
        case 'payment_method.attached':
          const paymentMethod = event.data.object;
          console.log({paymentMethod})
          // Then define and call a method to handle the successful attachment of a PaymentMethod.
          // handlePaymentMethodAttached(paymentMethod);
          break;
        case 'invoice.payment_succeeded':
            const succeeded = event.data.object
            console.log({succeeded})
            break;
        case 'invoice.finalized':
                const finalized = event.data.object
                console.log({finalized})
                break;
        default:
            console.log(event.data.object)
          console.log(`Unhandled event type ${event.type}`);
      }
    
      // Return a response to acknowledge receipt of the event
      res.json({received: true});
})

module.exports = router