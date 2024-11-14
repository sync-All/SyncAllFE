import Folder from '../assets/images/Folder-icon.svg';
import SuspendedUser from '../assets/images/SuspendedUSer.svg';
import ActiveUser from '../assets/images/ActiveUser.svg';
import TotalUser from '../assets/images/TotalUser.svg';
import NewUser from '../assets/images/NewUser.svg';
import useLoading from '../constants/loading';
import LoadingAnimation from '../constants/loading-animation';
import Earning from '../assets/images/Cash Out.svg';
import Uploaded from '../assets/images/Upload Track 2.svg';
import Earth from '../assets/images/Earth.svg';
import QuotesIcon from '../assets/images/quoteicon.svg';

import Bull from '../assets/images/bull.svg';
import Bear from '../assets/images/bear.svg';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
// import { useDataContext } from '../../Context/DashboardDataProvider';
import { usePDF } from 'react-to-pdf';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Currencyformatter from '../helper/currencyformatter';
import formatToShortCurrency from '../helper/formatToShortCurrency';
// import LoadingAnimation from '../../constants/loading-animation';

interface ResponseData {
  message?: string;
}

interface User {
  createdAt: Date;
}

interface KpiData {
  totalCurrentUsers?: string;
  totalUserskpi: number;
  totalNewUsers: number;
  newUsersKpi: number;
  totalActiveUsers: number;
  activeUsersKpi: number;
  totalInActiveUsers: number;
  inActiveUsersKpi: number;
}

const Dashboard = () => {
  const { loading, setLoading } = useLoading();
  const [kpidata, setKpiData] = useState<KpiData>();
  const [users, setUsers] = useState<User[]>([]);
  const { toPDF, targetRef } = usePDF({ filename: 'dashboard.pdf' });

  useEffect(() => {
    const fetchKeyMetrics = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/get_key_metrics/this_month`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        setLoading(true);
        const res = await axios.get(apiUrl, config);
        setKpiData(res.data.kpiDetails);
        console.log(res.data.kpiDetails);
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      } finally {
        setLoading(false);
      }
    };
    fetchKeyMetrics();
  }, [setLoading]);

  useEffect(() => {
    const fetchTrackDetails = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/allusers`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        setLoading(true);
        const res = await axios.get(apiUrl, config);
        setUsers(res.data.message);
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTrackDetails();
  }, [setLoading]);

  if (loading) {
    return <LoadingAnimation />;
  }

  const userCountByMonth: { [key: string]: number } = {};
  users.forEach((user) => {
    const date = new Date(user.createdAt);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (userCountByMonth[key]) {
      userCountByMonth[key] += 1;
    } else {
      userCountByMonth[key] = 1;
    }
  });

  const data = Object.keys(userCountByMonth).map((key) => {
    return { name: key, 'No of registered user': userCountByMonth[key] };
  });

  const cardData = [
    {
      image: Earning,
      title: 'Total Revenue',
      value: kpidata?.totalCurrentUsers,
      kpi: kpidata?.totalUserskpi,
      color: '#064e3b',
    },
    {
      image: Uploaded,
      title: 'Total Tracks Uploaded',
      value: kpidata?.totalNewUsers,
      kpi: kpidata?.newUsersKpi,
      color: '#f62c2c',
    },
    {
      image: Earth,
      title: 'Total Licensed Tracks',
      value: kpidata?.totalActiveUsers,
      kpi: kpidata?.activeUsersKpi,
      color: '#064e3b',
    },
    {
      image: QuotesIcon,
      title: 'Total Quotes Submitted',
      value: kpidata?.totalInActiveUsers,
      kpi: kpidata?.inActiveUsersKpi,
      color: '#064e3b',
    },
    {
      image: TotalUser,
      title: 'Total Users',
      value: kpidata?.totalCurrentUsers,
      kpi: kpidata?.totalUserskpi,
      color: '#064e3b',
    },
    {
      image: NewUser,
      title: 'New Users',
      value: kpidata?.totalNewUsers,
      kpi: kpidata?.newUsersKpi,
      color: '#f62c2c',
    },
    {
      image: ActiveUser,
      title: 'Active Users',
      value: kpidata?.totalActiveUsers,
      kpi: kpidata?.activeUsersKpi,
      color: '#064e3b',
    },
    {
      image: SuspendedUser,
      title: 'Suspended Users',
      value: kpidata?.totalInActiveUsers,
      kpi: kpidata?.inActiveUsersKpi,
      color: '#064e3b',
    },
  ];

  const revenueData = [
    {
      revenue: 'Transaction Fees',
      amt: 0,
    },
    {
      revenue: 'Membership Subscriptions ',
      amt: 0,
    },
    {
      revenue: 'Advertising Revenue',
      amt: 0,
    },
    {
      revenue: 'Platform Service Fees',
      amt: 0,
    },
    {
      revenue: 'Music licensing',
      amt: 1,
    },
  ];

  const getColor = (index:number) => {
    const colors = ['#037847', '#FF9152', '#5C9BFF', '#9933FF', '#45CFB6'];
    return colors[index % colors.length]; // Repeats colors if there are more segments than colors
  };

  const totalAmount = revenueData.reduce((sum, item) => sum + item.amt, 0);



  return (
    <div ref={targetRef} className="mb-[91px]">
      <div className="ml-[20px] mr-[20px] lg:mx-8">
        <div className="flex mt-7 lg:mt-8">
          <span className="mr-auto">
            <h1 className="text-[#667185] text-[16px] font-Utile-regular leading-normal">
              Welcome,{' '}
              {/* {profileDetails?.username ||
                profileDetails?.representative ||
                'Please add username in the user profile'} */}
              Admin !
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

                  {(card.kpi ?? 0) < 0 ? (
                    <span className="text-[#f62c2c] bg-[#FFE5E5] flex items-center px-2 py-1 rounded-[4px]">
                      <p className="font-formular-regular text-[10px] lg:text-[14px] flex items-center gap-1">
                        <img src={Bear} alt="" /> {card.kpi}{' '}
                      </p>{' '}
                      <span className="font-inter">%</span>
                    </span>
                  ) : (
                    <span className="flex items-center text-[#064E3B] bg-[#ECFDF5] px-2 py-1 rounded-[4px]">
                      {' '}
                      <p className="font-formular-regular text-[10px] lg:text-[14px] flex items-center gap-1">
                        <img src={Bull} alt="" />
                        {card.kpi}
                      </p>{' '}
                      <span className="font-inter"> %</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="font-formular-bold text-[18px] text-[#202020] leading-[29.244px]">
              User Growth{' '}
            </h2>

            <div className="border border-[#E4E7EC] pr-10 py-5 rounded-[11px] mt-6 relative flex">
              <p className="vertical-text self-center text-[13px] font-Utile-regular leading-4 ">
                Number of New Users
              </p>

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
                  <Bar
                    dataKey="No of registered user"
                    fill="#013131"
                    barSize={77}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2.5 mt-4 mb-8">
              <div className="py-3 px-4 bg-[#F9F9F9] rounded-[8px] flex-1">
                <p className="text-[#5e5e5e] font-inter text-[14px] font-medium leading-5">
                  In <span className="text-yellow">May,</span> you experienced
                  significant growth, with the highest number of sign-ups to
                  date, reaching a total of{' '}
                  <span className="font-bold">1,204</span> new users.
                </p>
              </div>
              <div className="py-3 px-4 bg-[#F9F9F9] rounded-[8px] flex-1 ">
                <p className="text-[#5e5e5e] font-inter text-[14px] font-medium leading-5 ">
                  Your average new registered users is{' '}
                  <span className="text-yellow">304</span>
                </p>
              </div>
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
        </div>

        <section>
          <div className="flex justify-between items-center">
            <p className="text-[18px] font-inter font-medium leading-[30px] ">
              Revenue Breakdown by Activity
            </p>
            <select
              name=""
              id=""
              className="rounded-[8px] border border-[#DADCE0] px-3 py-2 text-[#5E5E5E] text-[14px] font-formular-regular leading-10"
            >
              <option value="" className="">
                All time{' '}
              </option>
            </select>
          </div>
          <div className="flex mt-[21px] flex-col md:flex-row gap-6">
            <div className="flex-1">
              <table className="w-full border-collapse border border-[#DADCE0] ">
                <thead className="bg-[#f9f9f9]">
                  <tr>
                    <th className="text-[#838383] text-[14px] font-semibold text-left py-2 px-4 border-b">
                      Category
                    </th>
                    <th className="text-[#838383] text-[14px] font-semibold text-left py-2 px-4  border-b">
                      Spent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {revenueData.map((rev, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-left text-[#202020] border-b font-semibold">
                        {rev.revenue}
                      </td>
                      <td className="py-2 px-4 text-left text-[#202020] font-semibold border-b">
                        {Currencyformatter(rev.amt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row flex-1 border md:gap-[10%] xl:gap-[72px] items-center">
              <ResponsiveContainer width="50%" height={208}>
                <PieChart width={208} height={208}>
                  <Pie
                    data={revenueData}
                    dataKey="amt"
                    nameKey="revenue"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    // label={({ amt }) => ` ₦${formatToShortCurrency(amt)}`}
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getColor(index)} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      fill: '#202020', // Text color
                    }}
                  >
                    ₦{formatToShortCurrency(totalAmount)}
                  </text>
                  <text
                    x="50%"
                    y="60%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontSize: '16px',
                      fontWeight: 'regular',
                      fill: '#5E5E5E', // Text color
                    }}
                  >
                    Total expenses
                  </text>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-3 ">
                <div className="flex items-center gap-2">
                  <div className="min-w-4 h-4 rounded-[4px] bg-[#037847]"></div>
                  <p>Transaction Fees</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="min-w-4 h-4 rounded-[4px] bg-[#FF9152]"></div>
                  <p>Subscriptions </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="min-w-4 h-4 rounded-[4px] bg-[#5C9BFF]"></div>
                  <p>Advertising Revenue</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="min-w-4 h-4 rounded-[4px] bg-[#9933FF]"></div>
                  <p>Platform Service Fees</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="min-w-4 h-4 rounded-[4px] bg-[#45CFB6]"></div>
                  <p>Music licensing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
