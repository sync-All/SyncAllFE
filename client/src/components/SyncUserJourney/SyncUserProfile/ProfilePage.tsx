import UserImg from '../../../assets/images/placeholder.png';
import { useState } from 'react';
import AccountOverview from './AccountOverview';
import MyLicensedTracks from './MyLicensedTracks';
import AccountSetting from './AccountSetting';
import PlansBillings from './Plans_Billings';

const ProfilePage = () => {
  const [activeSection, setActiveSecton] = useState('Account Overview');
  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';

  const renderSection = () => {
    switch (activeSection) {
      case 'Account Overview':
        return <AccountOverview />;
      case 'My Licensed Tracks':
        return <MyLicensedTracks />;
      case 'Account Settings':
        return <AccountSetting />;
      case 'Plan & Billings':
        return <PlansBillings />;
    }
  };

  return (
    <div className="lg:ml-[284px]">
      <section>
        <div className="flex gap-2 md:gap-6 items-center">
          <img
            src={UserImg}
            alt="User"
            className="h-[145px] w-[145px] rounded-full "
          />
          <span>
            <h1 className="poppins-semibold text-[24px] text-[#1D2739] ">
              John Doe
            </h1>
            <p className="poppins-regular text-[16px] text-[#667185] opacity-60 ">
              @talktoasuquo
            </p>
          </span>
        </div>
      </section>
      <section className='mt-[44px] '>
        <ul className="flex gap-8">
          <li
            className={`${liClass} ${
              activeSection === 'Account Overview' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Account Overview')}
          >
            Account Overview
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'My Licensed Tracks' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('My Licensed Tracks')}
          >
            {' '}
            My Licensed Tracks
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Account Settings' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Account Settings')}
          >
            {' '}
            Account Settings
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Plan & Billings' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Plan & Billings')}
          >
            {' '}
            Plan & Billings
          </li>
        </ul>
      </section>
      <section>{renderSection()}</section>
    </div>
  );
};

export default ProfilePage;