import React from 'react';
import { useEffect, useState } from 'react';
import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import { Link } from 'react-router-dom';
// import AddMusic from '../../assets/images/add-music.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
// import musicWave from '../../assets/images/musicwave.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Liked from '../../assets/images/liked.svg';



 interface ResponseData {
   message?: string;
 }


const MusicSearch = () => {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [results, setResults] = useState<TrackDetails[]>([]);
const [likedTrack, setLikedTrack] = useState<{ [key: string]: boolean }>({});

    interface TrackDetails {
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
      producers: string
    }

  const useSearch = (
    endpoint: string,
    query: string | null,
    setResults: React.Dispatch<React.SetStateAction<TrackDetails[]>>
  ) => {
    useEffect(() => {
      if (!query) return;

      const search = async () => {
        const token = localStorage.getItem('token');
        const urlVar = import.meta.env.VITE_APP_API_URL;
        const apiUrl = `${urlVar}/${endpoint}/${query}`;
        const config = {
          headers: {
            Authorization: `${token}`,
          },
        };

        try {
          const res = await axios.get(apiUrl, config);
         console.log(res); setResults(res.data.allTracks);
          
          
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

      search();
    }, [endpoint, query, setResults]);
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

    const handleCopyLink = (id: string) => {
      navigator.clipboard.writeText(`${window.location.origin}/metadata/${id}`);
      toast.success('Link copied to clipboard');
    };

 

  useSearch('getTrackByInstrument', selectedInstrument, setResults);
  useSearch('getTrackByGenre', selectedGenre, setResults);
  useSearch('getTrackByMood', selectedMood, setResults);
  useSearch('querySongs', searchWord, setResults);

  const noResults =
    results.length === 0 &&
    (selectedInstrument || selectedGenre || selectedMood || searchWord);
  return (
    <div>
      <div className="relative w-full my-24px">
        <input
          type="text"
          placeholder="Search for music, genres, moods, keywords or lyrics"
          className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
          name="searchWord"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <img
          src={Search}
          alt="Search"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
        {}
      </div>
      <div className="mt-[32px]">
        <ul className="flex gap-[35px] relative ">
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Genre
              onSelect={(genre) => setSelectedGenre(`:${genre.toLowerCase()}`)}
            />
          </li>
          <li className="flex gap-[7px]   uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Mood
              onSelect={(mood) => setSelectedMood(`:${mood.toLowerCase()}`)}
            />
          </li>
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Instrument
              onSelect={(instrument) =>
                setSelectedInstrument(`:${instrument.toLowerCase()}`)
              }
            />
          </li>
        </ul>
      </div>
      <div className="mt-[32px]">
        {results.length > 0 ? (
          <div>
            <h2 className="text-[18px] font-bold mb-[16px]">Search Results:</h2>
            <ul>
              {results.map((result, index) => (
                <div key={index} className="flex items-center w-full ">
                  <Link
                    to={`/metadata/${result?._id}`}
                    className="flex gap-3 w-[25%]"
                  >
                    <img
                      src={result?.artWork}
                      alt=""
                      className="h-[50px] w-[50px] object-cover"
                    />
                    <span>
                      <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                        {result.trackTitle}
                      </h4>
                      <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                        {result.mainArtist}
                      </p>
                    </span>
                  </Link>

                  <span className="hidden lg:flex gap-12 w-[25%] items-start ml-[5%]">
                    <span>
                      <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                        {result.duration || 'N/A'}
                      </p>
                      <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                        {result.producers || 'N/A'}
                      </p>
                    </span>
                    <span>
                      <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                        {result.genre}
                      </p>
                      <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                        {result.mood.join(', ')}
                      </p>
                    </span>
                  </span>
                  <span className="hidden lg:flex gap-6 w-[10%] justify-center">
                    <img
                      src={likedTrack[result._id] ? Liked : Favorite}
                      alt=""
                      onClick={() => handleLikes(result._id)}
                      className="cursor-pointer"
                    />
                    {/* <img src={AddMusic} alt="" /> */}
                    <img
                      src={Copy}
                      alt=""
                      onClick={() => handleCopyLink(result._id)}
                    />
                  </span>
                  <span className="gap-[12px] hidden lg:flex w-[25%] justify-center">
                    <Link to={`/metadata/${result?._id}`}>
                      <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                        View More
                      </button>
                    </Link>
                    <Link to={`/quote/${result?._id}`}>
                      <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                        Get Quote
                      </button>
                    </Link>
                  </span>
                </div>
              ))}
            </ul>
          </div>
        ) : (
          noResults && <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default MusicSearch;
