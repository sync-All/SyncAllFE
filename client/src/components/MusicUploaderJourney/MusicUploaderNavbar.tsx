import Search from '../../assets/images/search-1.svg';
import Notification from '../../assets/images/Notification.svg';
import ArrowDowm from '../../assets/images/select-input-arrow.svg';
import Hamburger from '../../assets/images/Hambuger.svg';
import { useDataContext } from '../../Context/DashboardDataProvider';

interface MusicUploaderNavbarProp {
  activeItem: string
  toggleMenu: () => void;

}
const MusicUploaderNavbar: React.FC<MusicUploaderNavbarProp> = ({
  toggleMenu,
  activeItem,
}) => 
  
  {

    const profileInfo = useDataContext()
    const profileDetails = profileInfo.dashboardData?.profileInfo
  return (
    <div>
      <nav className="lg:mx-8 flex items-center mt-6 gap-3 mb-9 ">
        <button onClick={toggleMenu} className="lg:hidden ml-[18px] h-[20px] ">
          <img src={Hamburger} alt="" />
        </button>
        <div className="flex justify-between items-center w-full ">
          <div className="mr-auto">
            <h1 className="text-[#667185] text-[14px] lg:text-[24px] font-formular-light leading-normal mr-auto">
              {activeItem}
            </h1>
          </div>
          <div className="flex gap-[17px] items-center">
            <img src={Search} alt="" />
            <img src={Notification} alt="" />
            <div className="flex items-center lg:mx-3">
              <span className="">
                <img
                  src={profileDetails?.img}
                  alt=""
                  className="w-10 h-10 object-cover rounded-[50%]"
                />
              </span>
              <span className="hidden lg:block ml-2">
                <p className="font-inter text-[14px] font-medium leading-5">
                  {profileDetails?.fullName}
                </p>
                <p className="font-inter text-[12px] font-regular leading-4">
                  {profileDetails?.email}
                </p>
              </span>
              <img src={ArrowDowm} alt="" className="hidden lg:block ml-4" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MusicUploaderNavbar;
