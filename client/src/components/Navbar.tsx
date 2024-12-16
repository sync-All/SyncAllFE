// import { useContext } from 'react';
import syncLogo from '../assets/logo.svg';
import { PrimaryButton } from '../components';
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
      <div className=" flex items-center gap-3">
        <button
          className="bg-transparent border border-yellow font-inter text-yellow hover:text-yellow hover:bg-black px-3 py-2 md:px-6 md:py-4 text-sm font-semibold md:text-base transition-all duration-500 rounded-md disabled:bg-amber-200"
          onClick={handleNavToSignIn}
        >
          Sign In
        </button>
        <PrimaryButton text="Get Started" onClick={handleNavToSignUp} />
      </div>
    </div>
  );
};

export default Navbar;
