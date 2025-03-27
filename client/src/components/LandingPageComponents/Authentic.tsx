import { useContext, useEffect } from 'react';
// import {PrimaryButton} from "../../components"
import ModalContext from '../../Context/ModatContext';
import { Link } from 'react-router-dom';

const Authentic = () => {
  const values = useContext(ModalContext);
  useEffect(() => {
    if (values.modalIsOpen) {
      document.body.style.cssText =
        'margin : 0; height : 100%; overflow : hidden';
    } else {
      document.body.style.cssText = '';
    }
  }, [values?.modalIsOpen]);
  return (
    <div className="py-12 md:py-16 lg:py-[109px] flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-7xl lg:text-[clamp(90px,8.225vw,120px)] text-grey-100 text-center font-gitSans lg:leading-[100%] pb-8 md:pb-11 lg:pb-16 font-normal ">
        Authentic african music,
        <br />
        effortless licensing.
      </h1>
      <div className="flex gap-4 w-full justify-center items-center font-inter">
        <Link to="/explore-sounds" className='py-4 px-6 text-[16px]  font-semibold text-white border rounded-md hover:border-yellow hover:text-yellow transition-all duration-500'>
          Explore Sounds
        </Link>
        <Link to={'/login'} className='py-4 px-6 bg-yellow border border-yellow text-[16px] font-inter font-semibold text-black leading-6 rounded-md hover:text-white/70 hover:bg-inherit transition-all duration-500'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Authentic;
