import Uploaded from '../../../assets/images/black-upload-icon.svg';
import Earning from '../../../assets/images/Cash Out.svg';
import Earth from '../../../assets/images/Earth.svg';
import syncAllLogo from '../../../assets/images/syncall-list-logo.svg'

const AccountOverview = () => {
  return (
    <div className="mt-[50px]">
      <div>
        <h3 className="text-[#98A2B3] font-Utile-regular text-[24px] ">
          Quick Stats:
        </h3>
        <div className="flex mt-4 gap-6">
          <div className="border border-[#E4E7EC]  py-5 text-center max-w-[264px] w-[264px] rounded-[10px] ">
            <img
              src={Uploaded}
              alt=""
              className="p-2 border border-[#E4E7EC] rounded-[5px] mx-auto"
            ></img>
            <p className="mt-4 font-formular-light text-[14px] text-center text-[#667185] ">
              Total Tracks Licensed
            </p>
            <h3 className="mt-2 font-formular-regular text-[32px] text-[#1D2739] text-center ">
              17
            </h3>
          </div>
          <div className="border border-[#E4E7EC]  py-5 text-center max-w-[264px] w-[264px] rounded-[10px] ">
            <img
              src={Earning}
              alt=""
              className="p-2 border border-[#E4E7EC] rounded-[5px] mx-auto"
            />
            <p className="mt-4 font-formular-light text-[14px] text-center text-[#667185] ">
              Total Spent:
            </p>
            <h3 className="mt-2 font-formular-regular text-[32px] text-[#1D2739] text-center ">
              <span className="font-Utile-regular">$</span>132,600
            </h3>
          </div>
          <div className="border border-[#E4E7EC]  py-5 text-center max-w-[264px] w-[264px] rounded-[10px] ">
            <img
              src={Earth}
              alt=""
              className="p-2 border border-[#E4E7EC] rounded-[5px] mx-auto"
            />
            <p className="mt-4 font-formular-light text-[14px] text-center text-[#667185] ">
              Upcoming Renewals
            </p>
            <h3 className="mt-2 font-formular-regular text-[32px] text-[#1D2739] text-center ">
              3
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-[42px] mb-[158px]">
        <h3 className="text-[#98A2B3] font-Utile-regular text-[24px] ">
          Recent Activity:
        </h3>
        <div className="flex flex-col gap-[30px] mt-[42px] ">
          <div className="flex gap-4 items-center">
            <img src={syncAllLogo} alt=""></img>
            <span>
              <p className="text-[#717171] font-Utile-regular text-[16px] leading-[18px]  ">
                You licensed 'Sunset Vibes' by Adebayo Band as a Single use on
                June 9, 2024.
              </p>
              <p className="text-[#98A2B3] font-Utile-regular text-[14px] leading-[18px]  ">
                1 Week Ago
              </p>
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <img src={syncAllLogo} alt="" />
            <span>
              <p className="text-[#717171] font-Utile-regular text-[16px] leading-[18px]  ">
                You licensed 'Calm Waters' by Nia Soul as Exclusive on June 8,
                2024.
              </p>
              <p className="text-[#98A2B3] font-Utile-regular text-[14px] leading-[18px]  ">
                1 Week Ago
              </p>
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <img src={syncAllLogo} alt="" />
            <span>
              <p className="text-[#717171] font-Utile-regular text-[16px] leading-[18px]  ">
                You searched for 'Relaxing Instrumental' on June 8, 2024.
              </p>
              <p className="text-[#98A2B3] font-Utile-regular text-[14px] leading-[18px]  ">
                1 Week Ago
              </p>
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <img src={syncAllLogo} alt="" />
            <span>
              <p className="text-[#717171] font-Utile-regular text-[16px] leading-[18px]  ">
                You searched for 'Afrobeats' on June 10, 2024.
              </p>
              <p className="text-[#98A2B3] font-Utile-regular text-[14px] leading-[18px]  ">
                1 Week Ago
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
