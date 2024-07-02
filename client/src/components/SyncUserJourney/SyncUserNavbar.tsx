import Logo from '../../assets/logo-black.png';
import Placeholder from '../../assets/images/user-placeholder.svg';
import ArrowDown from '../../assets/images/arrow-down.svg';

const SyncUserNavbar = () => {
  return (
    <div className="mx-20 my-[37px]">
      <nav className="flex justify-between">
        <span>
          {' '}
          <img src={Logo} alt="" />
        </span>
        <ul className="flex gap-[64px]">
          <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
            Music
          </li>
          <a href="/pricing"><li className="text-[#475367] font-formular-regular capitalize text-[16px]">
            Pricing
          </li></a>
          
          <li className="text-[#475367] font-formular-regular capitalize text-[16px]">
            My Library
          </li>
        </ul>
        <span className="flex gap-2">
          <img src={Placeholder} alt="" />
          <p className="text-[#475367] font-formular-regular capitalize text-[16px]">
            My Account
          </p>
          <img src={ArrowDown} alt="" />
        </span>
      </nav>
    </div>
  );
};

export default SyncUserNavbar;
