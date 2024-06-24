import Folder from '../../assets/images/Folder-icon.svg';
import Uploaded from '../../assets/images/Upload Track 2.svg';
import Earning from '../../assets/images/Cash Out.svg';
import Earth from '../../assets/images/Earth.svg';
import Stream from '../../assets/images/Play Stream.svg';
import {
  // LineChart,
  // Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from 'recharts';
import { useDataContext } from '../../Context/DashboardDataProvider';

interface Activity {
  title: string;
  description: string;
}

const MusicUploaderDashboard: React.FC<Activity> = () => {
  const dashdata = useDataContext();
  const dashboardDetails = dashdata.dashboardData?.dashboardDetails;
  const profileDetails = dashdata.dashboardData?.profileInfo;

  const data = [
    { name: '12', uv: 120 },
    { name: '13', uv: 150 },
    { name: '14', uv: 140 },
    { name: '15', uv: 50 },
    { name: '16', uv: 20 },
    { name: '17', uv: 80 },
    { name: '18', uv: 65 },
    { name: '19', uv: 100 },
    { name: '20', uv: 10 },
    { name: '21', uv: 110 },
    { name: '22', uv: 100 },
  ];

  const totalTracksCount = dashboardDetails?.totalTracks.length || 0;

  const cardData = [
    {
      image: Uploaded,
      title: 'Total Tracks Uploaded',
      value: `${totalTracksCount}`,
      percentage: '16%',
      color: '#064e3b',
      bgColor: 'bg-green-300',
    },
    {
      image: Earning,
      title: 'Total Earnings',
      dollar: '$',
      value: `$${dashboardDetails?.totalEarnings || 0}`,
      percentage: '16%',
      color: '#f62c2c',
      bgColor: 'bg-red-300',
    },
    {
      image: Earth,
      title: 'Countries Reached',
      value: `${dashboardDetails?.countryReached || 'N/A'}`,
      percentage: '16%',
      color: '#064e3b',
      bgColor: 'bg-green-300',
    },
    {
      image: Stream,
      title: 'Total Plays',
      value: `${dashboardDetails?.totalPlays || 0}`,
      percentage: '16%',
      color: '#064e3b',
      bgColor: 'bg-green-300',
    },
  ];

  return (
    <div>
      <div className="ml-[20px] mr-[20px] lg:mx-8">
        <div className="flex mt-7 lg:mt-8">
          <span className="mr-auto">
            <h1 className="text-[#667185] text-[16px] font-Utile-regular leading-normal">
              Welcome,{' '}
              {profileDetails?.name ? profileDetails?.name : 'Loading ...'}!
            </h1>
          </span>
          <div className="hidden lg:flex gap-[16px]">
            <select
              name=""
              id=""
              className="border border-[#D7DCE0] p-3 rounded-[5px]"
            >
              <option value="">All</option>
              <option value="">Yearly</option>
              <option value="">Monthly</option>
              <option value="">Weekly</option>
            </select>
            <button className="flex bg-[#EFA705] p-[10px] gap-[8px] rounded-[5px]">
              <img src={Folder} alt=""></img>
              <p>Download PDF</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-[10px] lg:mt-6">
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
                    {card.value.includes('totalTracksCount') &&
                    !dashboardDetails
                      ? 'Loading...'
                      : card.value}
                  </p>
                  <p
                    className={`text-[8px] font-Utile-medium text-[${card.color}] ${card.bgColor} lg:text-[14px]`}
                  >
                    {card.percentage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="font-formular-regular text-[16px] text-[#667185]">
              Earnings Overview
            </h2>
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
                <AreaChart width={730} height={250} data={data}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#064E3B1A"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#064E3B1A"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#064E3B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#064E3B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#064E3B"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#064E3B"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>{' '}
          <div>
            <h2 className="font-formular-regular text-[16px] text-[#667185]">
              Top Activities
            </h2>
            <div className="border border-[#E4E7EC] px-10 pt-8 pb-11 rounded-[11px] mt-6 gap-6 flex flex-col">
              {dashboardDetails?.activities?.length > 0 ? (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicUploaderDashboard;
