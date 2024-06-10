import Search from '../../assets/images/search-1.svg';
import Notification from '../../assets/images/Notification.svg';
import ArrowDowm from '../../assets/images/select-input-arrow.svg';
import UserImg from '../../assets/images/Photo (replace).svg';
import Folder from '../../assets/images/Folder-icon.svg';
import Uploaded from '../../assets/images/Upload Track 2.svg';
import Earning from '../../assets/images/Cash Out.svg';
import Earth from '../../assets/images/Earth.svg';
import Stream from '../../assets/images/Play Stream.svg';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const MusicUploaderDashboard = () => {

const data = [
  { name: '12', uv: 0},
  { name: '13', uv: 30 },
  { name: '14', uv: 60 },
  { name: '15', uv: 50},
  { name: '16', uv: 20},
  { name: '17', uv: 80},
  { name: '18', uv: 65},
  { name: '19', uv: 100},
  { name: '20', uv: 120},
  { name: '21', uv: 110},
  { name: '22', uv: 140},
];

  return (
    <div>
      <nav className=" lg:mx-8">
        <div className="flex mt-6 justify-between items-center mb-9">
          <div className="mr-auto">
            <h1 className="text-[#667185] text-[24px] font-formular-light leading-normal">
              Dashboard
            </h1>
          </div>
          <div className="flex gap-[17px] items-center">
            <img src={Search} alt="" />
            <img src={Notification} alt="" />
            <div className="flex items-center lg:mx-3  ">
              <span className="">
                <img src={UserImg} alt="" className="" />
              </span>
              <span className=" hidden lg:block ml-2">
                <p className="font-inter text-[14px] font-medium leading-5">
                  Asuquo Victor
                </p>
                <p className="font-inter text-[12px] font-regular leading-4">
                  @talktoasuquo
                </p>
              </span>
              <img src={ArrowDowm} alt="" className=" hidden lg:block ml-4" />
            </div>
          </div>
        </div>
      </nav>
      <div className="ml-[-20px] lg:mx-8">
        {' '}
        <div className="flex mt-7 lg:mt-8  ">
          <span className="mr-auto">
            <h1 className="text-[#667185] text-[16px] font-Utile-regular leading-normal">
              Welcome, Victor!
            </h1>
          </span>
          <div className="hidden lg:flex">
            <select name="" id="">
              <option value="">All</option>
              <option value="">Yearly</option>
              <option value="">Monthly</option>
              <option value="">Weekly</option>
            </select>
            <button className="flex">
              <img src={Folder} alt=""></img>
              <p>Download PDF</p>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-[10px] lg:mt-6">
          <div className="flex items-start justify-center flex-col py-3 pl-3 border border-[#e4e7ec] rounded-[6px]">
            <img src={Uploaded} alt="" />
            <div className="mt-[9px]">
              <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                Total Tracks Uploaded
              </p>
              <div className="flex items-center mt-[5px]">
                <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                  17
                </p>
                <p className="text-[8px] font-Utile-medium text-[#064e3b] bg-green-300 lg:text-[14px]">
                  16%
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center flex-col py-3 pl-3 border border-[#e4e7ec] rounded-[6px]">
            <img src={Earning} alt="" />
            <div className="mt-[9px]">
              <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                Total Earnings
              </p>
              <div className="flex items-center mt-[5px]">
                <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                  $132,600
                </p>
                <p className="text-[8px] font-Utile-medium text-[#f62c2c] bg-red-300 lg:text-[14px]">
                  16%
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center flex-col py-3 pl-3 border border-[#e4e7ec] rounded-[6px]">
            <img src={Earth} alt="" />
            <div className="mt-[9px]">
              <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                Countries Reached
              </p>
              <div className="flex items-center mt-[5px]">
                <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                  68
                </p>
                <p className="text-[8px] font-Utile-medium text-[#064e3b] bg-green-300 lg:text-[14px]">
                  16%
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start justify-center flex-col py-3 pl-3 border border-[#e4e7ec] rounded-[6px]">
            <img src={Stream} alt="" />
            <div className="mt-[9px]">
              <p className="text-[#667185] font-formular-light text-[10px] lg:text-[14px]">
                Total Plays
              </p>
              <div className="flex items-center mt-[5px]">
                <p className="text-[20px] font-formular-regular text-[#1d2739] lg:text-[32px] mr-auto">
                  57,500
                </p>
                <p className="text-[8px] font-Utile-medium text-[#064e3b] bg-green-300 lg:text-[14px]">
                  16%
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px] lg:mt-[60px] ">
          <h2>Earnings Overview</h2>
          <div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="uv"
                  stroke="#064e3b"
                  activeDot={{ r: 8 }}
                
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicUploaderDashboard;
