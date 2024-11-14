import Menu from '../assets/images/menu-dot-square.svg';
import ViewMore from '../assets/images/round-arrow-right-up.svg';
import getQuote from '../assets/images/document-add.svg';
import Favorite from '../assets/images/favorite.svg';
import Copy from '../assets/images/copy-link.svg';
import AddMusic from '../assets/images/add-music.svg';
import Closemenu from '../assets/images/close-circle.svg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { useSyncUser } from '../../../Context/syncUserData';
import MusicPlayer from './MusicPlayer';



const UserLicensedTracks = () => {
  // const { user } = useSyncUser();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const redirectMetadata = () => {
    navigate('/metadata');
  };

  // const licensedTracks = user?.user?.totalLicensedTracks;

  const actions = [Favorite, Copy];

  const licensedTracks = [
    {
      artWork: 'path/to/artwork1.jpg',
      trackTitle: 'Track Title 1',
      mainArtist: 'Artist 1',
      trackLink: 'path/to/track1.mp3',
      duration: '3:45',
      producers: 'Producer 1, Producer 2',
      genre: 'Pop',
      mood: ['Happy', 'Energetic'],
    },
    {
      artWork: 'path/to/artwork2.jpg',
      trackTitle: 'Track Title 2',
      mainArtist: 'Artist 2',
      trackLink: 'path/to/track2.mp3',
      duration: '4:10',
      producers: 'Producer 3',
      genre: 'Rock',
      mood: ['Exciting', 'Bold'],
    },
    {
      artWork: 'path/to/artwork3.jpg',
      trackTitle: 'Track Title 3',
      mainArtist: 'Artist 3',
      trackLink: 'path/to/track3.mp3',
      duration: '5:00',
      producers: 'Producer 4, Producer 5',
      genre: 'Jazz',
      mood: ['Calm', 'Smooth'],
    },
    {
      artWork: 'path/to/artwork4.jpg',
      trackTitle: 'Track Title 4',
      mainArtist: 'Artist 4',
      trackLink: 'path/to/track4.mp3',
      duration: '3:25',
      producers: 'Producer 6',
      genre: 'Classical',
      mood: ['Elegant', 'Peaceful'],
    },
    {
      artWork: 'path/to/artwork5.jpg',
      trackTitle: 'Track Title 5',
      mainArtist: 'Artist 5',
      trackLink: 'path/to/track5.mp3',
      duration: '2:55',
      producers: 'Producer 7, Producer 8',
      genre: 'Hip Hop',
      mood: ['Cool', 'Confident'],
    },
  ];


  return (
    <section className="mt-[63px] relative mb-[485px]">
      <div className=" hidden flex-col gap-[56px] lg:flex">
        {licensedTracks && licensedTracks.length > 0 ? (
          licensedTracks.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between"
              onClick={redirectMetadata}
            >
              <span className="flex gap-3">
                <img src={detail?.artWork} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail?.trackTitle}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail?.mainArtist}
                  </p>
                </span>
              </span>
              <div className="items-center flex">
                <MusicPlayer trackLink={detail?.trackLink} />
              </div>
              <span className="flex gap-12">
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail?.duration || 'N/A'}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail?.producers || 'N/A'}
                  </p>
                </span>
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail?.genre || 'N/A'}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail?.mood.join(', ') || 'N/A'}
                  </p>
                </span>
              </span>
              <span className="flex gap-6">
                {actions.map((action, actionIndex) => (
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
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-[#475367] font-Utile-regular text-[16px] leading-[24px]">
              You have no licensed tracks
            </p>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-6">
        {licensedTracks && licensedTracks.length > 0 ? (
          licensedTracks.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between  "
            >
              <span className="flex gap-3">
                <img src={detail?.artWork} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail.trackTitle}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail.mainArtist}
                  </p>
                </span>
              </span>
              <span>
                <img src={Menu} alt="" onClick={closeMenu} />
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-[#475367] font-Utile-regular text-[16px] leading-[24px]">
              You have no licensed tracks
            </p>
          </div>
        )}

        {}
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

export default UserLicensedTracks;
