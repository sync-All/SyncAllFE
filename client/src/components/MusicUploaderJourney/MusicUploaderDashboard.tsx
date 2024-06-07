import Search from '../../assets/images/search-1.svg';
import Notification from '../../assets/images/Notification.svg';
import ArrowDowm from '../../assets/images/select-input-arrow.svg';
import UserImg from '../../assets/images/Photo (replace).svg';
import Folder from '../../assets/images/Folder-icon.svg'

const MusicUploaderDashboard = () => {
  return (
    <div className='mx-8'>
      <div className="flex mt-6 items-center ">
        <span className="mr-auto">
          <h1 className="text-[#667185] text-[24px] font-formular-light leading-normal">
            Dashboard
          </h1>
        </span>
        <span className="flex gap-[32px]">
          <img src={Search} alt="" />
          <img src={Notification} alt="" />
          <div className="flex items-center mx-3 mt-6 mb-9 ">
            <span>
              <img src={UserImg} alt="" />
            </span>
            <span className="ml-2">
              <p className="font-inter text-[14px] font-medium leading-5">
                Asuquo Victor
              </p>
              <p className="font-inter text-[12px] font-regular leading-4">
                @talktoasuquo
              </p>
            </span>
            <img src={ArrowDowm} alt="" className="ml-4" />
          </div>
        </span>
      </div>
      <div className='flex mt-8'>
        <span className="mr-auto">
          <h1 className="text-[#667185] text-[16px] font-Utile-regular leading-normal">
            Welcome, Victor!
          </h1>
        </span>
        <div className='flex'>
          <select name="" id="">
            <option value="">All</option>
            <option value="">Yearly</option>
            <option value="">Monthly</option>
            <option value="">Weekly</option>
          </select>
          <button className='flex'>
            <img src={Folder} alt=""></img>
            <p>Download PDF</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicUploaderDashboard;
