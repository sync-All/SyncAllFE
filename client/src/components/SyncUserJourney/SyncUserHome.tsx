
import Background from '../../assets/images/user-homepage-head.png';
import BackgroundMobile from '../../assets/images/user-homepage-mobile-head.png';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
// import Play from '../../assets/images/copy-link.svg';
// import Pause from '../../assets/images/add-music.svg';
// import AddMusic from '../../assets/images/add-music.svg';
import Menu from '../../assets/menu-dot-square.svg';
import ViewMore from '../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../assets/images/document-add.svg';
import { useParams } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import Closemenu from '../../assets/images/close-circle.svg';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Liked from '../../assets/images/liked.svg';
import MusicSearch from './MusicSearch';
import MusicPlayer from '../MusicPlayer';
import { useSyncUser } from '../../Context/syncUserData';
const SyncUserHome = () => {
    const track = useSyncUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const [musicDetails, setMusicDetails] = useState<TrackDetails[]>([]);
const [likedTrack, setLikedTrack] = useState<{ [key: string]: boolean }>({});
  const { id } = useParams();
 

  interface TrackDetails {
    musicImg: string;
    trackTitle: string;
    _id: string;
    trackLink: string;
    mainArtist: string;
    musicWaves: string[];
    duration: string;
    writers: string;
    genre: string;
    mood: string;
    actions: string[];
    artWork: string;
  }

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  

 const handleLikes = async (trackId: string) => {
   const token = localStorage.getItem('token');
   const urlVar = import.meta.env.VITE_APP_API_URL;
   const apiUrl = `${urlVar}/liketrack/${trackId}`;
   const config = {
     headers: {
       Authorization: `${token}`,
     },
   };

   try {
     const res = await axios.get(apiUrl, config);
     toast.success(res.data);
     setLikedTrack((prevState) => ({
       ...prevState,
       [trackId]: true, 
     }));
   } catch (error) {
     const axiosError = error as AxiosError<ResponseData>;

     toast.error(
       (axiosError.response && axiosError.response.data
         ? axiosError.response.data.message || axiosError.response.data
         : axiosError.message || 'An error occurred'
       ).toString()
     );
   }
 };

useEffect(() => {
  const trackAdded = track.user?.user.tracklist || [];

  // Create a map of track IDs to their liked status
  const likedTracksFromApi = trackAdded.reduce(
    (acc: { [key: string]: boolean }, trackItem) => {
      acc[trackItem._id] = true; // Mark each track as liked
      return acc;
    },
    {}
  );

  setLikedTrack(likedTracksFromApi);
}, [id, track]);



 

  interface ResponseData {
    message?: string;
  }

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
        const allTracks: TrackDetails[] = res.data.allTracks;
        console.log(allTracks);

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
  }, [id]);

  
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };





  return (
    <div className="relative">
      <div
        className={`px-5 xl:px-20 mb-[331px] transition-all duration-300 ${
          menuOpen ? 'overflow-hidden' : ''
        }`}
      >
        <section>
          <MusicSearch />
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
              <div key={index} className="flex items-center w-full ">
                <Link
                  to={`metadata/${detail?._id}`}
                  className="flex gap-3 w-[25%]"
                >
                  <img
                    src={detail?.artWork}
                    alt=""
                    className="h-[50px] w-[50px] object-cover"
                  />
                  <span>
                    <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                      {detail.trackTitle}
                    </h4>
                    <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                      {detail.mainArtist}
                    </p>
                  </span>
                </Link>

                <MusicPlayer
                  trackLink={detail.trackLink}
                  songId={detail._id}
                  duration={10}
                  containerStyle="mt-0 flex items-center gap-3"
                  buttonStyle="w-4 cursor-pointer"
                  waveStyle="w-[70px]"
                />
                <span className="flex gap-12 w-[25%] items-start ml-[5%]">
                  <span>
                    <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                      {detail.duration || '3 minutes, 33 seconds'}
                    </p>
                    <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px] truncate max-w-16">
                      {truncateText(detail.writers || 'N/A', 5)}
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
                <span className="flex gap-6 w-[10%] justify-center">
                  <img
                    src={likedTrack[detail._id] ? Liked : Favorite}
                    alt=""
                    onClick={() => handleLikes(detail._id)}
                  />
                  {/* <img src={AddMusic} alt="" /> */}
                  <img src={Copy} alt="" className="cursor-pointer" />
                </span>
                <span className="gap-[12px] flex w-[25%] justify-center">
                  <Link to={`metadata/${detail?._id}`}>
                    <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      View More
                    </button>
                  </Link>
                  <Link to={`/home/quote/${detail._id}`}>
                    <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      Get Quote
                    </button>
                  </Link>
                </span>
              </div>
            ))}
          </div>


          {/* Mobile */}
          <div className="lg:hidden flex flex-col gap-6">
            {musicDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center w-full justify-between"
              >
                <span className="flex gap-3">
                  <Link to={`metadata/${detail?._id}`}>
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



          {menuOpen &&
            musicDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <div
                  className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10"
                  onClick={closeMenu}
                ></div>
                <div className="h-full z-50">
                  <div className="fixed bottom-0 left-0 right-0 bg-white z-70 h-[40%] overflow-y-auto p-8">
                    <span className="flex justify-between">
                      <h4 className="text-[#81909D] text-[16px] font-formular-regular leading-6">
                        Song Options
                      </h4>
                      <img src={Closemenu} alt="" onClick={closeMenu} />
                    </span>
                    <ul className="mt-8 flex flex-col gap-8">
                      <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                        <img src={Favorite} alt="" />
                        Favorite
                      </li>
                      {/* <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                        <img src={AddMusic} alt="" />
                        Add to Library
                      </li> */}
                      <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                        <img src={Copy} alt="" />
                        Copy Track Link
                      </li>
                      <Link to={`metadata/${detail?._id}`}>
                        <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                          <img src={ViewMore} alt="" />
                          View More
                        </li>
                      </Link>
                      <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                        <img src={getQuote} alt="" />
                        Get Quote
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            ))}
        </section>
      </div>
    </div>
  );
};

export default SyncUserHome;
