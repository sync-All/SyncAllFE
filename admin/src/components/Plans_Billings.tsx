// import { useEffect, useState } from 'react';
// import Visa from '../assets/images/visa.svg'
// import { useSyncUser } from '../../../Context/syncUserData';
import { Link } from 'react-router-dom';
import { User } from '../contexts/UserContext';

interface PlansBillingsProps {
  userDetails: User | undefined
}

const PlansBillings:React.FC<PlansBillingsProps> = ({userDetails}) => {



  return (
    <div className="mb-[136px]">
      <section className="mt-[53px]">
        <div className="p-8 mt-4 bg-[#F9FAFB] rounded-[20px] ">
          <div className="flex items-center justify-between">
            <span>
              <p className="text-[#3e3e3e] text-[14px] font-formular-regular leading-[22px]">
                Current plan
              </p>
              <h3 className="text-[#3e3e3e] text-[24px] font-formular-bold leading-[24px] capitalize">
               {userDetails?.billing.plan}
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
            <p>Next billing date : None</p>
             <p>Amount : 0</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansBillings;
