import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Background from '../../assets/images/Background.svg';
import Search from '../../assets/images/search-1.svg';
import SpotifyHelper from '../../utils/spotifyhelper';
import { useState, useCallback, useEffect } from 'react';
import { TracklistDetails } from '../../Context/syncUserData';
import LoadingAnimation from '../../constants/loading-animation';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

interface ResponseData {
  message: string;
}

const SearchMusic = () => {
  const [searchData, setSearchData] = useState<TracklistDetails[]>([]);
  const [fullData, setFullData] = useState<TracklistDetails[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchData([]);
      setFullData([]);
      return;
    }

    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/freequery/${searchQuery}`;

    try {
      setLoading(true);
      const response = await axios.get(apiUrl);
      setFullData(response.data.tracks);
      setSearchData(response.data.tracks?.slice(0, 3));
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

  // Create a debounced version of handleSearch
  const debouncedSearch = useCallback(
    _.debounce((searchQuery: string) => {
      handleSearch(searchQuery);
    }, 500), // 500ms delay
    [] // Empty dependency array as we don't want to recreate the debounced function
  );

  // Cleanup debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <section
      className="bg-no-repeat bg-center bg-cover mt-[24px] xl:w-[1254px] h-auto mx-auto rounded-[20px] text-white"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="pt-[100px]">
        <h3 className="text-[#EFA605] text-[18px] md:text-[24px] text-center font-formular-regular uppercase">
          IT WORKS TOO WELL
        </h3>
        <h1 className="font-gitSans font-[400] text-[40px] xl:text-[80px] text-center leading-[46px] xl:leading-[96px] text-grey-100 mt-[24px] lg:max-w-[868px] mx-auto">
          Search by artist, keyword, genre, mood – whatever
        </h1>
      </div>

      {/* Search input area */}
      <div className="flex justify-between items-center mt-[65px] text-center gap-[6px] pb-[26px] max-w-[755px] mx-auto relative">
        <input
          type="text"
          name="search"
          value={query}
          onChange={handleInputChange}
          className="w-full h-[50px] bg-transparent border-b-[1px] focus:outline-none focus:border-b-[2px] border-transparent border-b-white text-center"
          placeholder="Start typing to search..."
        />
        <img
          src={Search}
          alt="Search Icon"
          className="h-[35px] absolute right-0"
        />
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex justify-center mt-4">
          <LoadingAnimation />
        </div>
      )}

      {/* Display search results */}
      {!loading && searchData.length > 0 && (
        <div className="flex justify-center gap-6 overflow-hidden max-w-[1069px] mx-auto mt-[45px]">
          {searchData.map((search, key) => (
            <div key={key}>
              <span className="h-[236px]">
                <img
                  src={search.artWork}
                  alt={search.trackTitle}
                  className="h-[236px] object-cover"
                />
              </span>
              <div className="mt-[25px] flex gap-[9px] flex-col justify-start items-center">
                <h2 className="font-inter font-bold text-[32px] leading-[79px]">
                  {search.trackTitle}
                </h2>
                <p className="font-Utile-regular text-[13px] leading-[52px] text-[#FFFFFFB2]">
                  {search.mainArtist}
                </p>
              </div>
              <div>
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/track/${SpotifyHelper(
                    search?.spotifyLink || ''
                  )}?utm_source=generator`}
                  width="300"
                  height="100"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {!loading && searchData.length === 0 && query && (
        <p className="text-center text-gray-400 py-8">No results found.</p>
      )}

      {!loading && searchData.length === 0 && !query && (
        <p className="text-center text-gray-400 py-8">
          Start typing to search...
        </p>
      )}

      {/* Explore More Button */}
      {!loading && searchData.length > 0 && (
        <span className="flex justify-center items-center w-full mt-4 pb-[100px]">
          <button
            className="bg-yellow py-3 px-4 rounded-[3px]"
            onClick={() =>
              navigate('/explore-sounds', { state: { data: fullData, query } })
            }
          >
            <p className="font-inter text-[18px] font-medium">Explore more</p>
          </button>
        </span>
      )}
    </section>
  );
};

export default SearchMusic;
