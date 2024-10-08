import Uploaded from '../../../assets/images/black-upload-icon.svg';
import Earning from '../../../assets/images/Cash Out.svg';
import Earth from '../../../assets/images/Earth.svg';
import syncAllLogo from '../../../assets/images/syncall-list-logo.svg';
import { useSyncUser } from '../../../Context/syncUserData';

const AccountOverview = () => {
  const { user } = useSyncUser();
  // const licensedTracks = ;
const licensedTracksNo = user?.user.totalLicensedTracks?.length || 0;
  const recentActivity = user?.user.recentActivity;

  return (
    <div className="mt-[50px]">
      <div>
        <h3 className="text-[#98A2B3] font-Utile-regular text-[24px] ">
          Quick Stats:
        </h3>
        <div className="flex flex-col items-center lg:flex-row mt-4 gap-6">
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
              {licensedTracksNo}
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
              N<span className="font-Utile-regular">/</span>A
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
              {user?.user.upcomingRenewals}{' '}
            </h3>
          </div>
        </div>
      </div>
      <div className="mt-[42px] mb-[158px]">
        <h3 className="text-[#98A2B3] font-Utile-regular text-[24px] ">
          Recent Activity:
        </h3>

        {recentActivity && recentActivity.length > 0 ? (
          recentActivity.map((activity, index) => (
            <div className="flex flex-col gap-[30px] mt-[42px] " key={index}>
              <div className="flex gap-4 items-center">
                <img src={syncAllLogo} alt="" />
                <span>
                  <p className="text-[#717171] font-Utile-regular text-[16px] leading-[18px]  ">
                    {activity?.length}
                  </p>
                  <p className="text-[#98A2B3] font-Utile-regular text-[14px] leading-[18px]  ">
                    1 Week Ago
                  </p>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default AccountOverview;
