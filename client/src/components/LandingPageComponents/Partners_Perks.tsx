import Budweiser from '../../assets/images/_Ñëîé_1.svg';
import Fox from '../../assets/images/_Ñëîé_1 (1).svg';
import FilmOne from '../../assets/images/_Ñëîé_1 (2).svg';
import Sony from '../../assets/images/_Ñëîé_1 (3).svg';
import Anakle from '../../assets/images/Frame.svg';
import Prime from '../../assets/images/Group 20.svg';
import Netflix from '../../assets/images/Group 20 (1).svg';
import VerifiedCheck from '../../assets/images/Verified Check.svg';
import MartinsUzor from '../../assets/images/Martins_Uzor.svg';
import MusicCover from '../../assets/images/music-cover.png';
import DiplomaVerified from '../../assets/images/Diploma Verified.svg';
import Rythme from '../../assets/images/rythme.png';
import MusicEclipse1 from '../../assets/images/music-cover-ellipse-1.svg';
import MusicEclipse2 from '../../assets/images/music-cover-ellipse-2.svg';
import MusicEclipse3 from '../../assets/images/music-cover-ellipse-3.svg';
import MusicEclipse4 from '../../assets/images/music-cover-ellipse-4.svg';
import Search from '../../assets/images/search-1.svg';


const PartnersPerks = () => {

  return (
    <section className="text-white mt-[228px] ">
      <section>
        <div>
          <h1 className="font-formular-regular text-center text-white text-[32px] leading-[24px] tracking-[-0.4px] mb-[72px] ">
            Trusted By
          </h1>

          <div className=" hidden md:flex flex-col justify-center items-center gap-[64px]  xl:max-w-[780px] mx-auto ">
            <div className="flex flex-wrap items-center gap-[70px] xl:gap-[140px]">
              <img
                src={Budweiser}
                alt=""
                className="max-h-[43px] max-w-[79px] "
              />
              <img src={Fox} alt="" className="max-h-[43px] max-w-[79px] " />
              <img
                src={FilmOne}
                alt=""
                className="max-h-[43px] max-w-[79px] "
              />
              <img src={Sony} alt="" className="max-h-[43px] max-w-[79px] " />
            </div>
            <div className="flex flex-wrap items-center gap-[38px] xl:gap-[76.66px]">
              <img src={Anakle} alt="" />
              <img src={Prime} alt="" />
              <img src={Netflix} alt="" />
            </div>
          </div>
        </div>

        {/* for mobile */}
        <div className="flex flex-col justify-center items-center gap-[64px]  xl:max-w-[780px] mx-auto md:hidden">
          <div className="flex flex-wrap items-center gap-[70px] xl:gap-[140px]">
            <img
              src={Budweiser}
              alt=""
              className="max-h-[43px] max-w-[79px] "
            />
            <img src={Fox} alt="" className="max-h-[43px] max-w-[79px] " />
            <img src={FilmOne} alt="" className="max-h-[43px] max-w-[79px] " />
            <img src={Sony} alt="" className="max-h-[43px] max-w-[79px] " />
            <img src={Anakle} alt="" className="max-h-[43px] max-w-[79px] " />
            <img src={Prime} alt="" className="max-h-[43px] max-w-[79px] " />
            <img src={Netflix} alt="" className="max-h-[43px] max-w-[79px] " />
          </div>
        </div>
      </section>
      <section className="mt-[230px] md:px-0 overflow-x-hidden  ">
        <div className="flex flex-col xl:flex-row justify-center gap-[24px] mx-auto flex-wrap xl:w-[1274px] px-[10px] ">
          <div className="flex flex-col gap-[24px] md:min-w-[500px] md:mx-auto  ">
            <div className="min-h-[392px] min-w-[300px] xl:max-w-[615px] bg-grey-600 rounded-[20px] py-[64px] md:max-w-[500px] ">
              <h3 className="font-formular-bold text-[20px] xl:text-[32px] text-grey-100 leading-[40px] pl-[14px] xl:pl-[64px] ">
                Safe <span className="font-Utile-bold text-grey-100">&</span>{' '}
                Secure <br />
                Payment Processing
              </h3>
              <p className="text-grey-300 text-[16px] xl:text-[18px] leading-[32px] font-formular-light mt-[24px] pl-[14px] xl:pl-[64px] ">
                Enjoy safe and efficient payment processing <br /> for
                hassle-free transactions.
              </p>
              <div className="pl-[14px] md:pl-[14px]  xl:pl-[64px]">
                <span className="flex bg-grey-200 w-fit rounded-[20px] gap-[18px] py-[24px] md:pl-[24px] md:pr-[41px] mt-[75px] rounded-br-none ">
                  <img src={VerifiedCheck} alt="" />
                  <span className="text-gray-100 md:min-w-[301px] ">
                    <h5 className="text-[16px] font-formular-medium md:leading-[40px]">
                      Payment Successful
                    </h5>
                    <p className="text-[14px] font-formular-light pr-[3px] ">
                      Your payment has been confirmed
                    </p>
                  </span>
                </span>
                <span className="flex bg-grey-700 w-fit rounded-tl-none rounded-[20px] gap-[18px] ml-[14px] md:py-[24px] md:pl-[24px] pl-[10px] pr-[20px] lg:pr-[40px] md:ml-[54px] max-w-[433px] xl:mr-[64px] ">
                  <img src={MartinsUzor} alt="" />
                  <span className="text-gray-100 md:min-w-[131px] md:mr-[68px] ">
                    <h5 className="text-[14px] md:text-[16px] font-formular-medium md:leading-[40px]">
                      Martins Uzor
                    </h5>
                    <p className="text-[14px] font-formular-light">
                      2nd May, 2024
                    </p>
                  </span>
                  <p className="m-auto font-Utile-bold text-[16px] ">
                    ₦ 3,500.00
                  </p>
                </span>
              </div>
            </div>
            <div className=" min-w-[300px] w-full xl:max-w-[615px] min-h-[392px] bg-grey-600 rounded-[20px] py-[64px] md:max-w-[500px] ">
              <h3 className="font-formular-bold text-[20px] xl:text-[32px] text-grey-100 leading-[40px] pl-[14px] xl:pl-[64px] ">
                Transparent <br /> Rights Management
              </h3>
              <p className="text-grey-300 text-[16px] xl:text-[18px] leading-[32px] font-formular-light mt-[24px] pl-[14px] xl:pl-[64px] ">
                Clear licensing terms and compensation details <br /> ensure
                trust and confidence in every transaction
              </p>
              <div className="mt-[54px] xl:ml-[64px] relative ">
                <span className="flex bg-yellow xl:p-[8px] gap-[8px] w-fit text-black2 rounded-[5px] absolute top-[-22px] ">
                  <img src={DiplomaVerified} alt="" />
                  <p className="uppercase text-[16px] xl:text-[18px] font-Utile-bold ">
                    Cleared
                  </p>
                </span>
                <span className="flex flex-col xl:pl-[38px] pb-[18px] xl:pr-[46px] pt-[23px] bg-grey-200 w-fit rounded-[20px] ml-[14px] xl:flex-row ">
                  <img src={MusicCover} alt="" />
                  <span className="ml-[11px] mr-[156px] ">
                    <p className="text-grey-100 text-[16px] xl:text-[18px] uppercase font-Utile-bold ">
                      Album 02
                    </p>
                    <p className="text-grey-400 uppercase font-Utile-medium ">
                      new artist
                    </p>
                  </span>
                  <span className="flex flex-col gap-[9px] ">
                    <img src={Rythme} alt="" />
                    <p className="text-right text-[14px] font-Utile-regular uppercase text-grey-400  ">
                      3:05
                    </p>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[24px] md:min-w-[500px] md:mx-auto ">
            <div className="min-h-[392px] min-w-[300px] xl:min-w-[615px] bg-grey-600 rounded-[20px] py-[64px] md:max-w-[500px] ">
              <h3 className="font-formular-bold text-[20px] xl:text-[32px] text-grey-100 leading-[40px] pl-[14px] xl:pl-[64px]">
                Diverse <br /> Music Library
              </h3>
              <p className="text-grey-300 text-[16px] xl:text-[18px] leading-[32px] font-formular-light mt-[24px] pl-[14px] xl:pl-[64px] ">
                Explore a wide array of authentic African <br /> music genres
                and styles for your projects.
              </p>
              <div className="flex pl-[14px] xl:pl-[64px] mt-[43px] gap-[11px] items-center flex-wrap ">
                <img src={MusicEclipse1} alt="" />
                <img src={MusicEclipse2} alt="" />
                <img src={MusicEclipse3} alt="" />
                <img src={MusicEclipse4} alt="" />
                <span className="ml-[9px] ">
                  <p className="text-[16px] text-grey-100 font-formular-medium ">
                    3m &#43;
                  </p>
                  <p className="text-[14px] font-formular-light text-grey-300 ">
                    Exclusive Tracks
                  </p>
                </span>
              </div>
            </div>
            <div className="min-h-[520px] min-w-[300px]  xl:h-[615px] xl:min-w-[615px] bg-grey-600 rounded-[20px] pt-[64px] pb-[68.4px] md:max-w-[500px] ">
              <h3 className="font-formular-bold text-[20px] xl:text-[32px] text-grey-100 leading-[40px] pl-[14px] xl:pl-[64px] w-full ">
                AI Recommendations <br />{' '}
                <span className="text-yellow font-Utile-bold">
                  (Coming Soon)
                </span>{' '}
              </h3>
              <p className="text-grey-300 text-[16px] xl:text-[18px] leading-[32px] font-formular-light mt-[24px] pl-[14px] xl:pl-[64px] ">
                Get personalized music suggestions tailored to <br /> your
                preferences, saving you time.
              </p>
              <div className="mt-[45px] bg-grey-200 mx-[20px] xl:mx-[60px] pt-[17.4px]  rounded-[14px]  ">
                <p className="bg-[#FFF0E9] py-[6px] px-[9px] w-fit text-black2 rounded-[4.35px] font-formular-regular text-[16px] ml-[17.4px] ">
                  AI SEARCH
                </p>
                <p className="p-[21.7px] text-grey-500 text-[17px] font-formular-regular">
                  Koleyewon - Naira Marley{' '}
                  <span className="border-yellow inline-block border-l-2 h-8 align-middle animate-pulse"></span>
                </p>
                <div className="border-b-[1.087px] bg-[#52526f40] opacity-20  "></div>
                <span className="my-[4.5px] mx-[6.2px] ">
                  <p className=" text-[#DCD8FE90] text-[14px] font-Utile-medium pl-[5px] ">
                    Search for “Koleyewon - Naira Marley”
                  </p>
                  <span className="mt-[8.81px] py-[11.962px] px-[15.224px] flex bg-[#9595BD20] mx-[8px] rounded-[6.525px] items-center ">
                    <img src={Search} alt="" className="mr-[17.4px] " />
                    <p className="mr-[8px] text-grey-500 text-[11px] md:text-[14.137px] font-formular-regular ">
                      43 similar sounds
                    </p>
                    <p className="text-[14.137px] font-formular-regular text-[#DCD8FE90]">
                      See results
                    </p>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col xl:flex-row mt-[24px] gap-[24px] px-[10px] mx-auto xl:w-[1274px]">
        <div className=" flex flex-col px-[20px] xl:px-[85px] pt-[64px] pb-[76px] rounded-[20px] bg-grey-600 gap-[48px] min-w-[300px] w-full mx-auto md:max-w-[500px] xl:max-w-[67.6%]  ">
          <h3 className="text-grey-100 text-[32px] font-Utile-bold leading-[26px] xl:leading-[56px] xl:text-[56px] tracking-[-0.792px] ">
            Our quest is clear: to give creators control, and to forge a path
            where integrity triumphs over exploitation.
          </h3>
          <p className="font-Utile-light text-[18px] xl:text-[32px] text-[#E4E7EC] leading-[20px] xl:leading-[48px] tracking-[-0.792px] ">
            SyncAll is more than a platform – it's a revolution. Here, what was
            once lost is found anew your voice, your vision, your sovereignty
          </p>
        </div>
        <div className="flex flex-col px-[20px] xl:px-[76px] xl:pl-[56px] py-[64px] rounded-[20px] bg-grey-600 gap-[48px] min-w-[300px] w-full mx-auto md:max-w-[500px] xl:max-w-[30.4%] xl:min-h-[531px] xl:w-fit ">
          <ul className="flex flex-col gap-[43.16px] font-formular-regular ">
            <li className="flex items-center text-[25.83px] gap-[8.61px] leading-[31.6px]  ">
              <span className="text-[34.45px] text-[#E4E7EC] font-Bebasneue-regular uppercase ">
                No
              </span>{' '}
              legal mazes
            </li>
            <li className="flex items-center text-[24.83px] gap-[8.61px] leading-[31.6px]">
              <span className="text-[34.45px] text-[#E4E7EC] font-BebasNeue-regular uppercase ">
                No
              </span>{' '}
              settling for less
            </li>
            <li className="flex items-center text-[25.83px] gap-[8.61px] leading-[31.6px]">
              <span className="text-[34.45px] text-[#E4E7EC] font-BebasNeue-regular uppercase ">
                NO
              </span>
              sneaky fees
            </li>
            <li className="flex items-center text-[25.83px] gap-[8.61px] leading-[31.6px] ">
              <span className="text-[34.45px] text-[#E4E7EC] font-BebasNeue-regular uppercase ">
                NO
              </span>
              treasure hunts
            </li>
            <li className="flex items-center text-[25.83px] gap-[8.61px] leading-[31.6px] ">
              <span className="text-[34.45px] text-[#E4E7EC] font-BebasNeue-regular uppercase ">
                NO
              </span>
              velvet ropes
            </li>
            <li className="flex items-center text-[25.83px] gap-[8.61px] leading-[31.6px] ">
              <span className="text-[34.45px] text-[#E4E7EC] font-BebasNeue-regular uppercase ">
                NO
              </span>
              dusty archives
            </li>
          </ul>
        </div>
      </section>
      
    </section>
  );
};

export default PartnersPerks;
