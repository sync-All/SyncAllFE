import React, { useState, useCallback } from 'react';
import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface SearchState {
  type: 'text' | 'genre' | 'mood' | 'instrument' | null;
  query: string;
}

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

interface MusicSearchProps {
  onSearch: (results: TrackDetails[], searchState: SearchState) => void;
  onResetSearch: () => void;
}

const MusicSearch: React.FC<MusicSearchProps> = ({
  onSearch,
  onResetSearch,
}) => {
  const [searchState, setSearchState] = useState<SearchState>({
    type: null,
    query: '',
  });

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const performSearch = useCallback(
    async (
      endpoint: string,
      query: string,
      searchType: SearchState['type']
    ) => {
      if (!query.trim()) {
        onResetSearch();
        return;
      }

      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/${endpoint}/${query}`;

      try {
        const response = await axios.get(apiUrl, {
          headers: { Authorization: token },
        });
        

        onSearch(response.data.allTracks, {
          type: searchType,
          query: query.trim(),
        });
        console.log(response.data.allTracks);
      } catch (error) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      }
    },
    [onSearch, onResetSearch]
  );

  const debouncedSearch = (
    endpoint: string,
    query: string,
    searchType: SearchState['type']
  ) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      performSearch(endpoint, query, searchType);
    }, 300);

    setSearchTimeout(timeoutId);
  };

  const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSearchState({
      type: 'text',
      query: value,
    });

    if (value.trim()) {
      debouncedSearch('querySongs', value, 'text');
    } else {
      onResetSearch();
    }
  };

  const handleFilterSelect = (
    value: string,
    type: 'genre' | 'mood' | 'instrument',
    endpoint: string
  ) => {
    const newQuery = value.toLowerCase();

    if (searchState.type === type && searchState.query === newQuery) {
      setSearchState({ type: null, query: '' });
      onResetSearch();
      return;
    }

    setSearchState({
      type,
      query: newQuery,
    });

    performSearch(endpoint, newQuery, type);
  };

  return (
    <div>
      <div className="relative w-full my-24px">
        <input
          type="text"
          placeholder="Search for music, genres, moods, keywords or lyrics"
          className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
          value={searchState.type === 'text' ? searchState.query : ''}
          onChange={handleTextSearch}
        />
        <img
          src={Search}
          alt="Search"
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
        />
      </div>
      <div className="mt-[32px]">
        <ul className="flex gap-[35px] relative">
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Genre
              onSelect={(genre) =>
                handleFilterSelect(genre, 'genre', 'getTrackByGenre')
              }
            />
          </li>
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Mood
              onSelect={(mood) =>
                handleFilterSelect(mood, 'mood', 'getTrackByMood')
              }
            />
          </li>
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Instrument
              onSelect={(instrument) =>
                handleFilterSelect(
                  instrument,
                  'instrument',
                  'getTrackByInstrument'
                )
              }
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MusicSearch;
