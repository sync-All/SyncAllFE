import { useLocation } from 'react-router-dom'
import React from 'react'
import EmailVerificationImg from '../../../assets/images/email-confirmation-img.png';
import syncLogo from '../../../assets/logo-black.png';
import Mail from '../../../assets/images/mail.svg';
import ArrowLeft from '../../../assets/images/arrow-left.svg';

const EmailConfirmation: React.FC = () => {
  const location = useLocation();
  const emailDomain = location.state.emailDomain;

  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="hidden lg:block w-[60%] h-screen bg-cover"
        style={{ backgroundImage: `url(${EmailVerificationImg})` }}
      />
      <div className="mt-[78px]  lg:w-[40%]">
        <div className="flex flex-col justify-center items-center text-center">
          <img src={syncLogo} alt="" className="" />
          <div className="mt-[154px] flex flex-col justify-center items-center text-center ">
            <img src={Mail} alt="" className="" />
            <h2 className="font-formular-bold text-[24px] mt-[24px] leading-[20px] text-[#101828] ">
              Check your email
            </h2>
            <p className="text-[14px] text-[#475467] mt-[8px] leading-[20px] font-formular-light ">
              open mail app to verify
            </p>
            <button className="bg-black text-white px-[43px] py-[22px] w-full poppins-medium text-[18.6px] leading-[26.49px] mt-[36px] xl:min-w-[441px] ">
              <a href={`${emailDomain}`} rel="noreferrer" target="_blank">
                Go to email
              </a>
            </button>
          </div>
        </div>
        <div className="text-[#475467] poppins-semibold text-[14px] leading-[20px]  text-center mt-[36px] ">
          <p className="">
            Didn’t receive the email? {''}
            <a href="" className="text-yellow">
              Click to resend
            </a>
          </p>
          <p className=" flex items-center justify-center gap-[8px] mt-[28px]">
            <span>
              <img src={ArrowLeft} alt="" />
            </span>
            <a href="/register1">Back to SignUp</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailConfirmation;
