import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from "../components/Stripe/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPEPK_TEST_KEY);


const Payment = () => {
    const {priceId} = useParams()
    const token = localStorage.getItem('token')
    const [clientSec, setClientSec] = useState('')
    useEffect(()=>{
      const fetchInitialStripeInfo = async()=>{
        const stripeRes = await axios.post(
          `https://syncallfe.onrender.com/api/v1/create-subscription/`,
          { priceId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setClientSec(stripeRes.data.subscription.latest_invoice.payment_intent.client_secret)
      }
      fetchInitialStripeInfo()
    },[priceId,token])
    const options = {
      clientSecret: clientSec,
      theme : 'stripe'
    };
  return (
    <>
      {
        clientSec && 
        <Elements stripe={stripePromise} options={options} >
          <CheckoutForm />
        </Elements> 
      }
    </>
    
  )
}

export default Payment
