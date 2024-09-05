import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
import { toast } from 'react-toastify';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const handleSubmit = async (event: FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const result = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: "https://www.syncallmusic.com/payment/status",
          },
        });
    
        if (result.error) {
          // Show error to your customer (for example, payment details incomplete)
          console.log(result.error.message);
          toast.error(result.error.message)
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
        }
      };
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <form className='w-[90%] max-w-[650px] ' onSubmit={handleSubmit}>
            <PaymentElement />
            <div className='flex items-center justify-center'>
              
            {stripe && elements && <button className='my-6' disabled={!stripe}>Submit</button>}
            </div>
        </form>
    </div>
  )
}

export default CheckoutForm
