import Notification from '../../assets/images/Notification.svg';
import ArrowDown from '../../assets/images/select-input-arrow.svg';
import Hamburger from '../../assets/images/Hambuger.svg';
import { useDataContext } from '../../Context/DashboardDataProvider';
import Placeholder from '../../assets/images/placeholder.png';
import { useState, useRef } from 'react';

interface MusicUploaderNavbarProp {
  activeItem: string;
  toggleMenu: () => void;
}

const MusicUploaderNavbar: React.FC<MusicUploaderNavbarProp> = ({
  toggleMenu,
  activeItem,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const profileInfo = useDataContext();
  const profileDetails = profileInfo.dashboardData?.profileInfo;

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
            <img src={Notification} alt="" className="self-start mt-2" />
            <div>
              <div className="flex items-center lg:mx-3" ref={dropdownRef}>
                <span className="">
                  <img
                    src={profileDetails?.img || Placeholder}
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

                <div className="flex flex-col items-center ml-4">
                  <img
                    src={ArrowDown}
                    alt=""
                    className="hidden lg:block cursor-pointer"
                    onClick={toggleDropdown}
                  />
                </div>
              </div>
              {isDropdownOpen && (
                <div className="mt-2">
                  <button
                    className="z-30 w-full bg-red-600 py-2.5 px-6 rounded-[8px] font-formular-light leading-normal text-[#ffff] text-[14px]"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MusicUploaderNavbar;
