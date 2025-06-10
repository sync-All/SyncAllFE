import React from 'react';
import debounce from 'lodash/debounce';
import { useState, useMemo, useEffect } from 'react';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/up-arrow.svg';
import LoadingAnimation from '../../constants/loading-animation';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import usePagination from '../../hooks/usePaginate';
import NoTrack from '../../assets/images/no_track.svg';
import Search from '../../assets/images/search-1.svg';
import Left from '../../assets/images/left-arrow.svg';
import Right from '../../assets/images/right-arrow.svg';
import { useParams } from 'react-router-dom';
import TransferModal from './TransferModal';
import { Track } from '../../declaration';

// Remove duplicate TableData interface since we're not using its additional fields
type TableData = Track;

type SortableFields =
  | 'trackTitle'
  | 'mainArtist'
  | 'name'
  | 'createdAt'
  | 'earnings';

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

const Transfer = () => {
  const [uploaderContent, setUploaderContent] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<TableData[]>([]);
  const [contentSearch, setContentSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContent, setSelectedContent] = useState<
    { contentId: string; user: string }[]
  >([]);

  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('User ID is required');
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  useEffect(() => {
    fetchUploaderContent();
  }, []);

  const fetchUploaderContent = async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/all_content?user=${id}`;

    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        headers: { Authorization: token },
        withCredentials: true,
      });

      // Filter out items with uploadStatus: 'pending'
      const filteredContent = response.data.filter(
        (item: Track) => item.uploadStatus !== 'Pending'
      );

      setUploaderContent(filteredContent);
      console.log(`filteredContent : `, filteredContent);
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

  const baseData = useMemo(() => {
    return contentSearch.trim() === '' ? uploaderContent : searchResults;
  }, [uploaderContent, searchResults, contentSearch]);

  const sortedData = useMemo(() => {
    if (!Array.isArray(baseData) || !baseData.length || !sortConfig.key) {
      return baseData;
    }

    return [...baseData].sort((a, b) => {
      const key = sortConfig.key;
      if (!key) return 0;

      let aValue: string;
      let bValue: string;

      if (key === 'name') {
        aValue = a.user?.name || '';
        bValue = b.user?.name || '';
      } else {
        aValue = a[key]?.toString() || '';
        bValue = b[key]?.toString() || '';
      }

      return sortConfig.direction === 'ascending'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });
  }, [baseData, sortConfig]);

  const handleSort = (key: SortableFields) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };

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
        headers: { Authorization: token },
        withCredentials: true,
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

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination(sortedData, ITEMS_PER_PAGE);

  const totalItems = sortedData.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6';

  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  return (
    <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
      <div className="flex justify-between">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              Music Library
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
              Track List
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Manage all platform tracks here.{' '}
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative flex-grow ">
            <input
              type="text"
              placeholder="Search by artist name or track"
              className="pl-10 pr-4 py-2.5 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
              name="searchWord"
              onChange={handleSearch}
              value={contentSearch}
            />
            <img
              src={Search}
              alt="Search"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
            />
          </div>{' '}
          <button
            className="disabled:bg-[#667085] disabled:cursor-not-allowed cursor-default bg-black  text-[#F9F6FF] font-formular-normal text-[14px] leading-5 py-2.5 px-4 rounded-lg "
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedContent || selectedContent.length === 0}
          >
            Transfer Ownership
          </button>
        </div>
      </div>

      {isLoading ? (
        <LoadingAnimation />
      ) : paginatedItems.length > 0 ? (
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className={ThStyles}></th>
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
                  Upload Date
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="createdAt"
                    onSort={handleSort}
                  />
                </th>

                <th className={ThStyles}>
                  Earnings{' '}
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="earnings"
                    onSort={handleSort}
                  />
                </th>

               
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((item) => (
                <tr
                  key={item._id}
                  className="items-center relative border border-r-0 border-l-0"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedContent.some(
                        (c) => c.contentId === item._id
                      )}
                      onChange={(e) => {
                        const isChecked = e.target.checked;

                        setSelectedContent((prev) =>
                          isChecked
                            ? [
                                ...prev,
                                { contentId: item._id, user: item.user.name },
                              ]
                            : prev.filter((c) => c.contentId !== item._id)
                        );
                      }}
                    />
                  </td>

                  <td className="text-[#101828] font-inter font-medium text-[14px] leading-5 py-4 px-8">
                    {item.trackTitle}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {item.mainArtist}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </td>

                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    ${item.earnings}
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
      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedContents={selectedContent}
      />
    </div>
  );
};

export default Transfer;
