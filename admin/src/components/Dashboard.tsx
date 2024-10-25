import Folder from '../assets/images/Folder-icon.svg';
import SuspendedUser from '../assets/images/SuspendedUSer.svg';
import ActiveUser from '../assets/images/ActiveUser.svg';
import TotalUser from '../assets/images/TotalUser.svg';
import NewUser from '../assets/images/NewUser.svg';
import useLoading from '../constants/loading';
import LoadingAnimation from '../constants/loading-animation';
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
} from 'recharts';
// import { useDataContext } from '../../Context/DashboardDataProvider';
import { usePDF } from 'react-to-pdf';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
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
            <h2 className="font-formular-regular text-[16px] text-[#667185]">
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
      </div>
    </div>
  );
};

export default Dashboard;
