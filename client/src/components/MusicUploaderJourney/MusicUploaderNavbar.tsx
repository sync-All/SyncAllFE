import Notification from '../../assets/images/Notification.svg';
import ArrowDown from '../../assets/images/select-input-arrow.svg';
import Hamburger from '../../assets/images/Hambuger.svg';
import { useDataContext } from '../../Context/DashboardDataProvider';
import Placeholder from '../../assets/images/placeholder.png';
import { useState, useEffect, useRef } from 'react';
import MusicUploaderNotification from './MusicUploaderNotification';

interface MusicUploaderNavbarProp {
  activeItem: string;
  toggleMenu: () => void;
}

const MusicUploaderNavbar: React.FC<MusicUploaderNavbarProp> = ({
  toggleMenu,
  activeItem,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleModal = () => {
    setModalIsOpen((prevState) => !prevState);
  
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the dropdown from closing before the click is processed
   
    localStorage.clear();
    window.location.href = '/';
  };

  const handleClickOutside = (event: MouseEvent) => {
    // Close dropdown if clicked outside
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const profileInfo = useDataContext();
  const profileDetails = profileInfo.dashboardData?.profileInfo;

  return (
    <div>
      <nav className="lg:mx-8 flex items-center mt-6 gap-3 mb-9">
        <button onClick={toggleMenu} className="lg:hidden ml-[18px] h-[20px]">
          <img src={Hamburger} alt="" />
        </button>
        <div className="flex justify-between items-center w-full">
          <div className="mr-auto">
            <h1 className="text-[#667185] text-[14px] lg:text-[24px] font-formular-light leading-normal mr-auto">
              {activeItem}
            </h1>
          </div>

          <div className="flex gap-[17px] items-center">
            <img
              src={Notification}
              alt=""
              className="self-start mt-2 cursor-pointer"
              onClick={toggleModal}
            />

            <MusicUploaderNotification
              isOpen={modalIsOpen}
              onRequestClose={toggleModal}
            />

            <div>
              <div className="flex items-center lg:mx-3">
                <span>
                  <img
                    src={profileDetails?.img || Placeholder}
                    alt=""
                    className="w-10 h-10 object-cover rounded-[50%]"
                  />
                </span>
                <span className="hidden lg:block ml-2">
                  <p className="font-inter text-[14px] font-medium leading-5">
                    {profileDetails?.name}
                  </p>
                  <p className="font-inter text-[12px] font-regular leading-4">
                    {profileDetails?.email}
                  </p>
                </span>

                <div className="flex flex-col items-center ml-4">
                  <img
                    src={ArrowDown}
                    alt=""
                    className={`hidden lg:block cursor-pointer ${
                      isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    onClick={toggleDropdown}
                  />
                </div>
              </div>
              {isDropdownOpen && (
                <div className="mt-2" onClick={(e) => e.stopPropagation()}>
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
