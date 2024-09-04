import React, { useEffect, useRef, useState } from 'react';
import Logo from '../../assets/logo-black.png';
import Placeholder from '../../assets/images/user-placeholder.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';
import MenuIcon from '../../assets/images/menu-icon.svg'; // Assuming you have a menu icon
import { useSyncUser } from '../../Context/syncUserData';

const SyncUserNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSyncUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    console.log('Logout triggered');
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
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mx-5 lg:mx-20 my-[37px]">
      <nav className="flex justify-between items-center">
        <span>
          <a href="/home">
            <img src={Logo} alt="Logo" className="h-8" />
          </a>
        </span>
        <ul
          className={` gap-[64px] hidden ${
            menuOpen ? 'hidden' : 'flex'
          } md:flex`}
        >
          <a href="/home">
            <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
              Music
            </li>
          </a>

          <a href="/pricing">
            <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
              Pricing
            </li>
          </a>
          <a href="/mylibrary">
            <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
              My Library
            </li>
          </a>
        </ul>
        <div
          className={`flex flex-col gap-2 items-center ${
            menuOpen ? 'hidden' : 'hidden'
          } md:flex`}
        >
          <span className="flex items-center">
            <a href="/myAccount">
              <span className="flex items-center gap-2">
                <img
                  src={user?.user?.img || Placeholder}
                  alt="User Placeholder"
                  className="h-8 w-8 object-cover rounded-full"
                />
                <p className="text-[#475367] font-formular-regular capitalize text-[16px]">
                  My Account
                </p>
              </span>
            </a>
            <span>
              <img
                src={ArrowDown}
                alt="Arrow Down"
                className={`h-4 w-4 ml-2 cursor-pointer ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                onClick={toggleDropdown}
              />
            </span>{' '}
          </span>
          {isDropdownOpen && (
            <div className="" onClick={(e) => e.stopPropagation()}>
              <button
                className="z-30 w-[150px] bg-red-600 py-2.5 px-6 rounded-[4px] font-formular-light leading-normal text-[#ffff] text-[14px]"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={toggleMenu}>
          <img src={MenuIcon} alt="Menu Icon" className="h-8 w-8" />
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <a href="/home">
              <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
                Music
              </li>
            </a>

            <a href="/pricing">
              <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
                Pricing
              </li>
            </a>
            <a href="/myLibrary">
              <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
                My Library
              </li>
            </a>
          </ul>
          <span className="flex gap-2 mt-4 items-center">
            <img
              src={user?.user?.img || Placeholder}
              alt="User Placeholder"
              className="h-8 w-8 object-cover rounded-full"
            />
            <a href="/myAccount">
              <p className="text-[#475367] font-formular-regular capitalize text-[16px]">
                My Account
              </p>
            </a>
          </span>
          <div className="mt-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="z-30 w-full bg-red-600 py-2.5 px-6 rounded-[8px] font-formular-light leading-normal text-[#ffff] text-[14px]"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyncUserNavbar;
