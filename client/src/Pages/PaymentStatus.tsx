import { useEffect, useState } from 'react';
import SyncUserNavbar from '../components/SyncUserJourney/SyncUserNavbar';
import {
    useStripe,
  } from "@stripe/react-stripe-js";
import { useNavigate, useSearchParams } from 'react-router-dom';
import succeedimg from "../assets/payment/succed.png"
const PaymentStatus = () => {
    const stripe = useStripe()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const client_secret = searchParams.get('payment_intent_client_secret')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        if (!stripe) {
            return;
          }
        if(!client_secret){
            navigate('/pricing')
        }else{
            stripe.retrievePaymentIntent(client_secret)
            .then(({paymentIntent})=>{
                if (!paymentIntent) {
                    return;
                }else{
                    setStatus(paymentIntent.status)
                }
            })
        }
        
    },[navigate, stripe, client_secret])
    let message = ''
    let title = ''
    switch (status){
        case 'succeeded': 
            message = 'Your payment has been processed successfully'
            title = 'Payment Successful'
            break;
        case 'processing':
            message = 'Your payment is currently being processed'
            title = 'Payment Pending'
            break;
        case 'requires_payment_method':
            message = 'Payment Failed'
            title = 'Please try another payment method.'
            break;
        default:
            message = 'An Error Occurred'
            title = 'Something went wrong'
    }
  return (
        <>
            <SyncUserNavbar/>
            <img src={verified} alt="" />
            {message}
            {title}
        </>
  )
}

export default PaymentStatus
