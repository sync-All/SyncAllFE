import Logo from '../../assets/logo-black.png';
import DashboardIcon from '../../assets/images/Widget 5.svg';
import UploadTrackIcon from '../../assets/images/Upload Track 2.svg';
import TrackIcon from '../../assets/images/Music Library 2.svg';
import EarningIcon from '../../assets/images/Banknote 2.svg';
import ProfileIcon from '../../assets/images/User Rounded.svg';
import DisputeIcon from '../../assets/images/dispute.svg';
import Chat_Support from '../../assets/images/chat, support.svg';
import LogoutIcon from '../../assets/images/Login 2.svg';
import { useDataContext } from '../../Context/DashboardDataProvider';
import Placeholder from '../../assets/images/placeholder.png';


interface MusicUploaderDashboardSidebarProps {
  activeItem: string
  onTabChange: (tab: string) => void
}

const MusicUploaderDashboardSidebar: React.FC<MusicUploaderDashboardSidebarProps> = ({ activeItem, onTabChange }) => {

const profileInfo = useDataContext();
const profileDetails = profileInfo.dashboardData?.profileInfo;

const logout = () => {
    localStorage.clear();
    window.location.href = '/';
}



  const pStyle = (item: string) => ({
    color: item === activeItem ? 'var(--black2)' : 'var(--Grey-500, #667185)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '145%', // 20.3px
  });

  const liStyle = (item: string) => ({
    backgroundColor:
      item === activeItem ? 'var(--Grey-100, #E0F2F2)' : 'transparent',
    padding: '16px 0 16px 33px',
    display: 'flex',
    gap:'16px',
    cursor: 'pointer',
  });

// 
   


  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden border border-r-[#E4E7EC] flex flex-col">
      <div className="mt-[40px] ml-[40px]">
        <img src={Logo} alt="" />
      </div>
      <div className=" mt-[53px]">
        <ul>
          <li
            onClick={() => onTabChange('Dashboard')}
            style={liStyle('Dashboard')}
          >
            <img src={DashboardIcon} alt=""></img>
            <p style={pStyle('Dashboard')}>Dashboard</p>
          </li>
          <li
            onClick={() => onTabChange('Upload Track')}
            style={liStyle('Upload Track')}
          >
            <img src={UploadTrackIcon} alt="" />
            <p style={pStyle('Upload Track')}>Upload Track</p>
          </li>
          <li
            onClick={() => onTabChange('My Tracks')}
            style={liStyle('My Tracks')}
          >
            <img src={TrackIcon} alt="" />
            <p style={pStyle('My Tracks')}>My Tracks</p>
          </li>
          <li
            onClick={() => onTabChange('Earnings')}
            style={liStyle('Earnings')}
          >
            <img src={EarningIcon} alt="" />
            <p style={pStyle('Earnings')}>Earnings</p>
          </li>
          <li
            onClick={() => onTabChange('User Profile')}
            style={liStyle('User Profile')}
          >
            <img src={ProfileIcon} alt="" />
            <p style={pStyle('User Profile')}>User Profile</p>
          </li>
          <li onClick={() => onTabChange('Dispute')} style={liStyle('Dispute')}>
            <img src={DisputeIcon} alt="" />
            <p style={pStyle('Dispute')}>Dispute</p>
          </li>
        </ul>
      </div>
      <div className=" mt-auto ">
        <div className="border border-[#E4E7EC] bg-[#F2F4F7] m-[10px] pl-3 pt-3">
          <div className="flex gap-[9px]">
            <span>
              <img src={Chat_Support} alt="" />
            </span>
            <span className="flex flex-col gap-[5px] ">
              <p className="text-[#0A1B39] text-[16px] font-Utile-bold leading-[18px]">
                Need Support?
              </p>
              <p className="text-[#83899F] text-[12px] font-Utile-light leading-[16px]">
                Get in touch with our agents
              </p>
            </span>
          </div>

          <a href="mailto:info@syncallmusic.com">
            <button className="mt-4 py-1 mr-3 mb-3 text-[14px] leading-5 font-formular-medium text-center bg-white w-full  rounded-md">
              Contact Us
            </button>
          </a>
        </div>
        <div className="flex items-center mx-3 mt-6 mb-9 ">
          <span>
            <img
              src={profileDetails?.img || Placeholder}
              alt=""
              className="w-10 h-10 object-cover rounded-[50%]"
            />
          </span>
          <span className="ml-2 w-1/2 break-words">
            <p className="font-inter text-[14px] font-medium leading-5">
              {profileDetails?.username || profileDetails?.representative}
            </p>
            <p className="font-inter text-[12px] font-regular leading-4 ">
              {profileDetails?.email}
            </p>
          </span>
          <span className="ml-auto cursor-pointer">
            <img src={LogoutIcon} alt="" onClick={logout} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicUploaderDashboardSidebar;
