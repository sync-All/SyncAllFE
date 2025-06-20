import Logo from '../assets/images/logo-black.png';
import DashboardIcon from '../assets/images/Widget 5.svg';
import ManageUser from '../assets/images/User Rounded.svg';
import TrackIcon from '../assets/images/Music Library 2.svg';
import QuotesIcon from '../assets/images/quoteicon.svg';
import DisputeIcon from '../assets/images/dispute.svg';
import Chat_Support from '../assets/images/chat, support.svg';
import LogoutIcon from '../assets/images/Login 2.svg';
// import { useDataContext } from '../../Context/DashboardDataProvider';
import Placeholder from '../assets/images/placeholder.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AdminDashboardSidebarProps {
  activeItem: string;
  onTabChange: (item: string) => void;
  toggleMenu: () => void;
}

const AdminSidebarDashboard: React.FC<AdminDashboardSidebarProps> = ({
  activeItem,
  onTabChange,
  toggleMenu,
}) => {
  // const profileInfo = useDataContext();
  // const profileDetails = profileInfo.dashboardData?.profileInfo;
  const { user } = useAuth();
  const role = user?.role;

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

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
    gap: '16px',
    cursor: 'pointer',
  });

  const hasRole = (roles: string[]) => roles.includes(role || '');

  //

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden border border-r-[#E4E7EC] flex flex-col">
      <div className="flex justify-between mt-[40px] ml-[40px]">
        <img src={Logo} alt="" />
        <p className="pointer lg:hidden" onClick={toggleMenu}>
          X
        </p>
      </div>
      <div className=" mt-[53px]">
        <ul>
          {hasRole(['Admin', 'ContentAdmin']) && (
            <li onClick={() => onTabChange('Dashboard')}>
              <Link to="/admin/dashboard" style={liStyle('Dashboard')}>
                <img src={DashboardIcon} alt="" />
                <p style={pStyle('Dashboard')}>Dashboard</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin']) && (
            <li onClick={() => onTabChange('Manage Users')}>
              <Link to="/admin/manage-users" style={liStyle('Manage Users')}>
                <img src={ManageUser} alt="" />
                <p style={pStyle('Manage Users')}>Manage Users</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin', 'ContentAdmin']) && (
            <li onClick={() => onTabChange('Manage Content')}>
              <Link
                to="/admin/manage-contents"
                style={liStyle('Manage Content')}
              >
                <img src={TrackIcon} alt="" />
                <p style={pStyle('Manage Content')}>Manage Content</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin', 'ContentAdmin']) && (
            <li onClick={() => onTabChange('Tracks')}>
              <Link
                to="/admin/tracks"
                style={liStyle('Tracks')}
              >
                <img src={TrackIcon} alt="" />
                <p style={pStyle('Tracks')}>Tracks</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin', 'ContentAdmin']) && (
            <li onClick={() => onTabChange('Upload Content')}>
              <Link
                to="/admin/upload-contents"
                style={liStyle('Upload Content')}
              >
                <img src={TrackIcon} alt="" />
                <p style={pStyle('Upload Content')}>Upload Content</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin']) && (
            <li onClick={() => onTabChange('Manage Tickets')}>
              <Link to="/admin/tickets" style={liStyle('Manage Tickets')}>
                <img src={DisputeIcon} alt="" />
                <p style={pStyle('Manage Tickets')}>Manage Tickets</p>
              </Link>
            </li>
          )}

          {hasRole(['ContentAdmin']) && (
            <li onClick={() => onTabChange('Ownership Transfer')}>
              <Link to="/admin/transfer" style={liStyle('Ownership Transfer')}>
                <img src={DisputeIcon} alt="" />
                <p style={pStyle('Ownership Transfer')}>Ownership Transfer</p>
              </Link>
            </li>
          )}

          {hasRole(['Admin']) && (
            <Link
              to="https://airtable.com/appaKCViIID5q3ZBE/tbl1HhPFmva6zI048/viwL0YjZSdLvWFNFX?blocks=hide"
              className="flex gap-4 cursor-pointer pt-4 pl-[33px] pb-4"
              target="_blank"
            >
              <img src={QuotesIcon} alt="" />
              <p className="text-[#667185] leading-[145%]">Quotes</p>
            </Link>
          )}
        </ul>
      </div>

      <div className="mt-auto">
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
            <button className="mt-4 py-1 mr-3 mb-3 text-[14px] leading-5 font-formular-medium text-center bg-white w-full rounded-md">
              Contact Us
            </button>
          </a>
        </div>
        <div className="flex items-center mx-3 mt-6 mb-9">
          <span>
            <img
              src={Placeholder}
              alt=""
              className="w-10 h-10 object-cover rounded-[50%]"
            />
          </span>
          <span className="ml-2 w-1/2 break-words">
            <p className="font-inter text-[14px] font-medium leading-5">
              {user?.name || 'Admin'}
            </p>
            <p className="font-inter text-[12px] font-regular leading-4 ">
              {user?.email || 'Admin Email'}
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

export default AdminSidebarDashboard;
