// MusicSearch.tsx
import React from 'react';
import { useState, useCallback } from 'react';
import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface ResponseData {
  message?: string;
  spotifyLink: string;
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
  onSearchResults: (results: TrackDetails[]) => void;
  onResetSearch: () => void;
}

const MusicSearch: React.FC<MusicSearchProps> = ({
  onSearchResults,
  onResetSearch,
}) => {
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(
    null
  );
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const performSearch = useCallback(
    async (endpoint: string, query: string) => {
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
        onSearchResults(res.data.allTracks);
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
    [onSearchResults]
  );

  const debouncedSearch = (endpoint: string, query: string) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeoutId = setTimeout(() => {
      performSearch(endpoint, query);
    }, 300);

    setSearchTimeout(timeoutId);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchWord(value);

    // Clear other filters
    setSelectedGenre(null);
    setSelectedMood(null);
    setSelectedInstrument(null);

    if (value) {
      debouncedSearch('querySongs', value);
    } else {
      onResetSearch();
    }
  };

  const handleGenreSelect = (genre: string) => {
    const genreValue = genre.toLowerCase();
    const newGenre = genreValue === selectedGenre ? null : genreValue;
    setSelectedGenre(newGenre);
    setSearchWord('');
    setSelectedMood(null);
    setSelectedInstrument(null);

    if (newGenre) {
      performSearch('getTrackByGenre', newGenre);
    } else {
      onResetSearch();
    }
  };

  const handleMoodSelect = (mood: string) => {
    const moodValue = mood.toLowerCase();
    const newMood = moodValue === selectedMood ? null : moodValue;
    setSelectedMood(newMood);
    setSearchWord('');
    setSelectedGenre(null);
    setSelectedInstrument(null);

    if (newMood) {
      performSearch('getTrackByMood', newMood);
    } else {
      onResetSearch();
    }
  };

  const handleInstrumentSelect = (instrument: string) => {
    const instrumentValue = instrument.toLowerCase();
    const newInstrument =
      instrumentValue === selectedInstrument ? null : instrumentValue;
    setSelectedInstrument(newInstrument);
    setSearchWord('');
    setSelectedGenre(null);
    setSelectedMood(null);

    if (newInstrument) {
      performSearch('getTrackByInstrument', newInstrument);
    } else {
      onResetSearch();
    }
  };

  return (
    <div>
      <div className="relative w-full my-24px">
        <input
          type="text"
          placeholder="Search for music, genres, moods, keywords or lyrics"
          className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
          name="searchWord"
          value={searchWord}
          onChange={handleInputChange}
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
            <Genre onSelect={handleGenreSelect} />
          </li>
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Mood onSelect={handleMoodSelect} />
          </li>
          <li className="flex gap-[7px] uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
            <Instrument onSelect={handleInstrumentSelect} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MusicSearch;
