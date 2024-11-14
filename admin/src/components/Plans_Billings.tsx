// import { useEffect, useState } from 'react';
// import Visa from '../assets/images/visa.svg'
// import { useSyncUser } from '../../../Context/syncUserData';
import { Link } from 'react-router-dom';


const PlansBillings = () => {
    // const { user } = useSyncUser();
    // const paymentInfo = user?.user?.billing
    // const [userPlan, setUserPlan] = useState('')
    
    // useEffect(()=>{
    //   switch(paymentInfo?.prod_id){
    //     case "68768":
    //       setUserPlan("Premium")
    //       break;
    //     case "68767":
    //       setUserPlan('Standard')
    //       break;
    //     default:
    //       setUserPlan('Basic')

    //   }
    // },[user,paymentInfo])



  return (
    <div className="mb-[136px]">
      <section className="mt-[53px]">
        <p className="text-[#555C74] text-[16px] font-formular-regular leading-[22px] ">
          {/* {!paymentInfo?.sub_status  ? "You are currently on the Basic Plan" : paymentInfo?.sub_status == "incomplete" ? "Payment Processing, we will inform you as soon as payment succeeds" :`You are currently subscribed to a monthly ${userPlan} plan`} */}
        </p>
        <div className="p-8 mt-4 bg-[#F9FAFB] rounded-[20px] ">
          <div className="flex items-center justify-between">
            <span>
              <p className="text-[#3e3e3e] text-[14px] font-formular-regular leading-[22px]">
                Current plan
              </p>
              <h3 className="text-[#3e3e3e] text-[24px] font-formular-bold leading-[24px] capitalize">
                {/* {userPlan} */} Premium
              </h3>
            </span>
            <Link
              to="/pricing"
              className="py-2 px-4 text-[12px] border border-black2 font-formular-bold leading-[22px] text-white bg-black2 hover:text-black2 hover:bg-white transition-all duration-700"
            >
              Change plan
            </Link>
          </div>
          <div className="mt-4 text-[#010516] text-[16px] font-Utile-regular leading-6">
            {/* <p>Frequency : {paymentInfo?.frequency == "month" ? "Monthly" : "N/A"}</p>
            <p>Next billing date : {new Date(Number(paymentInfo?.next_billing_date)).toLocaleDateString('en-GB') || 'N/A'}</p>
            <p>Amount : ${paymentInfo?.amount || "N/A"}</p> */}

            <p>Frequency : Monthly</p>
            <p>Next billing date : July 22, 2024</p>
             <p>Amount : $20</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansBillings;
