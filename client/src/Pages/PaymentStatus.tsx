import { useEffect, useState } from 'react';
import SyncUserNavbar from '../components/SyncUserJourney/SyncUserNavbar';
import {
    useStripe,
  } from "@stripe/react-stripe-js";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion} from "framer-motion"
import Loading from '../components/Stripe/Loading';

import succeedimg from "../assets/payment/succed.png";
import failpng from "../assets/payment/failed.png";
import pendingpng from "../assets/payment/pending.png";

const PaymentStatus = () => {
    const stripe = useStripe()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const client_secret = searchParams.get('payment_intent_client_secret')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        if (!stripe) {
            return;
          }
        if(!client_secret){
            setLoading(false)
            navigate('/pricing')
        }else{
            stripe.retrievePaymentIntent(client_secret)
            .then(({paymentIntent})=>{
                if (!paymentIntent) {
                    return;
                }else{
                    console.log(paymentIntent)
                    setStatus(paymentIntent.status)
                    setTimeout(()=>{
                        setLoading(false)
                    },1500)
                }
            })
        }
        
    },[navigate, stripe, client_secret])
    let message = ''
    let title = ''
    let icon = ''
    let link1 = ''
    let link2 = ''
    switch (status){
        case 'succeeded': 
            message = 'Your payment has been processed successfully'
            title = 'Payment Successful'
            icon = succeedimg
            link1 = "/home"
            link2 = "/home"
            break;
        case 'processing':
            message = 'Your payment is currently being processed'
            title = 'Payment Pending'
            icon = pendingpng
            link1 = "/pricing"
            link2 = "/home"
            break;
        case 'requires_payment_method':
            message = 'Payment Failed'
            title = 'Please try another payment method.'
            icon = failpng
            link1 = "/pricing"
            link2 = "/home"
            break;
        default:
            message = 'An Error Occurred'
            title = 'Something went wrong'
            link1 = "/pricing"
            link2 = "/home"
            icon = failpng
    }
  return (
        <>
            <SyncUserNavbar/>
            {
                loading ? (<Loading/>) :(
                <motion.div className='flex flex-col gap-6 items-center justify-center h-[70vh] text-[#013131]' initial={{opacity : 0 , scale:  0.8}} whileInView={{opacity : 1, scale : 1}}>
                    <img src={icon} alt="" />
                    <h1 className=' text-3xl lg:text-[56px] lg:leading-[56px] font-bold' >{title}</h1>
                    <p className='text-base md:text-2xl'>{message}</p>
                    <div className='flex items-center gap-6 '>
                        <Link to={link1} className='border border-[#013131] py-3 px-12 md:px-20 rounded-md md:rounded-lg font-formular-medium hover:border-yellow hover:bg-[rgba(239,167,5,0.5)] transition-all ease-in-out duration-500'>
                         Back
                        </Link>
                        <Link to={link2} className='bg-yellow py-3 px-12 md:px-20 rounded-md md:rounded-lg font-formular-medium hover:border-yellow hover:bg-[rgba(239,167,5,0.5)] transition-all ease-in-out duration-500'>
                            Okay
                        </Link>
                    </div>
                </motion.div>) 
            }
        </>
  )
}

export default PaymentStatus
