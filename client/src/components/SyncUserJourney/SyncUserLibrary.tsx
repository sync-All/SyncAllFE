import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Background from '../../assets/images/bg-plain.png';
import Menu from '../../assets/menu-dot-square.svg';
import ViewMore from '../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../assets/images/document-add.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
// import AddMusic from '../../assets/images/add-music.svg';
import Closemenu from '../../assets/images/close-circle.svg';
import { Link } from 'react-router-dom';
import Liked from '../../assets/images/liked.svg';
import { useSyncUser } from '../../Context/syncUserData';
import MusicPlayer from '../MusicPlayer';
import LoadingAnimation from '../../constants/loading-animation';

interface ResponseData {
  message?: string;
}

const SyncUserLibrary: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);

  const { user, loading } = useSyncUser();
  const track = user;

  const trackAdded = track?.user.tracklist || [];

  const closeMenu = () => setMenuOpen(!menuOpen);

  const openMenu = (trackId: string) => {
    setSelectedTrackId(trackId);
    setMenuOpen(true);
  };

  const delay = (callback: () => void, ms: number) => {
    setTimeout(callback, ms);
  };

  const refresh = () => {
    delay(() => {
      window.location.reload();
    }, 5000);
  };

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/metadata/${id}`);
    toast.success('Link copied to clipboard');
  };

  const unlike = async (trackId: string) => {
    const token = localStorage.getItem('token');
    const apiUrl = `${import.meta.env.VITE_APP_API_URL}/unliketrack/${trackId}`;

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      const res = await axios.get(apiUrl, config);
      toast.success(res.data);
      refresh();
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

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="px-5 xl:px-20 mb-[221px]">
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
        <div className="hidden flex-col gap-[56px] lg:flex">
          {trackAdded.length > 0 ? (
            trackAdded.map((detail, index) => (
              <div key={index} className="flex items-center w-full ">
                <Link
                  to={`/metadata/${detail?._id}`}
                  className="flex gap-3 w-[25%]"
                >
                  <img
                    src={detail.artWork}
                    alt=""
                    className="h-[50px] w-[50px] object-cover "
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
                  duration={30}
                  containerStyle="mt-0 flex items-center gap-3"
                  buttonStyle="w-4 cursor-pointer"
                  waveStyle="w-[300px]"
                />

                <span className="flex gap-12 w-[25%] items-start ml-[5%]">
                  <span className="w-[50%]">
                    <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                      {detail.duration || 'N/A'}
                    </p>
                    <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                      {detail.producers || 'N/A'}
                    </p>
                  </span>
                  <span className="w-[50%]">
                    <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                      {detail.genre}
                    </p>
                    <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                      {detail.mood.join(', ')}
                    </p>
                  </span>
                </span>
                <span className="flex gap-6 w-[10%] justify-center">
                  <button
                    onClick={() => unlike(detail._id)}
                    className="cursor-pointer"
                  >
                    <img src={Liked} alt="Like" />
                  </button>
                  <img
                    src={Copy}
                    onClick={() => handleCopyLink(detail._id)}
                    alt=""
                    className="cursor-pointer"
                  />
                </span>
                <span className="gap-[12px] flex w-[25%] justify-center">
                  <Link to={`/metadata/${detail?._id}`}>
                    <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      View More
                    </button>
                  </Link>
                  <Link to={`/quote/${detail._id}`}>
                    <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      License
                    </button>
                  </Link>
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-[#475367] font-Utile-regular text-[16px] leading-[24px]">
                You have no liked tracks in your library
              </p>
            </div>
          )}
        </div>
        {/* Mobile */}
        <div className="lg:hidden flex flex-col gap-6">
          {trackAdded.length > 0 ? (
            trackAdded.map((detail, index) => (
              <div
                key={index}
                className="flex items-center w-full justify-between"
              >
                <span className="flex gap-3">
                  <Link to={`/metadata/${detail?._id}`} className="flex gap-4">
                    <img
                      src={detail.artWork}
                      alt=""
                      className="h-12 w-12 object-cover"
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
                </span>
                <span>
                  <img src={Menu} alt="" onClick={() => openMenu(detail._id)} />
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-[#475367] font-Utile-regular text-[16px] leading-[24px]">
                You have no liked tracks in your library
              </p>
            </div>
          )}
        </div>

        {menuOpen && selectedTrackId && (
          <React.Fragment>
            <div
              className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-20"
              onClick={closeMenu}
            ></div>

            <div className="h-full z-50">
              <div className="fixed bottom-0 left-0 right-0 bg-white z-70 h-[40%]  overflow-y-auto p-8">
                <span className="flex justify-between">
                  <h4 className="text-[#81909D] text-[16px] font-formular-regular leading-6">
                    Song Options
                  </h4>
                  <img src={Closemenu} alt="" onClick={closeMenu} />
                </span>
                <ul className="mt-8 flex flex-col gap-8 ">
                  <li
                    className="text-black font-formular-light text-[24px] leading-6 flex gap-4"
                    onClick={() => unlike(selectedTrackId)}
                  >
                    <img src={Favorite} alt="" />
                    Remove from Favorite
                  </li>
                  {/* <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                      <img src={AddMusic} alt="" />
                      Add to Library
                    </li> */}
                  <li
                    className="text-black font-formular-light text-[24px] leading-6 flex gap-4"
                    onClick={() => handleCopyLink(selectedTrackId)}
                  >
                    <img src={Copy} alt="" />
                    Copy Track Link
                  </li>
                  <Link to={`/metadata/${selectedTrackId}`}>
                    <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                      <img src={ViewMore} alt="" />
                      View More
                    </li>
                  </Link>
                  <Link
                    to={`/quote/${selectedTrackId}`}
                    className="text-black font-formular-light text-[24px] leading-6 flex gap-4"
                  >
                    <img src={getQuote} alt="" />
                    Get Quote
                  </Link>
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}
      </section>
    </div>
  );
};

export default SyncUserLibrary;
