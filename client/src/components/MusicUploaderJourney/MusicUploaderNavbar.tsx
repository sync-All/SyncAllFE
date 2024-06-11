import Search from '../../assets/images/search-1.svg';
import Notification from '../../assets/images/Notification.svg';
import ArrowDowm from '../../assets/images/select-input-arrow.svg';
import UserImg from '../../assets/images/Photo (replace).svg';


interface MusicUploaderNavbarProp {
  activeItem: string

}
const MusicUploaderNavbar: React.FC<MusicUploaderNavbarProp> = ({activeItem}) => {
  return (
    <div>
      <nav className="lg:mx-8">
        <div className="flex mt-6 justify-between items-center mb-9">
          <div className="mr-auto">
            <h1 className="text-[#667185] text-[24px] font-formular-light leading-normal">
              {activeItem}
            </h1>
          </div>
          <div className="flex gap-[17px] items-center">
            <img src={Search} alt="" />
            <img src={Notification} alt="" />
            <div className="flex items-center lg:mx-3">
              <span className="">
                <img src={UserImg} alt="" className="" />
              </span>
              <span className="hidden lg:block ml-2">
                <p className="font-inter text-[14px] font-medium leading-5">
                  Asuquo Victor
                </p>
                <p className="font-inter text-[12px] font-regular leading-4">
                  @talktoasuquo
                </p>
              </span>
              <img src={ArrowDowm} alt="" className="hidden lg:block ml-4" />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MusicUploaderNavbar;
