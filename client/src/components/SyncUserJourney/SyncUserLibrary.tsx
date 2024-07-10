import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import Background from '../../assets/images/bg-plain.png';
import MusicImg from '../../assets/images/3000x3000.jpg.png';
import Menu from '../../assets/menu-dot-square.svg';
import ViewMore from '../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../assets/images/document-add.svg';
import MusicWave from '../../assets/images/musicwave.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
import AddMusic from '../../assets/images/add-music.svg';
import Closemenu from '../../assets/images/close-circle.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SyncUserLibrary = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const redirectMetadata = () => {
    navigate('/metadata');
  };

  const musicDetails = [
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
  ];

  return (
    <div className="px-5 xl:px-20 mb-[221px]">
      <div>
        <div className="relative w-full my-24px">
          <input
            type="text"
            placeholder="Search for music, genres, moods, keywords or lyrics"
            className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
          />
          <img
            src={Search}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
        <div className="mt-[32px]">
          <ul className="flex gap-[35px] items-center">
            <li className="flex gap-[7px] items-center uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
              <Genre />
            </li>
            <li className="flex gap-[7px] items-center uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
              <Mood />
            </li>
            <li className="flex gap-[7px] items-center uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
              <Instrument />
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="relative mt-[55px]">
          <span className="w-full">
            <img
              src={Background}
              alt=""
              className="h-[400px] lg:h-full w-full"
            />
          </span>
          <div className="flex gap-2 top-0 mt-6 md:top-[35%] flex-col absolute lg:top-[43%] md:transform md:-translate-y-1/2 ml-6">
            <h2 className="text-[40px] lg:text-[64px] leading-[45px] xl:leading-[78px] font-gitSans font-normal text-grey-100">
              Your Personal Tracks Collection
            </h2>
            <p className="font-formular-regular text-[16px] xl:text-[24px] leading-[24px] xl:leading-[32px] text-grey-300  ">
              Access all the tracks you've added from the music library.
            </p>
          </div>
        </div>
      </div>
      <section className="mt-[63px] relative">
        <h3 className="text-[#27282A] text-[24px] font-formular-bold leading-6 mb-[45px]">
          Tracks List
        </h3>
        <div className=" hidden flex-col gap-[56px] lg:flex">
          {musicDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between"
              onClick={redirectMetadata}
            >
              <span className="flex gap-3">
                <img src={detail.musicImg} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail.title}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail.artist}
                  </p>
                </span>
              </span>
              <div className="items-center flex">
                {detail.musicWaves.map((wave, waveIndex) => (
                  <img key={waveIndex} src={wave} alt="" />
                ))}
              </div>
              <span className="flex gap-12">
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail.duration}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail.bpm}
                  </p>
                </span>
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail.genre}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail.mood}
                  </p>
                </span>
              </span>
              <span className="flex gap-6">
                {detail.actions.map((action, actionIndex) => (
                  <img key={actionIndex} src={action} alt="" />
                ))}{' '}
              </span>
              <span className="gap-[12px] flex">
                <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                  View More
                </button>
                <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                  License
                </button>
              </span>
            </div>
          ))}
        </div>
        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-6">
          {musicDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between  "
            >
              <span className="flex gap-3">
                <img src={detail.musicImg} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail.title}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail.artist}
                  </p>
                </span>
              </span>
              <span>
                <img src={Menu} alt="" onClick={closeMenu} />
              </span>
            </div>
          ))}
        </div>

        {menuOpen && (
          <>
            <div
              className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
              onClick={closeMenu}
            ></div>

            <div className=" h-full z-50">
              <div className="fixed bottom-0 left-0 right-0 bg-white z-70 h-1/2 overflow-y-auto p-8">
                <span className="flex justify-between">
                  <h4 className="text-[#81909D] text-[16px] font-formular-regular leading-6 ">
                    Song Options
                  </h4>
                  <img src={Closemenu} alt="" onClick={closeMenu} />
                </span>
                <ul className="mt-8 flex flex-col gap-8 ">
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                    <img src={Favorite} alt="" />
                    Favorite
                  </li>
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                    {' '}
                    <img src={AddMusic} alt="" />
                    Add to Library
                  </li>
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                    <img src={Copy} alt="" />
                    Copy Track Link
                  </li>
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                    <img src={ViewMore} alt="" />
                    View More
                  </li>
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                    <img src={getQuote} alt="" />
                    Get Qoute
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default SyncUserLibrary;
