import React, { useState } from 'react';
import Logo from '../../assets/logo-black.png';
import Placeholder from '../../assets/images/user-placeholder.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';
import MenuIcon from '../../assets/images/menu-icon.svg'; // Assuming you have a menu icon

const SyncUserNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="mx-5 lg:mx-20 my-[37px]">
      <nav className="flex justify-between items-center">
        <span>
          <img src={Logo} alt="Logo" className="h-8" />
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
        <a href="/myAccount">
          <span
            className={`flex gap-2 ${menuOpen ? 'hidden' : 'hidden'} md:flex`}
          >
            <img src={Placeholder} alt="User Placeholder" className="h-8 w-8" />
            <p className="text-[#475367] font-formular-regular capitalize text-[16px]">
              My Account
            </p>
            <img src={ArrowDown} alt="Arrow Down" className="h-4 w-4" />
          </span>
        </a>
        <button className="md:hidden" onClick={toggleMenu}>
          <img src={MenuIcon} alt="Menu Icon" className="h-8 w-8" />
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col gap-4">
            <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
              Music
            </li>
            <a href="/pricing">
              <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
                Pricing
              </li>
            </a>
            <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
              My Library
            </li>
          </ul>
          <span className="flex gap-2 mt-4">
            <img src={Placeholder} alt="User Placeholder" className="h-8 w-8" />
            <p className="text-[#475367] font-formular-regular capitalize text-[16px]">
              My Account
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default SyncUserNavbar;
