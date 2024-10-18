import Placeholder from '../../assets/images/placeholder.png';

import Uploaded from '../../assets/images/Upload Track 2.svg';
import Earning from '../../assets/images/Cash Out.svg';
import Earth from '../../assets/images/Earth.svg';
import Stream from '../../assets/images/Play Stream.svg';

interface User {
  _id: string;
  fullName: string;
  name: string;
  email: string;
  status: string;
  role: string;
  img: string;
  spotifyLink: string;
  createdAt: Date;
}
interface SingleUserPageProps {
  user: User;
  onTabChange: (tab: string) => void;
}

const SingleUserPage: React.FC<SingleUserPageProps> = ({
  user,
  onTabChange,
}) => {
  if (!user) {
    return <p>No user selected.</p>; // Display this if no user is selected
  }

  const cardData = [
    {
      image: Uploaded,
      title: 'Total Tracks Uploaded',
      //  value: `${totalTracksCount}`,
      color: '#064e3b',
    },
    {
      image: Earning,
      title: 'Total Earnings',
      dollar: '$',
      //  value: `${dashboardDetails?.totalEarnings || 0}`,
      color: '#f62c2c',
    },
    {
      image: Earth,
      title: 'Total Tracks Licensed',
      //  value: `${dashboardDetails?.countryReached || 0}`,
      color: '#064e3b',
    },
    {
      image: Stream,
      title: 'Total Plays',
      //  value: `${dashboardDetails?.totalPlays || 0}`,
      color: '#064e3b',
    },
  ];

  const dateCreated = user.createdAt ? new Date(user.createdAt) : null;
  const dateOnly = dateCreated ? dateCreated.toISOString().split('T')[0] : '';
  const dateJoined = dateOnly;

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';

  return (
    <div className="mx-[31px]">
      <p className="text-[#33333399] poppins-normal leading-6 tracking-[0.2px]">
        <span
          className="cursor-pointer"
          onClick={() => onTabChange('Manage Users')}
        >
          Manage
        </span>{' '}
        Users &gt; User Information
      </p>
      <h2 className="poppins-regular text-[24px] mt-6">Music Uploader</h2>
      <div className="flex justify-between">
        <div className="flex items-center gap-8 mt-8 ">
          <img
            src={user.img || Placeholder}
            alt=""
            className="h-[145px] w-[145px] rounded-[50%] object-cover"
          />
          <span className="">
            <h1 className="poppins-semibold text-[24px] leading-normal text-[#1D2739] ">
              {user.name}
            </h1>
            <p className="text-[16px] poppins-regular leading-normal tetx-[#667185] opacity-60">
              {' '}
              {user?.email}
            </p>
          </span>
        </div>
        <div className="flex gap-2 place-items-end">
          <a href={`mailto:${user.email}`}>
            {' '}
            <button
              className="bg-transparent p-[10px] gap-[8px] rounded-[8px] flex border border-[#D0D5DD]"
              type="button"
            >
              Send Email
            </button>
          </a>{' '}
          <button
            className="bg-[#EFA705] p-[10px] gap-[8px] rounded-[8px] flex"
            type="button"
          >
            Suspend Account
          </button>
        </div>
      </div>

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
                  {/* <span className="font-Utile-regular">{card.dollar}</span>{' '}
                  {card.value.includes('totalTracksCount') && !dashboardDetails
                    ? 'Loading...'
                    : card.value} */}
                  1000
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12">
        <div className={applyFormDiv}>
          {/* {usertype === 'Company' ? (
            <div className={input}>
              <label htmlFor="representative" className={applyLabelStyles}>
                Representative
              </label>
              <Field
                type="text"
                name="representative"
                className={applyInputStyles}
                placeholder={userDetails?.representative}
              />
              <ErrorMessage
                name="representative"
                component="div"
                className="text-red-500"
              />
            </div>
          ) : ( */}
          <div className={input}>
            <label htmlFor="username" className={applyLabelStyles}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className={applyInputStyles}
              placeholder={user.name}
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
              placeholder={user.fullName}
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
              placeholder={user.email}
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
            />
          </div>
          <div className={input}>
            <label htmlFor="socials" className={applyLabelStyles}>
              Spotify Link
            </label>
            <input
              type="text"
              name="socials"
              className={applyInputStyles}
              placeholder={user.spotifyLink}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUserPage;
