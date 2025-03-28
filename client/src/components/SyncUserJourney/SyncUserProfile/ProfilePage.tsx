import UserImg from '../../../assets/images/placeholder.png';
import { useState } from 'react';
import AccountOverview from './AccountOverview';
import MyLicensedTracks from './MyLicensedTracks';
import AccountSetting from './AccountSetting';
import PlansBillings from './Plans_Billings';
import { useSyncUser } from '../../../Context/syncUserData';
import PendingLicense from './PendingLicense';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSyncUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const section = queryParams.get('section') || 'Account Overview';
  const [activeSection, setActiveSection] = useState(section);

  const userDetails = user?.user;

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';

  const renderSection = () => {
    switch (activeSection) {
      case 'Account Overview':
        return <AccountOverview />;
      case 'My Licensed Tracks':
        return <MyLicensedTracks />;
      case 'Pending License':
        return <PendingLicense />;
      case 'Account Settings':
        return <AccountSetting />;
      case 'Plan & Billings':
        return <PlansBillings />;
      default:
        return null;
    }
  };

  return (
    <div className="mx-8 lg:mx-[284px]">
      <section>
        <div className="flex gap-2 md:gap-6 items-center">
          <img
            src={userDetails?.img || UserImg}
            alt="User"
            className="h-[145px] w-[145px] rounded-full"
          />
          <span className="text-wrap">
            <h1 className="poppins-semibold text-[24px] text-[#1D2739]">
              {userDetails?.name}
            </h1>
            <p className="poppins-regular text-[16px] text-[#667185] opacity-60 text-wrap">
              {userDetails?.email}
            </p>
          </span>
        </div>
      </section>
      <section className="mt-[44px]">
        <ul className="flex gap-8">
          <li
            className={`${liClass} ${
              activeSection === 'Account Overview' ? activeLiClass : ''
            }`}
            onClick={() => setActiveSection('Account Overview')}
          >
            Account Overview
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'My Licensed Tracks' ? activeLiClass : ''
            }`}
            onClick={() => setActiveSection('My Licensed Tracks')}
          >
            My Licensed Tracks
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Pending License' ? activeLiClass : ''
            }`}
            onClick={() => setActiveSection('Pending License')}
          >
            Pending License
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Account Settings' ? activeLiClass : ''
            }`}
            onClick={() => setActiveSection('Account Settings')}
          >
            Account Settings
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Plan & Billings' ? activeLiClass : ''
            }`}
            onClick={() => setActiveSection('Plan & Billings')}
          >
            Plan <span className="font-Utile-regular">&</span> Billings
          </li>
        </ul>
      </section>
      <section>{renderSection()}</section>
    </div>
  );
};

export default ProfilePage;
