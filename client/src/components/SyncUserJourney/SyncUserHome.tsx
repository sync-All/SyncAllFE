import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import Background from '../../assets/images/user-homepage-head.png';
import BackgroundMobile from '../../assets/images/user-homepage-mobile-head.png';
import MusicWave from '../../assets/images/musicwave.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
import Play from '../../assets/images/copy-link.svg';
import Pause from '../../assets/images/add-music.svg';
import AddMusic from '../../assets/images/add-music.svg';
import MusicImg from '../../assets/images/3000x3000.jpg.png';
import Menu from '../../assets/menu-dot-square.svg';
import ViewMore from '../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../assets/images/document-add.svg';
import { useEffect, useState } from 'react';
import Closemenu from '../../assets/images/close-circle.svg';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const SyncUserHome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  interface MusicDetail {
    musicImg: string;
    trackTitle: string;
    _id: string;
    trackLink: string;
    mainArtist: string;
    musicWaves: string[];
    duration: string;
    bpm: string;
    genre: string;
    mood: string;
    actions: string[];
  }

  const [musicDetails, setMusicDetails] = useState<MusicDetail[]>([]);
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null);

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const navigate = useNavigate();

  // const redirectMetadata = () => {
  //   navigate('/metadata/');
  // };
  interface ResponseData {
    message?: string;
  }

  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/allSongs`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        const res = await axios.get(apiUrl, config);
        setMusicDetails(res.data.allTracks);
        console.log(res.data.allTracks);
        // Do something with the response if needed
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;

        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      }
    };
    fetchData();
  }, []);

  const musicWaves = [MusicWave, MusicWave, MusicWave];
  const actions = [Favorite, AddMusic, Copy];
  // const handlePlayPause = (id: string, url: string) => {
  //   try {
  //     let audioElement = audioRefs.current.get(id);

  //     if (audioElement) {
  //       if (playingTrackId === id) {
  //         audioElement.pause();
  //         setPlayingTrackId(null);
  //       } else {
  //         if (playingTrackId) {
  //           const currentPlayingAudio = audioRefs.current.get(playingTrackId);
  //           currentPlayingAudio?.pause();
  //         }
  //         audioElement.play();
  //         setPlayingTrackId(id);
  //       }
  //     } else {
  //       audioElement = new Audio(url);
  //       audioRefs.current.set(id, audioElement);
  //       audioElement.play();
  //       setPlayingTrackId(id);
  //     }
  //   } catch (error) {
  //     console.error('Error in handlePlayPause:', error);
  //   }
  // };
  const handlePlayPause = (id: string, url: string) => {
    try {
      if (playingTrackId === id) {
        setCurrentTrackUrl(null);
        setPlayingTrackId(null);
      } else {
        setCurrentTrackUrl(url);
        setPlayingTrackId(id);
      }
    } catch (error) {
      console.error('Error in handlePlayPause:', error);
    }
  };

  return (
    <div className="relative">
      {' '}
      <div
        className={`px-5 xl:px-20 mb-[331px] transition-all duration-300 ${
          menuOpen ? 'overflow-hidden' : ''
        }`}
      >
        <section>
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
          <div className="relative mt-[55px]">
            <span className="w-full">
              <img src={Background} alt="" className="hidden md:block w-full" />
              <img src={BackgroundMobile} alt="" className="w-full md:hidden" />
            </span>
            <div className="flex gap-2 top-0 mt-6 md:top-[35%] flex-col absolute lg:top-[43%] md:transform md:-translate-y-1/2 ml-6 md:ml-16">
              <h2 className="text-[40px] lg:text-[64px] leading-[45px] xl:leading-[78px] font-gitSans font-normal text-grey-100">
                Explore Our <br /> Music Library
              </h2>
              <p className="font-formular-regular text-[16px] xl:text-[24px] leading-[24px] xl:leading-[32px] md:max-w-[550px] text-grey-300 max-w-[242px] ">
                Discover, listen, and license authentic african music for your
                projects
              </p>
            </div>
          </div>
        </section>
        <section className="mt-[63px] relative">
          <h3 className="text-[#27282A] text-[24px] font-formular-bold leading-6 mb-[45px]">
            Browse Songs
          </h3>

          <div className=" hidden flex-col gap-[56px] lg:flex">
            {musicDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center w-full justify-between"
              >
                <Link to={`metadata/${detail?._id}`} className="flex gap-3">
                  <img src={MusicImg} alt="" />
                  <span>
                    <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                      {detail.trackTitle}
                    </h4>
                    <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                      {detail.mainArtist}
                    </p>
                  </span>
                </Link>
                <div className="items-center flex">
                  {musicWaves.map((wave, waveIndex) => (
                    <img key={waveIndex} src={wave} alt="" />
                  ))}
                  {playingTrackId === detail._id ? (
                    <img
                      src={Pause}
                      alt="Pause"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(detail._id, detail.trackLink);
                      }}
                      className="cursor-pointer"
                    />
                  ) : (
                    <img
                      src={Play}
                      alt="Play"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(detail._id, detail.trackLink);
                      }}
                      className="cursor-pointer"
                    />
                  )}
                  {currentTrackUrl && (
                    <div className="mt-4">
                      <iframe
                        src={currentTrackUrl}
                        width="300"
                        height="380"
                        frameBorder="0"
                        allow="encrypted-media"
                        className="w-full"
                      ></iframe>
                    </div>
                  )}
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
                  {actions.map((action, actionIndex) => (
                    <img key={actionIndex} src={action} alt="" />
                  ))}{' '}
                </span>

                <span className="gap-[12px] flex">
                  <Link to={`metadata/${detail?._id}`}>
                    <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      View More
                    </button>
                  </Link>

                  <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                    Get Quote
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
                  <Link to={`metadata/${detail?._id}`}>
                    {' '}
                    <img src={detail.musicImg} alt="" />
                    <span>
                      <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                        {detail.trackTitle}
                      </h4>
                      <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                        {detail.mainArtist}
                      </p>
                    </span>
                  </Link>
                </span>
                <span>
                  <img src={Menu} alt="" onClick={closeMenu} />
                </span>
              </div>
            ))}
          </div>

          {menuOpen && musicDetails.map((detail, index) => (
            <div key={index}>
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
                    <Link to={`metadata/${detail?._id}`} ><li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                      <img src={ViewMore} alt="" />
                      View More
                    </li></Link>
                    
                    <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4 ">
                      <img src={getQuote} alt="" />
                      Get Qoute
                    </li>
                  </ul>
                </div>
              </div>
            </div>
           ))}
          
        </section>
      </div>
    </div>
  );
};

export default SyncUserHome;
