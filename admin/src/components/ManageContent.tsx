import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import { useContent } from '../contexts/ContentContext';
import usePagination from '../hooks/usePaginate';
import ArrowDown from '../assets/images/arrowdown.svg';
import ArrowUp from '../assets/images/up-arrow.svg';
import NoTrack from '../assets/images/no_track.svg';
import Search from '../assets/images/search-1.svg';
import Left from '../assets/images/left-arrow.svg';
import Right from '../assets/images/right-arrow.svg';
import LoadingAnimation from '../constants/loading-animation';
import getStatusColors from '../helper/getStatusColors';

interface Content {
  _id: string;
  trackTitle: string;
  mainArtist: string;
  uploadStatus: string;
  user: {
    _id: string;
    name: string;
  };
}

// Remove duplicate TableData interface since we're not using its additional fields
type TableData = Content;

// Define sortable fields
type SortableFields = 'trackTitle' | 'mainArtist' | 'name';

interface SortConfig {
  key: SortableFields | null;
  direction: 'ascending' | 'descending';
}

interface SortButtonProps {
  sortConfig: SortConfig;
  sortKey: SortableFields;
  onSort: (key: SortableFields) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  sortConfig,
  sortKey,
  onSort,
}) => (
  <button
    type="button"
    onClick={() => onSort(sortKey)}
    aria-label={`Sort by ${sortKey}`}
  >
    <img
      src={
        sortConfig.key === sortKey && sortConfig.direction === 'ascending'
          ? ArrowUp
          : ArrowDown
      }
      alt="Sort"
    />
  </button>
);

const ITEMS_PER_PAGE = 100;

const ManageContent = () => {
  const { content, loading } = useContent();
  const [searchResults, setSearchResults] = useState<TableData[]>([]);
  const [contentSearch, setContentSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  // First determine base data (search results or main content)
  const baseData = useMemo(() => {
    return contentSearch.trim() === '' ? content : searchResults;
  }, [content, searchResults, contentSearch]);

  // Update sort function with proper typing
  const sortedData = useMemo(() => {
    if (!Array.isArray(baseData) || !baseData.length || !sortConfig.key) {
      return baseData;
    }

    return [...baseData].sort((a, b) => {
      const key = sortConfig.key; // Extract key to ensure it's not null
      if (!key) return 0; // TypeScript now knows key isn't null

      let aValue: string;
      let bValue: string;

      // Handle nested user.name property separately
      if (key === 'name') {
        aValue = a.user?.name || '';
        bValue = b.user?.name || '';
      } else {
        // Now TypeScript knows key is either 'trackTitle' or 'mainArtist'
        aValue = a[key]?.toString() || '';
        bValue = b[key]?.toString() || '';
      }

      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [baseData, sortConfig]);

  // Then apply filtering
  const filteredData = useMemo(() => {
    if (!selectedFilter) return sortedData;
    return sortedData.filter(
      (item) =>
        item.uploadStatus?.toLowerCase() === selectedFilter.toLowerCase()
    );
  }, [sortedData, selectedFilter]);

  // Finally apply pagination
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination(filteredData, ITEMS_PER_PAGE);

  // Calculate pagination info
  const totalItems = filteredData.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const fetchByUsername = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/manage_content/search?filter=${searchTerm}`;

    try {
      setIsLoading(true);
      const response = await axios.get<TableData[]>(apiUrl, {
        headers: { Authorization: token }, withCredentials: true
      });
      setSearchResults(Array.isArray(response.data) ? response.data : []);
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

  const debouncedFetch = debounce(fetchByUsername, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContentSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      debouncedFetch.cancel();
      return;
    }

    debouncedFetch(value);
  };

  const handleSort = (key: SortableFields) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6';

  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  return (
    <div>
      <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
        <div className="flex justify-between">
          <div>
            <span className="flex gap-2">
              <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
                Content Moderation
              </h2>
              <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
                Content List
              </p>
            </span>
            <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
              Review and manage user-generated content
            </p>
          </div>
          <div className="flex items-center gap-4 min-w-[320px]">
            {/* Filter dropdown button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown((prev) => !prev)}
                className="flex items-center border rounded-lg pl-4 pr-4 py-4 text-gray-500"
              >
                <span className="capitalize">
                  {selectedFilter ? selectedFilter : 'Filter'}
                </span>
                <img
                  src={showFilterDropdown ? ArrowUp : ArrowDown}
                  alt="Dropdown"
                  className="ml-2 w-4 h-4"
                />
              </button>
              {showFilterDropdown && (
                <ul className="absolute right-0 mt-1 w-full bg-white shadow-md rounded-lg z-10">
                  <li
                    onClick={() => {
                      setSelectedFilter('pending');
                      setShowFilterDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                  >
                    Pending
                  </li>
                  <li
                    onClick={() => {
                      setSelectedFilter('approved');
                      setShowFilterDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                  >
                    Approved
                  </li>
                  <li
                    onClick={() => {
                      setSelectedFilter('rejected');
                      setShowFilterDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                  >
                    Rejected
                  </li>
                  <li
                    onClick={() => {
                      setSelectedFilter('');
                      setShowFilterDropdown(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200 px-4 py-2"
                  >
                    Clear Filter
                  </li>
                </ul>
              )}
            </div>
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search Title, or Keywords"
                className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
                name="searchWord"
                onChange={handleSearch}
                value={contentSearch}
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
        ) : paginatedItems.length > 0 ? (
          <div>
            <table className="w-full mt-5">
              <thead>
                <tr>
                  <th className={ThStyles}>
                    Title
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="trackTitle"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Main Artist
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="mainArtist"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    User{' '}
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="name"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>Status</th>
                  <th className={ThStyles}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr
                    key={item._id}
                    className="items-center relative border border-r-0 border-l-0"
                  >
                    <td className="text-[#101828] font-inter font-medium text-[14px] leading-5 py-4 px-8">
                      {item.trackTitle}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {item.mainArtist}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {item.user.name}
                    </td>
                    <td className="py-4 px-8">
                      <span
                        className={`${
                          getStatusColors(item.uploadStatus).text
                        } ${
                          getStatusColors(item.uploadStatus).bg
                        } font-inter font-medium text-[12px] leading-[18px] gap-[6px] px-[6px] flex items-center justify-center rounded-2xl w-fit`}
                      >
                        <div
                          className={`${
                            getStatusColors(item.uploadStatus).dot
                          } w-2 h-2 rounded-full`}
                        />
                        {item.uploadStatus}
                      </span>
                    </td>
                    <td className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8">
                      <Link to={item._id}>Review</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination section */}
            <div className="flex items-center justify-between mx-[25%] gap-3 mt-5">
              <div className="flex gap-3 items-center">
                <p>
                  {startIndex} - {endIndex} of {totalItems}
                </p>
              </div>
              <div className="flex items-center mx-auto gap-3">
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
              </div>
              <div className="flex gap-[40%] items-center">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`flex gap-2 text-[14px] font-Utile-medium leading-5 items-center ${
                    currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#5E5E5E]'
                  }`}
                >
                  <img src={Left} alt="" /> Prev
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`flex gap-2 text-[14px] font-Utile-medium leading-5 items-center ${
                    currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#5E5E5E]'
                  }`}
                >
                  Next <img src={Right} alt="" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto mt-[195px]">
            <img src={NoTrack} alt="No Track" />
            <p className="text-[#5E5E5E] text-[16px] font-formular-bold tracking-[-0.5px] leading-6 mt-[28px]">
              No Track
            </p>
            <p className="text-[#667085] text-[12px] font-formular-medium leading-4">
              You don't have any track
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageContent;
