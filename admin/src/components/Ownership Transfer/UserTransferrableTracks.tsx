import React, { useState, useMemo, useEffect } from 'react';
// import Filter from '../../assets/images/Filter-lines.svg';

import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/up-arrow.svg';

import NoTrack from '../../assets/images/no_track.svg';
import LoadingAnimation from '../../constants/loading-animation';
import Search from '../../assets/images/search-1.svg';
import { Link } from 'react-router-dom';
import { User } from '../../contexts/UserContext';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import { useContent } from '../../contexts/ContentContext';

interface TableData {
  _id: string;
  fullName: string;
  name: string;
}

interface ResponseData {
  message?: string;
}

interface SortConfig {
  key: keyof TableData | null;
  direction: 'ascending' | 'descending';
}

const SortButton: React.FC<{
  sortConfig: SortConfig;
  sortKey: keyof TableData;
  onSort: (key: keyof TableData) => void;
}> = ({ sortConfig, sortKey, onSort }) => (
  <button
    type="button"
    onClick={() => onSort(sortKey)}
    aria-label={`Sort by ${sortKey}`}
  >
    <img
      src={
        sortConfig.key === sortKey
          ? sortConfig.direction === 'ascending'
            ? ArrowUp
            : ArrowDown
          : ArrowUp
      }
      alt="Sort"
    />
  </button>
);

const UserTransferrableTracks = () => {
  const [uploaders, setUploaders] = useState<User[]>([]);
  const [username, setUsername] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { content, loading } = useContent();

  useEffect(() => {
    fetchUploader();
  }, []);

  const fetchUploader = async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/allusers?userTypes=uploaders,ContentAdmin,Admin,SuperAdmin`;

    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        headers: { Authorization: token },
        withCredentials: true,
      });

      setUploaders(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const fetchByUsername = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/userSearch?filter=${searchTerm}`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    };

    try {
      setIsLoading(true);
      const res = await axios.get(apiUrl, config);
      if (Array.isArray(res.data.users)) {
        setSearchResults(res.data.users); // Set users data as search results
      } else {
        // Handle unexpected response structure
        setSearchResults([]);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetch = debounce(fetchByUsername, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    if (!value.trim()) {
      setSearchResults([]); // Clear search results
      debouncedFetch.cancel(); // Cancel any pending debounced searches
      return;
    }

    debouncedFetch(value);
  };
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!Array.isArray(uploaders) || uploaders.length === 0) return [];

    return [...uploaders].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      // Use nullish coalescing to provide fallback values for comparison
      const aValue = a[sortConfig.key as keyof User] ?? '';
      const bValue = b[sortConfig.key as keyof User] ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [uploaders, sortConfig]);

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  if (isLoading || loading) {
    return <LoadingAnimation />;
  }

  const displayData = username.trim() === '' ? sortedData : searchResults;
  return (
    <div>
      {' '}
      <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
        <div className="flex justify-between">
          <div>
            <span className="flex gap-2">
              <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
                User Management
              </h2>
              <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
                Users List
              </p>
            </span>
            <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
              Manage and oversee registered users.
            </p>
          </div>
          <div>
            <div className="relative w-full flex items-center gap-4 min-w-[320px]">
              <input
                type="text"
                placeholder="Search by username or email address"
                className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
                name="searchWord"
                onChange={handleSearch}
                value={username}
              />
              <img
                src={Search}
                alt="Search"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <LoadingAnimation />
        ) : displayData.length > 0 ? (
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className={ThStyles}>
                  Uploaders
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="name"
                    onSort={handleSort}
                  />
                </th>

                <th className={ThStyles}>
                  No. of songs
                  {/* <SortButton
                    sortConfig={sortConfig}
                    sortKey="totalTracks"
                    onSort={handleSort}
                  /> */}
                </th>

                <th className={ThStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((user) => (
                <tr key={user._id} className="items-center relative">
                  <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8 capitalize">
                    {user.name}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8 items-center">
                    {content?.filter(
                      (item) =>
                        item?.user._id === user._id &&
                        item?.uploadStatus?.toLowerCase() !== 'pending'
                    ).length ?? 0}
                  </td>

                  <td className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8 cursor-pointer">
                    <Link to={user._id}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto mt-[195px]">
            <img src={NoTrack} alt="No Track" />
            <p className="text-[#5E5E5E] text-[16px] font-formular-bold tracking-[-0.5px] leading-6 mt-[28px]">
              No User
            </p>
            <p className="text-[#667085] text-[12px] font-formular-medium leading-4">
              You don't have a user
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTransferrableTracks;
