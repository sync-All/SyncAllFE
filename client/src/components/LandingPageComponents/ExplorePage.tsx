import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import _ from 'lodash';

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
  const location = useLocation();
  const navState = location.state as {
    data?: TrackDetails[];
    query?: string;
  } | null;

  const [searchData, setSearchData] = useState<TrackDetails[]>([]);
  const [displayedTracks, setDisplayedTracks] = useState<TrackDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(navState?.query || '');
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  useEffect(() => {
    if (navState && navState.data && navState.query) {
      setSearchData(navState.data);
      setIsSearching(true);
      setSearchQuery(navState.query);
    }
  }, [navState]);

  const closeMenu = () => setMenuOpen(false);
  const openMenu = (trackId: string) => {
    setSelectedTrack(trackId);
    setMenuOpen(true);
  };

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setIsSearching(false);
        setSearchData([]);
        return;
      }
  
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/freequery/${query}`;
  
      try {
        setLoading(true);
        const response = await axios.get(apiUrl);
        setSearchData(response.data.tracks);
        setIsSearching(true);
      } catch (error) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response?.data?.message || axiosError.response?.data || axiosError.message || 'An error occurred')
            .toString()
        );
      } finally {
        setLoading(false);
      }
    },
    [setIsSearching, setSearchData, setLoading] // Add necessary state setters as dependencies
  );

  // Create a debounced version of handleSearch
  const debouncedSearch = useMemo(
    () => _.debounce((query: string) => handleSearch(query), 500),
    [handleSearch]
  );
  

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

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

    useEffect(() => {
      if (!isSearching && displayedTracks.length === 0) {
        fetchTracks();
      }
    }, [fetchTracks, isSearching, displayedTracks.length]);

  // Handle input change with debounce
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const newQuery = e.target.value;
     setSearchQuery(newQuery);

     if (!newQuery.trim()) {
       setIsSearching(false);
       setSearchData([]);
       // Explicitly fetch tracks when search is cleared
       fetchTracks();
     } else {
       debouncedSearch(newQuery);
     }
   };
  const tracksToDisplay = isSearching ? searchData : displayedTracks;

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

  const renderPagination = () => (
    <div className="flex items-center mx-auto gap-3 mt-5">
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-white hover:bg-gray-700'
        }`}
      >
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
            <span key={index} className="text-white">
              ...
            </span>
          )
        )}
      </div>
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-white hover:bg-gray-700'
        }`}
      >
        Next
      </button>
    </div>
  );

  return (
    <div
      className={`bg-black min-h-screen text-white ${
        menuOpen ? 'overflow-hidden' : ''
      }`}
    >
      <Navbar />
      {/* Hero Section */}
      <main className='px-5 xl:px-20'>
        <section>
          <div className="relative mt-[55px]">
            <div className="flex gap-2 w-full py-6 pl-6 bg-cover min-h-[371px] md:min-h-full lg:pl-16 lg:py-[56px] bg-no-repeat flex-col bg-syncUserBg md:bg-desktopSyncUserBg border rounded-[10px]">
              <h2 className="text-[40px] lg:text-[64px] leading-[45px] lg:leading-[56px] xl:leading-[78px] font-gitSans font-normal text-grey-100">
                Explore Our <br /> Music Library
              </h2>
              <p className="font-formular-regular text-[16px] xl:text-[24px] leading-[24px] xl:leading-[32px] md:max-w-[550px] text-grey-300 max-w-[242px]">
                Discover, listen, and license authentic african music for your
                projects
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full my-[24px]">
            <input
              type="text"
              placeholder="Search for music, genres, moods, keywords or lyrics"
              value={searchQuery}
              className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
              onChange={handleInputChange}
            />
            <img
              src={Search}
              alt="Search"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
          </div>
        </section>

        {/* Section Title */}
        <section className="mt-[65px]">
          <h3 className="text-[#fff] text-[24px] font-inter font-bold leading-6 mb-[45px]">
            {isSearching ? `Search results for "${searchQuery}"` : 'Browse Songs'}
          </h3>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <LoadingAnimation />
          </div>
        )}

        {/* Desktop View */}
        <section>
          {paginatedItems && paginatedItems.length > 0 ? (
            <div className="hidden flex-col gap-[56px] lg:flex">
              {paginatedItems.map((detail, index) => (
                <div key={index} className="flex items-center w-full">
                  {/* Track Info */}
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

                  {/* Music Player */}
                  <div className="w-[40%]">
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
                  </div>

                  {/* Track Details */}
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

                  {/* Action Buttons */}
                  <span className="gap-[12px] flex w-[25%] justify-end">
                    <Link to={`/metadata/${detail?._id}`}>
                      <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px] bg-white">
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

              {/* Desktop Pagination */}
              {paginatedItems.length > 0 && renderPagination()}
            </div>
          ) : (
            !loading && (
              <p className="text-center text-white">No tracks available.</p>
            )
          )}
        </section>

        {/* Mobile View */}
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
                <img
                  src={Menu}
                  alt="Menu"
                  onClick={() => openMenu(detail._id)}
                  className="cursor-pointer w-6 h-6"
                />
              </span>
            </div>
          ))}

          {/* Mobile Pagination */}
          {paginatedItems.length > 0 && renderPagination()}
        </div>

        {/* Mobile Menu Overlay */}
        {menuOpen && (
          <React.Fragment>
            {/* Backdrop */}
            <div
              className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
              onClick={closeMenu}
            ></div>

            {/* Menu Content */}
            <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-[20px] overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[#81909D] text-[16px] font-formular-regular leading-6">
                    Song Options
                  </h4>
                  <img
                    src={Closemenu}
                    alt="Close menu"
                    onClick={closeMenu}
                    className="cursor-pointer w-6 h-6"
                  />
                </div>

                <ul className="space-y-6">
                  {selectedTrack && (
                    <>
                      <li>
                        <Link
                          to={`/metadata/${selectedTrack}`}
                          className="flex items-center gap-4 text-black font-formular-light text-[24px] leading-6"
                          onClick={closeMenu}
                        >
                          <img
                            src={ViewMore}
                            alt="View More"
                            className="w-6 h-6"
                          />
                          View More
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/quote/${selectedTrack}`}
                          className="flex items-center gap-4 text-black font-formular-light text-[24px] leading-6"
                          onClick={closeMenu}
                        >
                          <img
                            src={getQuote}
                            alt="Get Quote"
                            className="w-6 h-6"
                          />
                          Get Quote
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </React.Fragment>
        )}

        {/* No Results Message */}
        {!loading && paginatedItems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">
              {isSearching
                ? `No results found for "${searchQuery}"`
                : 'No tracks available.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ExplorePage;