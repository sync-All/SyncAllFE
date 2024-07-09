import MusicImg from '../../assets/images/musicImage.png';
import MusicWave from '../../assets/images/musicwave.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
import AddMusic from '../../assets/images/add-music.svg';
import PlayButton from '../../assets/images/playbtn.svg';

const TrackMetadata = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:gap-16 mx-5 lg:mx-20">
        <div className="lg:w-[40%]">
          <img src={MusicImg} alt="" className="w-full object-cover" />
        </div>
        <div className="flex flex-col mt-11 lg:mt-0 lg:w-[60%]">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex flex-col gap-2 lg:gap-4 w-full">
              <p className="text-[#475367] text-[32px] lg:text-[56px] font-formular-bold ">
                Original Remix
              </p>
              <p className="text-[#667185] text-[16px] lg:text-[24px] font-Utile-regular  ">
                GBASKY Feat. MOELOGO
              </p>
            </div>

            <div className="flex mt-[27px] gap-[25px] items-center lg:items-start ">
              <img src={Favorite} alt="" />
              <img src={AddMusic} alt="" />
              <img src={Copy} alt="" />
              <button className="w-fit lg:min-w-fit text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px] lg:w-full">
                Get Quote
              </button>
            </div>
          </div>

          <div className=" flex items-center justify-between mt-20">
            <img src={PlayButton} alt="" />
            <span className="items-center flex">
              <img src={MusicWave} alt="" />
              <img src={MusicWave} alt="" />
              <img src={MusicWave} alt="" className="hidden xl:block" />
              <img src={MusicWave} alt="" className="hidden xl:block" />
              <img src={MusicWave} alt="" className="hidden xl:block" />
            </span>
            <p className="font-Utile-medium text-[16px] leading-4 ">3:33</p>
          </div>
          <div className="mt-[93px] mb-[163px]">
            <h4 className="font-formular-regular text-[24px] leading-6 text-[#344054] mb-2 ">
              Track Details
            </h4>
            <hr />
            <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between ">
              <div className="flex flex-col gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Genre</p>
                  <p className="text-[#475367]">RnB</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Composed by</p>
                  <p className="text-[#475367]">Adepoju Adeyin</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Duration</p>
                  <p className="text-[#475367]">3 minutes, 33 seconds</p>
                </span>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Mood</p>
                  <p className="text-[#475367]">Dreamy, Love</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Produced by</p>
                  <p className="text-[#475367]">P.Prime</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release Label</p>
                  <p className="text-[#475367]">DMCE</p>
                </span>
              </div>
              <div className="flex  flex-col justify-between gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Tempo</p>
                  <p className="text-[#475367]">128 BPM</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release date</p>
                  <p className="text-[#475367]">Jan 22, 2021</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Featured Instrument</p>
                  <p className="text-[#475367]">Talking Drum</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMetadata;
