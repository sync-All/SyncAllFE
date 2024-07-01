import ProfileBg from '../../../assets/images/profile-bg.png';
import { useDataContext } from '../../../Context/DashboardDataProvider';
import Avatar from '../../../assets/images/Avatar.png';
import Share from '../../../assets/images/share.svg';
import Eye from '../../../assets/images/eye.svg';
import ProfileInformation from './ProfileInformation';
import PasswordSetting from './PasswordSetting';
import PaymentInformation from './PaymentInfo';
import { useState } from 'react';

const ProfileMultiStep = () => {
  const userData = useDataContext();
  const profileDetails = userData.dashboardData?.profileInfo;
  const [activeSection, setActiveSecton] = useState('Profile Information');

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';

  const renderSection = () => {
    switch (activeSection) {
      case 'Profile Information':
        return <ProfileInformation />;
      case 'Password Setting':
        return <PasswordSetting />;
      case 'Payment Information':
        return <PaymentInformation />;
    }
  };

  return (
    <div className="lg:mx-8 ml-5 mt-[29px]  block">
      <div className="flex relative mb-[200px] lg:mb-[140px]">
        <span className="w-full ">
          <img src={ProfileBg} alt="" className="w-full object-cover" />
        </span>
        <div className="flex flex-col lg:flex-row justify-between items-center top-[85%] absolute w-full">
          <div className="flex items-center gap-[32px] ml-3 lg:ml-12">
            <img
              src={profileDetails?.img || Avatar}
              alt=""
              className="h-[145px] w-[145px] rounded-[50%] object-cover"
            />
            <span className="">
              <h1 className="poppins-semibold text-[24px] leading-normal text-[#1D2739] ">
                {profileDetails?.fullName}
              </h1>
              <p className="text-[16px] poppins-regular leading-normal tetx-[#667185] opacity-60">
                {' '}
                {profileDetails?.email}
              </p>
            </span>
          </div>
          <div className="flex gap-[12px] items-center">
            <button className="font-formular-regular text-[14px] leading-[20px] text-[#344054] py-2.5 px-4 gap-2 border border-[#D0D5DD] rounded-[8px] flex">
              <img src={Share} alt="" />
              <p>Share Profile</p>
            </button>
            <button className="font-formular-regular text-[14px] leading-[20px] text-[#344054] py-2.5 px-4 gap-2 border border-[#D0D5DD] rounded-[8px] flex bg-[#EFA705]">
              <img src={Eye} alt="" />
              <p>View Profile</p>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16 ml-5 ">
        <ul className="flex gap-8">
          <li
            className={`${liClass} ${
              activeSection === 'Profile Information' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Profile Information')}
          >
            Profile Information
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Password Setting' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Password Setting')}
          >
            {' '}
            Password Setting
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Payment Information' ? `${activeLiClass}` : ''
            }`}
            onClick={() => setActiveSecton('Payment Information')}
          >
            {' '}
            Payment Information
          </li>
        </ul>
      </div>
      {renderSection()}
    </div>
  );
};

export default ProfileMultiStep;
