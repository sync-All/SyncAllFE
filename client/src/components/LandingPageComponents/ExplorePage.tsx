import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Search from '../../assets/images/search-1.svg';
import MusicPlayer from '../MusicPlayer';
import usePagination from '../../hooks/usePaginate';
import SpotifyHelper from '../../utils/spotifyhelper';
import LoadingAnimation from '../../constants/loading-animation';
import Closemenu from '../../assets/images/close-circle.svg';
import Menu from '../../assets/menu-dot-square.svg';
import ViewMore from '../../assets/images/round-arrow-right-up.svg';
import getQuote from '../../assets/images/document-add.svg';

interface ResponseData {
  message: string;
}

interface TrackDetails {
  producers: string;
  trackTitle: string;
  _id: string;
  trackLink: string;
  mainArtist: string;
  musicWaves: string[];
  duration: string;
  writers: string;
  genre: string;
  mood: string[];
  actions: string[];
  artWork: string;
  spotifyLink: string;
}

const ExplorePage = () => {
  // Retrieve state passed via navigation (if any)
  const location = useLocation();
  // Type the location state (if using TypeScript, you may create a proper interface)
  // For this example we assume the state has a "data" (full track list) and "query" string.
  const navState = location.state as {
    data?: TrackDetails[];
    query?: string;
  } | null;

  // State to hold search results (if a search is performed)
  const [searchData, setSearchData] = useState<TrackDetails[]>([]);
  // State for the default tracks if no search is active
  const [displayedTracks, setDisplayedTracks] = useState<TrackDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // Flag to determine if we are displaying search results
  const [isSearching, setIsSearching] = useState(false);
  // State for the search bar value
  const [searchQuery, setSearchQuery] = useState<string>(navState?.query || '');

  // On mount, if navigation state exists, use it to set search results
  useEffect(() => {
    if (navState && navState.data && navState.query) {
      setSearchData(navState.data);
      setIsSearching(true);
      setSearchQuery(navState.query);
    }
  }, [navState]);

  // Toggles for mobile menu
  const closeMenu = () => setMenuOpen(!menuOpen);
  const openMenu = () => setMenuOpen(true);

  // This function is used when a user types a search query in the ExplorePage search bar
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }

    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/freequery/${query}`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      // Set the search data from the response and flag that we are in search mode.
      setSearchData(response.data.tracks);
      setIsSearching(true);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch default tracks for browsing when the page mounts
  const fetchTracks = useCallback(async () => {
    const urlVar = import.meta.env.VITE_APP_API_URL;

    try {
      setLoading(true);
      const response = await axios.get(`${urlVar}/allSongs`);
      setDisplayedTracks(response.data.allTracks);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Only fetch default tracks if we are not showing search results
  useEffect(() => {
    if (!isSearching) {
      fetchTracks();
    }
  }, [fetchTracks, isSearching]);

  // Determine which tracks to show: search results (if any) or the default list.
  const tracksToDisplay = isSearching ? searchData : displayedTracks;

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const itemsPerPage = 30;
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination<TrackDetails>(tracksToDisplay, itemsPerPage);

  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  return (
    <div
      className={`bg-black min-h-screen px-5 xl:px-20 text-white ${
        menuOpen ? 'overflow-hidden' : ''
      }`}
    >
      <Navbar />
      <section>
        <div className="relative mt-[55px]">
          <div className="flex gap-2 w-full py-6 pl-6 bg-cover min-h-[371px] md:min-h-full lg:pl-16 lg:py-[56px] bg-no-repeat flex-col bg-syncUserBg md:bg-desktopSyncUserBg border rounded-[10px]">
            <h2 className="text-[40px] lg:text-[64px] leading-[45px] lg:leading-[56px] xl:leading-[78px] font-gitSans font-normal text-grey-100">
              Explore Our <br /> Music Library
            </h2>
            <p className="font-formular-regular text-[16px] xl:text-[24px] leading-[24px] xl:leading-[32px] md:max-w-[550px] text-grey-300 max-w-[242px] ">
              Discover, listen, and license authentic african music for your
              projects
            </p>
          </div>
        </div>
        <div className="relative w-full my-[24px]">
          <input
            type="text"
            placeholder="Search for music, genres, moods, keywords or lyrics"
            value={searchQuery}
            className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!e.target.value.trim()) {
                setIsSearching(false);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
          />
          <img
            src={Search}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
      </section>

      {/* Header changes based on whether this is a search or browse view */}
      <section className="mt-[65px]">
        <h3 className="text-[#fff] text-[24px] font-inter font-bold leading-6 mb-[45px]">
          {isSearching ? `Search results for "${searchQuery}"` : 'Browse Songs'}
        </h3>
      </section>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center">
          <LoadingAnimation />
        </div>
      )}

      <section>
        {paginatedItems && paginatedItems.length > 0 ? (
          <div className="hidden flex-col gap-[56px] lg:flex">
            {paginatedItems.map((detail, index) => (
              <div key={index} className="flex items-center w-full">
                <Link
                  to={`/metadata/${detail?._id}`}
                  className="flex gap-3 w-[25%]"
                >
                  <img
                    src={detail?.artWork}
                    alt={detail.trackTitle}
                    className="h-[50px] w-[50px] object-cover"
                  />
                  <span>
                    <h4 className="font-Utile-bold text-white leading-6 text-[14px]">
                      {detail.trackTitle}
                    </h4>
                    <p className="font-Utile-regular text-white leading-4 text-[12px]">
                      {detail.mainArtist}
                    </p>
                  </span>
                </Link>

                {detail.trackLink ? (
                  <MusicPlayer
                    trackLink={detail.trackLink}
                    songId={detail._id}
                    duration={10}
                    containerStyle="mt-0 flex items-center gap-3"
                    buttonStyle="w-4 cursor-pointer"
                    waveStyle="w-[300px]"
                  />
                ) : (
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/track/${SpotifyHelper(
                      detail?.spotifyLink || ''
                    )}?utm_source=generator`}
                    width="300"
                    height="100"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}

                <span className="flex gap-12 w-[25%] items-start ml-[5%]">
                  <span className="w-[50%]">
                    <p className="font-Utile-bold text-white leading-4 text-[12px]">
                      {detail.duration || 'N/A'}
                    </p>
                    <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px] truncate max-w-16">
                      {truncateText(detail.producers || 'N/A', 5)}
                    </p>
                  </span>
                  <span className="w-[50%]">
                    <p className="font-Utile-bold text-white leading-4 text-[12px]">
                      {detail.genre}
                    </p>
                    <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                      {detail.mood.join(', ')}
                    </p>
                  </span>
                </span>

                <span className="gap-[12px] flex w-[25%] justify-end">
                  <Link to={`/metadata/${detail?._id}`} className="bg-white">
                    <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      View More
                    </button>
                  </Link>
                  <Link to={`/quote/${detail._id}`}>
                    <button className="text-white bg-[#006363] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                      Get Quote
                    </button>
                  </Link>
                </span>
              </div>
            ))}

            {/* Pagination for desktop */}
            {paginatedItems.length > itemsPerPage && (
              <div className="flex items-center mx-auto gap-3 mt-5">
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <div className="gap-3 flex">
                  {getPaginationRange().map((page, index) =>
                    typeof page === 'number' ? (
                      <div key={index}>
                        <button
                          onClick={() => goToPage(page)}
                          className={
                            currentPage === page
                              ? active
                              : 'flex items-center flex-col h-8 w-8 border border-[#DADCE0] rounded-[4px] p-1'
                          }
                        >
                          {page}
                        </button>
                      </div>
                    ) : (
                      <span key={index}>...</span>
                    )
                  )}
                </div>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-white">No Track available.</p>
        )}
      </section>

      {/* Mobile view */}
      <div className="lg:hidden flex flex-col gap-6">
        {paginatedItems.map((detail, index) => (
          <div key={index} className="flex items-center w-full justify-between">
            <span className="flex gap-3">
              <Link to={`/metadata/${detail?._id}`} className="flex gap-4">
                <img
                  src={detail.artWork}
                  alt={detail.trackTitle}
                  className="h-12 w-12 object-cover"
                />
                <span>
                  <h4 className="font-Utile-bold text-white leading-6 text-[14px]">
                    {detail.trackTitle}
                  </h4>
                  <p className="font-Utile-regular text-white leading-4 text-[12px]">
                    {detail.mainArtist}
                  </p>
                </span>
              </Link>
            </span>
            <span>
              <img src={Menu} alt="Menu" onClick={() => openMenu()} />
            </span>
          </div>
        ))}

        {/* Mobile Pagination */}
        <div className="flex items-center mx-auto gap-3 mt-5">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Prev
          </button>
          <div className="gap-3 flex">
            {getPaginationRange().map((page, index) =>
              typeof page === 'number' ? (
                <div key={index}>
                  <button
                    onClick={() => goToPage(page)}
                    className={
                      currentPage === page
                        ? active
                        : 'flex items-center flex-col h-8 w-8 border border-[#DADCE0] rounded-[4px] p-1'
                    }
                  >
                    {page}
                  </button>
                </div>
              ) : (
                <span key={index}>...</span>
              )
            )}
          </div>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <React.Fragment>
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
                <img src={Closemenu} alt="Close menu" onClick={closeMenu} />
              </span>
              <ul className="mt-8 flex flex-col gap-8">
                <Link to="/login">
                  <li className="text-black font-formular-light text-[24px] leading-6 flex gap-4">
                    <img src={ViewMore} alt="View More" />
                    View More
                  </li>
                </Link>
                <Link
                  to="/login"
                  className="text-black font-formular-light text-[24px] leading-6 flex gap-4"
                >
                  <img src={getQuote} alt="Get Quote" />
                  Get Quote
                </Link>
              </ul>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ExplorePage;
