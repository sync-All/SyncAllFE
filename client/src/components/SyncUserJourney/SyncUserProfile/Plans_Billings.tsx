import { useEffect, useState } from 'react';
import Visa from '../../../assets/images/visa.svg'
import { useSyncUser } from '../../../Context/syncUserData';
import { Link } from 'react-router-dom';


const PlansBillings = () => {
    const { user } = useSyncUser();
    const paymentInfo = user?.user?.billing
    const [userPlan, setUserPlan] = useState('')
    useEffect(()=>{
      console.log(user)
      switch(paymentInfo?.prod_id){
        case "prod_QgrvvxGRYPiP7a":
          setUserPlan("Premium")
          break;
        case "prod_QUeQtqvvQsy9X8":
          setUserPlan('Standard')
          break;
        default:
          setUserPlan('Basic')

      }
    },[user,paymentInfo])



  return (
    <div className="mb-[136px]">
      <section className="mt-[53px]">
        <p className="text-[#555C74] text-[16px] font-formular-regular leading-[22px] ">
          {!paymentInfo?.subscription_status  ? "You are currently on the Basic Plan" : paymentInfo?.subscription_status == "incomplete" ? "Payment Processing, we will inform you as soon as payment succeeds" :`You are currently subscribed to a monthly ${userPlan} plan`}
        </p>
        <div className="p-8 mt-4 bg-[#F9FAFB] rounded-[20px] ">
          <div className="flex items-center justify-between">
            <span>
              <p className="text-[#3e3e3e] text-[14px] font-formular-regular leading-[22px]">
                Current plan
              </p>
              <h3 className="text-[#3e3e3e] text-[24px] font-formular-bold leading-[24px] capitalize">
                {userPlan}
              </h3>
            </span>
            <Link to="/pricing" className="py-2 px-4 text-[12px] border border-black2 font-formular-bold leading-[22px] text-white bg-black2 hover:text-black2 hover:bg-white transition-all duration-700">
              Change plan
            </Link>
          </div>
          <div className="mt-4 text-[#010516] text-[16px] font-Utile-regular leading-6">
            <p>Frequency : {paymentInfo?.frequency == "month" ? "Monthly" : "N/A"}</p>
            <p>Next billing date : {paymentInfo?.next_billing_date || 'N/A'}</p>
            <p>Amount : ${paymentInfo?.amount || "N/A"}</p>
          </div>
        </div>
      </section>

      {
        paymentInfo?.last4card_digits && paymentInfo.card_brand && <section className="mt-8 ">
        <h3 className="text-[#3e3e3e] text-[24px] font-formular-bold leading-[24px]">
          Payment method
        </h3>
        <p className="text-[#555C74] text-[16px] font-formular-regular leading-[22px] ">
          This card is currently being charged for your subscription
        </p>
        <div className=" flex items-center justify-between p-8 bg-[#F9FAFB] rounded-[20px] mt-4">
          <span className="flex gap-[11px] items-center">
            <img src={Visa} alt="" />
            <p className="text-[#010516] text-[16px] font-Utile-medium leading-[24px] ">
              N/A
            </p>
          </span>

          <button className="py-2 px-4 text-[12px] font-formular-bold leading-[22px] text-white bg-black2 rounded-[8px]">
            Update
          </button>
        </div>
      </section>
      }
      {
        paymentInfo?.last4card_digits && paymentInfo.card_brand && <section className="mt-8">
        <h3 className="text-[#3e3e3e] text-[24px] font-formular-bold leading-[24px]">
          Cancel subcription
        </h3>
        <div className=" flex items-center justify-between p-8 bg-[#F9FAFB] rounded-[20px] mt-4">
          <p className="text-[#555C74] text-[16px] font-formular-regular leading-[22px] ">
            You can cancel your subscription at any time
          </p>
          <button className="py-2 px-4 text-[12px] font-formular-bold leading-[22px] text-white bg-[#DE1212] rounded-[8px]">
            Cancel
          </button>
        </div>
      </section>
      }
    </div>
  );
};

export default PlansBillings;
