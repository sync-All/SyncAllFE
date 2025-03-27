// import { useContext } from 'react';
import syncLogo from '../assets/logo.svg';
// import ModalContext from '../Context/ModatContext';
import { Link } from 'react-router-dom';
const Navbar = () => {

  return (
    <div className=" flex justify-between items-center py-4 px-3 md:px-10 lg:px-14">
      <div>
        <img src={syncLogo} alt="" className='w-24 md:w-auto'/>
      </div>
      <div className="flex items-center gap-2 md:gap-3 font-inter">
        <Link to={`/login`} className='border border-white/60 py-3 px-4 md:py-4 md:px-6 text-white text-[3vw] md:text-lg text-center font-medium rounded-lg'>
          Log in
        </Link>
        <Link to={`/register1`} className='text-[3vw] md:text-lg 
         font- py-3 px-4 md:py-4 md:px-6 bg-yellow border border-yellow hover:bg-inherit hover:text-yellow transition-all duration-300 rounded-lg font-medium'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
