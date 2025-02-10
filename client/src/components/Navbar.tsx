// import { useContext } from 'react';
import syncLogo from '../assets/logo.svg';
// import ModalContext from '../Context/ModatContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  // const values = useContext(ModalContext);
  const navigate = useNavigate();

  const handleNavToSignIn = () => {
    navigate('/login');
  };

  const handleNavToSignUp = () => {
    navigate('/register1');
  };

  return (
    <div className=" flex justify-between items-center py-4 px-3 md:px-10 lg:px-14">
      <div>
        <img src={syncLogo} alt="" />
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          className="py-3 px-4 md:py-4 md:px-6 border     h-12 md:h-[56px]  min-w-[100px] md:w-[172px] hover:bg-white/10 transition-all
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
        </button>

        <button
          className="
    py-3 px-4 md:py-4 md:px-6 
    bg-yellow 
    flex justify-center items-center 
    h-12 md:h-[56px] 
    min-w-[120px] md:w-[172px]
    hover:bg-yellow/90
    transition-all
  "
          onClick={handleNavToSignUp}
        >
          <p
            className="
      text-sm md:text-[16px] 
      font-inter font-semibold 
      text-black 
      truncate
    "
          >
            Get Started
          </p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
