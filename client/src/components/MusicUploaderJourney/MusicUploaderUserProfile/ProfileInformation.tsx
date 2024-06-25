import { useDataContext } from '../../../Context/DashboardDataProvider';
import Attach from '../../../assets/images/attachimage.svg';


const ProfileInformation = () => {
  const userData = useDataContext();
  const userDetails = userData.dashboardData?.profileInfo;

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';

  return (
    <div className="lg:mx-8 ml-5 mt-12">
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
        <div className={input}>
          <label htmlFor="dateJoined" className={applyLabelStyles}>
            Date Joined
          </label>
          <input
            type="text"
            placeholder="member since"
            contentEditable
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className={input}>
          <label htmlFor="fullname" className={applyLabelStyles}>
            Full Name
          </label>
          <input
            type="text"
            className={applyInputStyles}
            placeholder={userDetails?.fullName}
          />
        </div>
        <div className={input}>
          <label htmlFor="email" className={applyLabelStyles}>
            {' '}
            Email Address
          </label>
          <input
            type="email"
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
          <input type="number" className={applyInputStyles} />
        </div>
        <div className={input}>
          <label htmlFor="socials" className={applyLabelStyles}>
            Social Media Links
          </label>
          <input
            type="text"
            className={applyInputStyles}
            placeholder={userDetails?.spotifyLink}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className={`${input} relative `}>
          <label className={applyLabelStyles}>Change your profile photo</label>
          <label
            htmlFor="profilePhoto"
            className={`${applyInputStyles} h-[147px] border-dashed border-spacing-10 border-[2px] flex flex-col items-center px-7 py-6`}
          >
            <span>
              <img src={Attach} alt="" className="" />
            </span>

            <p className="text-yellow font-inter text-[16px] font-medium mt-5">
              Click to upload{' '}
              <span className="text-[#292D32]">or drag & drop it here</span>
            </p>
            <p className="font-Utile-regular text-[16px] leading-normal text-[#A9ACB4] mt-3">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/svg+xml, image/png, image/jpeg, image/gif"
            className={` opacity-0 w-0.1 h-0.1 absolute z-[-1]`}
          />
        </div>
        <div className={input}>
          <label htmlFor="">Your Bio</label>
          <textarea
            className={`${applyInputStyles} h-[147px]`}
            placeholder="Describe yourself a little"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
