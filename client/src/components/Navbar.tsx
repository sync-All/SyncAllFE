// import { useContext } from 'react';
import syncLogo from '../assets/logo.svg';
import { PrimaryButton } from '../components';
// import ModalContext from '../Context/ModatContext';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  // const values = useContext(ModalContext);
  const navigate = useNavigate();

  const handleNavToSignUp = () => {
    navigate('/login');
  };
  return (
    <div className=" flex justify-between items-center py-4 px-3 md:px-10 lg:px-14">
      <div>
        <img src={syncLogo} alt="" />
      </div>
      <div>
        <PrimaryButton text="Sign In" onClick={handleNavToSignUp} />
      </div>
    </div>
  );
};

export default Navbar;
