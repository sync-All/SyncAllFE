import Placeholder from '../assets/images/placeholder.png';

import { User, useUsers } from '../contexts/UserContext';
import LoadingAnimation from '../constants/loading-animation';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import AccountOverview from './AccountOverview';
import PlansBillings from './Plans_Billings';
import UserLicenseRequest from './UserLicenseRequest';
import UserLicensedTracks from './UserLicensedTracks';
import MusicUploaderInfromation from './MusicUploaderInformation';
import MusicUploaderTrack from './MusicUploaderTrack';
import EmailModal from '../modals/EmailModal';
import SuspendAccountModal from '../modals/SuspendAccountModal';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const SingleUserPage = () => {
  const { users, loading } = useUsers();
  const { id } = useParams();
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

  const [isloading, setIsLoading] = useState(false);

  const [success, setSuccess] = useState<string | null>(null);
  const getContentById = (id: string): User | undefined => {
    return users.find((item) => item._id === id);
  };

  const userDetails = getContentById(id || '');

  const handleActivateAccount = async () => {
    setIsLoading(true);
    setSuccess(null);
    try {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/activateuser?userId=${userDetails?._id}`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      console.log(config.headers.Authorization);

      const response = await axios.put(apiUrl, config);

      setSuccess(response.data || 'Account has been suspended');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isloading) {
    return <LoadingAnimation />;
  }

  console.log(success);

  const SyncUserSingleUser = () => {
    const [activeSection, setActiveSection] = useState('Account Overview');

    const liClass =
      'text-[#81909D] font-inter text-[14px]  font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
    const activeLiClass = 'border-b border-[#013131] text-[#013131]';

    const sections = [
      {
        id: 'Account Overview',
        component: <AccountOverview userDetails={userDetails} />,
      },
      {
        id: 'License Requests',
        component: <UserLicenseRequest userDetails={userDetails} />,
      },
      {
        id: 'Licensed Tracks',
        component: <UserLicensedTracks userDetails={userDetails} />,
      },

      {
        id: 'Plan & Billings',
        component: <PlansBillings userDetails={userDetails} />,
      },
    ];

    return (
      <div>
        <div className="mx-8">
          <section className="mt-[44px]">
            <ul className="flex gap-8 ">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`${liClass} ${
                    activeSection === section.id ? activeLiClass : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.id}
                </li>
              ))}
            </ul>
          </section>
          <section>
            {
              sections.find((section) => section.id === activeSection)
                ?.component
            }
          </section>
        </div>
      </div>
    );
  };

  const MusicUploaderSingleUser = () => {
    const [activeSection, setActiveSection] = useState('User Information');

    const liClass =
      'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
    const activeLiClass = 'border-b border-[#013131] text-[#013131]';

    const sections = [
      { id: 'User Information', component: <MusicUploaderInfromation /> },
      { id: 'User Tracks', component: <MusicUploaderTrack /> },
    ];
    return (
      <div>
        <div className="mx-8">
          <section className="mt-[44px]">
            <ul className="flex gap-8 ">
              {sections.map((section) => (
                <li
                  key={section.id}
                  className={`${liClass} ${
                    activeSection === section.id ? activeLiClass : ''
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.id}
                </li>
              ))}
            </ul>
          </section>
          <section>
            {
              sections.find((section) => section.id === activeSection)
                ?.component
            }
          </section>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-[31px]">
      <p className="text-[#33333399] poppins-normal leading-6 tracking-[0.2px]">
        <span className="cursor-pointer">
          <Link to="/admin/manage-users"> Manage Users</Link>
        </span>{' '}
        &gt; User Information
      </p>
      <h2 className="poppins-regular text-[24px] mt-6">{userDetails?.role}</h2>
      <div className="flex justify-between">
        <div className="flex items-center gap-8 mt-8 ">
          <img
            src={userDetails?.img || Placeholder}
            alt=""
            className="h-[145px] w-[145px] rounded-[50%] object-cover"
          />
          <span className="">
            <h1 className="poppins-semibold text-[24px] leading-normal text-[#1D2739] ">
              {userDetails?.name}
            </h1>
            <p className="text-[16px] poppins-regular leading-normal tetx-[#667185] opacity-60">
              {' '}
              {userDetails?.email}
            </p>
          </span>
        </div>
        <div className="flex gap-2 place-items-end">
          {' '}
          <button
            className="bg-transparent p-[10px] gap-[8px] rounded-[8px] flex border border-[#D0D5DD]"
            type="button"
            onClick={() => setIsEmailModalOpen(true)}
          >
            Send Email
          </button>
          {userDetails?.accountStatus === 'Inactive' ? (
            <button
              className="bg-[#037847] text-white p-[10px] gap-[8px] rounded-[8px] flex"
              type="button"
              onClick={() => handleActivateAccount()}
            >
              Acivate Account{' '}
            </button>
          ) : (
            <button
              className="bg-[#F62C2C] text-white p-[10px] gap-[8px] rounded-[8px] flex"
              type="button"
              onClick={() => setIsSuspendModalOpen(true)}
            >
              Suspend Account
            </button>
          )}
        </div>
      </div>
      {userDetails?.role === 'Music Uploader' ? (
        <MusicUploaderSingleUser />
      ) : (
        <SyncUserSingleUser />
      )}

      {isEmailModalOpen && (
        <EmailModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          recipient={userDetails?.email || ''}
        />
      )}
      {isSuspendModalOpen && (
        <SuspendAccountModal
          isOpen={isSuspendModalOpen}
          onClose={() => setIsSuspendModalOpen(false)}
          recipient={userDetails?._id || ''}
        />
      )}
    </div>
  );
};

export default SingleUserPage;
