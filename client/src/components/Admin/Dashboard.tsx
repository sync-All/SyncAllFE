import Folder from '../../assets/images/Folder-icon.svg';
import SuspendedUser from '../../assets/images/SuspendedUSer.svg';
import ActiveUser from '../../assets/images/ActiveUser.svg';
import TotalUser from '../../assets/images/TotalUser.svg';
import NewUser from '../../assets/images/NewUser.svg';

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
} from 'recharts';
// import { useDataContext } from '../../Context/DashboardDataProvider';
import { usePDF } from 'react-to-pdf';
// import LoadingAnimation from '../../constants/loading-animation';

const Dashboard = () => {
  // const { dashboardData, loading } = useDataContext();

  const { toPDF, targetRef } = usePDF({ filename: 'dashboard.pdf' });

  // const dashboardDetails = dashboardData?.dashboardDetails;
  // // const dashboardActivities = dashboardDetails?.activities;
  // const profileDetails = dashboardData?.profileInfo;

  const data = [
    { name: 'Jan', uv: 10 },
    { name: 'Feb', uv: 20 },
    { name: 'Mar', uv: 50 },
    { name: 'Apr', uv: 40 },
    { name: 'May', uv: 200 },
    { name: 'June', uv: 300 },
    { name: 'July', uv: 1000 },
    { name: 'Aug', uv: 1000 },
    { name: 'Sept', uv: 500 },
    { name: 'Oct', uv: 8900 },
    { name: 'Nov', uv: 4900 },
    { name: 'Dec', uv: 4900 },
  ];

  // const totalTracksCount = dashboardDetails?.totalTracks.length || 0;

  const cardData = [
    {
      image: TotalUser,
      title: 'Total Users',
      value: '5000',
      color: '#064e3b',
    },
    {
      image: NewUser,
      title: 'New Users',
      // value: `${dashboardDetails?.totalEarnings || 0}`,
      color: '#f62c2c',
    },
    {
      image: ActiveUser,
      title: 'Active Users',
      // value: `${dashboardDetails?.countryReached || 0}`,
      color: '#064e3b',
    },
    {
      image: SuspendedUser,
      title: 'Suspended Users',
      // value: `${dashboardDetails?.totalPlays || 0}`,
      color: '#064e3b',
    },
  ];

  // if (loading) {
  //   return <LoadingAnimation />;
  // }

  return (
    <div ref={targetRef}>
      <div className="ml-[20px] mr-[20px] lg:mx-8">
        <div className="flex mt-7 lg:mt-8">
          <span className="mr-auto">
            <h1 className="text-[#667185] text-[16px] font-Utile-regular leading-normal">
              Welcome,{' '}
              {/* {profileDetails?.username ||
                profileDetails?.representative ||
                'Please add username in the user profile'} */}
              Tom !
            </h1>
          </span>
          <div className="hidden lg:flex gap-[16px]">
            <button className="flex bg-[#EFA705] p-[10px] gap-[8px] rounded-[5px]">
              <img src={Folder} alt=""></img>
              <button onClick={() => toPDF()}>Download PDF</button>
            </button>
          </div>
        </div>
        <p className="text-[#202020] font-Utile-bold text-[19px] leading-7 tracking-[-0.527px]">
          Key Metrics and Information
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-[10px] lg:mt-6">
          {cardData.map((card, index) => (
            <div
              key={index}
              className=" py-3 px-3 border border-[#e4e7ec] rounded-[6px]"
            >
              <img
                src={card.image}
                alt=""
                className="rounded-[5px] p-2 border border-[#E4E7EC] "
              />
              <div className="mt-[9px]">
                <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                  {card.title}
                </p>
                <div className="flex items-center mt-[5px]">
                  <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                    {card.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="font-formular-regular text-[16px] text-[#667185]">
              User Growth{' '}
            </h2>

            {/* {(dashboardDetails?.totalEarnings ?? 0) > 0 ? ( */}
            <div className="border border-[#E4E7EC] pr-10 py-5 rounded-[11px] mt-6 relative">
              <div className="flex gap-[18px] items-center justify-end absolute right-0">
                <select
                  name=""
                  id=""
                  className="rounded-[6px] border border-[#6D7D93] px-[19px] py-[8px] text-[#6D7D93] text-[11px] font-formular-regular"
                >
                  <option value="" className="">
                    Total Earning
                  </option>
                </select>
                <select
                  name=""
                  id=""
                  className="rounded-[6px] border border-[#6D7D93] px-[19px] py-[8px] text-[#6D7D93] text-[11px] font-formular-regular"
                >
                  <option value="">Monthly</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart width={730} height={250} data={data}>
                  <XAxis dataKey="name" stroke="#013131" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Bar dataKey="uv" fill="#013131" barSize={77} />
                 
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* ) : (
              <div className="text-center mt-9 text-[16px] leading-[20px] py-6">
                <img src={NoEarning} alt="" className="mx-auto" />
                <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
                  You haven't earned any money yet. Upload your first track to
                  start earning
                </p>
              </div>
            )} */}
          </div>
          {/* <div>
            <h2 className="font-formular-regular text-[16px] text-[#667185]">
              Top Activities
            </h2>
            <div className="border border-[#E4E7EC] px-10 pt-8 pb-11 rounded-[11px] mt-6 gap-6 flex flex-col">
              {dashboardActivities ? (
                dashboardDetails.activities.map((activity, index) => (
                  <div key={index} className="flex flex-col gap-[6px]">
                    <h3 className="font-formular-regular text-base tracking-[-0.32px] text-[#475367] leading-normal">
                      {activity.title}
                    </h3>
                    <p className="font-Utile-regular text-[#98A2B3] text-[14px] tracking-[-0.28px] leading-normal w-[202px]">
                      {activity.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  <p className="font-Utile-regular text-[#98A2B3]">
                    No activities
                  </p>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
