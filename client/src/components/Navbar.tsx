// import { useContext } from 'react';
import syncLogo from '../assets/logo.svg';
// import ModalContext from '../Context/ModatContext';
import { Link } from 'react-router-dom';
const Navbar = () => {

  return (
    <div className=" flex justify-between items-center py-4 px-3 md:px-10 lg:px-14">
      <div>
        <img src={syncLogo} alt="" />
      </div>
      <div className="flex items-center gap-2 md:gap-3 font-inter">
        <Link to={`/login`} className='border border-white/60 py-3 px-4 md:py-4 md:px-6 text-white text-sm md:text-lg font-medium rounded-lg'>
          Log in
        </Link>
        {/* <button
          className="py-3 px-4 md:py-4 md:px-6 border h-12 md:h-[56px]  min-w-[100px] md:w-[172px] hover:bg-white/10 transition-all
          "
          onClick={handleNavToSignIn}
        >
          <p
            className="
              text-sm md:text-[16px] 
              font-inter font-semibold 
              text-white 
              truncate
            "
          >
            Log in
          </p>
        </button> */}
        <Link to={`/register1`} className='text-sm md:text-lg 
         font- py-3 px-4 md:py-4 md:px-6 bg-yellow border border-yellow hover:bg-inherit hover:text-yellow transition-all duration-300 rounded-lg font-medium'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
