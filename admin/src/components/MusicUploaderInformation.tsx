import Uploaded from '../assets/images/Upload Track 2.svg';
import Earning from '../assets/images/Cash Out.svg';
import Earth from '../assets/images/Earth.svg';
import Stream from '../assets/images/Play Stream.svg';
import { User, useUsers } from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../constants/loading-animation';

const MusicUploaderInformation = () => {
  const { users, loading } = useUsers();
  const { id } = useParams();

  const getContentById = (id: string): User | undefined => {
    return users.find((item) => item._id === id);
  };

  const userDetails = getContentById(id || '');


  if (loading) {
    return <LoadingAnimation />;
  }

  const cardData = [
    {
      image: Uploaded,
      title: 'Total Tracks Uploaded',
      value: userDetails?.dashboard.totalTracks.length,
      color: '#064e3b',
    },
    {
      image: Earning,
      title: 'Total Earnings',
      dollar: '$',
      value: userDetails?.dashboard.earnings?.length || 0,
      color: '#f62c2c',
    },
    {
      image: Earth,
      title: 'Total Tracks Licensed',
      value: userDetails?.dashboard.totalLicensedTracks.length || 0,

      color: '#064e3b',
    },
    {
      image: Stream,
      title: 'Total Quote Requested',
      value: userDetails?.dashboard.totalQuotesRequested.length || 0,
      color: '#064e3b',
    },
  ];

  const dateCreated = userDetails?.createdAt
    ? new Date(userDetails.createdAt)
    : null;
  const dateOnly = dateCreated ? dateCreated.toISOString().split('T')[0] : '';
  const dateJoined = dateOnly;

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-[10px] lg:mt-12">
        {cardData.map((card, index) => (
          <div
            key={index}
            className=" py-3 px-3 border border-[#e4e7ec] rounded-[6px]"
          >
            <img src={card.image} alt="" />
            <div className="mt-[9px]">
              <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                {card.title}
              </p>
              <div className="flex items-center mt-[5px]">
                <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                  <span className="font-Utile-regular">{card.dollar}</span>{' '}
                  {card.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <div className={applyFormDiv}>
          <div className={input}>
            <label htmlFor="username" className={applyLabelStyles}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className={applyInputStyles}
              placeholder={userDetails?.name}
            />
          </div>
          {/* )} */}
          <div className={input}>
            <label htmlFor="dateJoined" className={applyLabelStyles}>
              Date Joined
            </label>
            <input
              type="text"
              name="dateJoined"
              className={applyInputStyles}
              placeholder={`Member since ${dateJoined}`}
              disabled={true}
            />
          </div>
        </div>
        <div className={applyFormDiv}>
          <div className={input}>
            <label htmlFor="name" className={applyLabelStyles}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              className={applyInputStyles}
              placeholder={userDetails?.fullName}
            />
          </div>
          <div className={input}>
            <label htmlFor="email" className={applyLabelStyles}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              disabled
              className={applyInputStyles}
              placeholder={userDetails?.email}
            />
          </div>
        </div>
        <div className={applyFormDiv}>
          <div className={input}>
            <label htmlFor="phoneNumber" className={applyLabelStyles}>
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              className={applyInputStyles}
              placeholder={userDetails?.phoneNumber}
            />
          </div>
          {userDetails?.userType === 'Company' ? (
            <div className={input}>
              <label htmlFor="representative" className={applyLabelStyles}>
                Representative
              </label>
              <input
                type="text"
                name="representative"
                className={applyInputStyles}
                placeholder={userDetails?.representative}
              />
            </div>
          ) : (
            <div className={input}>
              <label htmlFor="socials" className={applyLabelStyles}>
                Spotify Link
              </label>
              <input
                type="text"
                name="socials"
                className={applyInputStyles}
                placeholder={userDetails?.spotifyLink}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicUploaderInformation;
