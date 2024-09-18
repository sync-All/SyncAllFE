import { useEffect, useState } from 'react';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion} from "framer-motion"

import succeedimg from "../assets/payment/succed.png";
import failpng from "../assets/payment/failed.png";
import SyncUserNavbar from '../components/SyncUserJourney/SyncUserNavbar';
import LoadingAnimation from '../constants/loading-animation';
import axios from 'axios';

const PaymentStatus = () => {
    // https://www.syncallmusic.com/payment/status/?trxref=coazz93yvx&reference=coazz93yvx
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const trxref = searchParams.get('transaction_id')
    const [status, setStatus] = useState('')
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        setLoading(true)
        const token = localStorage.getItem('token');
        const config = {
            headers: {
            Authorization: `${token}`,
            },
        };
        console.log(trxref)
        if(trxref){

            axios.post('https://syncallfe.onrender.com/api/v1/transaction_status',{trxref},config)
            .then(()=>{
                setStatus('succeeded')
                setTimeout(()=>{
                    setLoading(false)
                },1500)
            })
            .catch(()=>{
                setStatus("Unsuccessful")
                setLoading(false)
            })
        }
        
    },[navigate,trxref])
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
                loading ? (<LoadingAnimation/>) :(
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