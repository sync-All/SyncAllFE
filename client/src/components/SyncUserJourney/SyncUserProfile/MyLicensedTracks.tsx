import MusicImg from '../../../assets/images/3000x3000.jpg.png';
import Menu from '../../../assets/menu-dot-square.svg';
import ViewMore from '../../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../../assets/images/document-add.svg';
import MusicWave from '../../../assets/images/musicwave.svg';
import Favorite from '../../../assets/images/favorite.svg';
import Copy from '../../../assets/images/copy-link.svg';
import AddMusic from '../../../assets/images/add-music.svg';
import Closemenu from '../../../assets/images/close-circle.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MyLicensedTracks = () => {
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
      actions: [Favorite, Copy],
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
      actions: [Favorite, Copy],
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
      actions: [Favorite, Copy],
    },
  ];

  return (
    <section className="mt-[63px] relative mb-[485px]">
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
              <button
                className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]"
                onClick={redirectMetadata}
              >
                See Song{' '}
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
  );
};

export default MyLicensedTracks;
