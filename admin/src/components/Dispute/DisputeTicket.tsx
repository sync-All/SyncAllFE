import { useEffect, useMemo, useState } from 'react';
import Search from '../../assets/images/search-1.svg';
import LoadingAnimation from '../../constants/loading-animation';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/up-arrow.svg';
// import Dot from '../../assets/images/dot.svg';
import NoDispute from '../../assets/images/no_track.svg';
import { Link } from 'react-router-dom';
import { Dispute, useDispute } from '../../contexts/DisputeContext';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import debounce from 'lodash/debounce';
import usePagination from '../../hooks/usePaginate';
import Left from '../../assets/images/left-arrow.svg';
import Right from '../../assets/images/right-arrow.svg';

interface SortConfig {
  key: keyof Dispute | null;
  direction: 'ascending' | 'descending';
}

interface SortButtonProps {
  sortConfig: SortConfig;
  sortKey: keyof Dispute;
  onSort: (key: keyof Dispute) => void;
}

interface ResponseData {
  message?: string;
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
          ? ArrowDown
          : ArrowUp
      }
      alt="Sort"
    />
  </button>
);

const DisputeTicket = () => {
  const { dispute, loading } = useDispute();
  const [searchResults, setSearchResults] = useState<Dispute[]>([]);
  const [ticketSearch, setTicketSearch] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const fetchByTicket = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/ticket/search?filter=${searchTerm}`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      setIsLoading(true);
      const res = await axios.get(apiUrl, config);
      if (Array.isArray(res.data)) {
        setSearchResults(res.data); // Set users data as search results
      } else {
        // Handle unexpected response structure
        setSearchResults([]); // Set an empty array if structure doesn't match
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

  const debouncedFetch = debounce(fetchByTicket, 1000);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTicketSearch(value);

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

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';
  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!Array.isArray(dispute) || dispute.length === 0) return [];

    return [...dispute].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      // Use nullish coalescing to provide fallback values for comparison
      const aValue = a[sortConfig.key as keyof Dispute] ?? '';
      const bValue = b[sortConfig.key as keyof Dispute] ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [dispute, sortConfig]);

  const handleSort = (key: keyof Dispute) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length);
  };

  const displayContent =
    ticketSearch.trim() === '' ? sortedData : searchResults;

  // Apply pagination on the sorted data
  const itemsPerPage = 30;

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination(displayContent, itemsPerPage);

  const totaltracks = displayContent.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);


  console.log(paginatedItems);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
        <div className="flex justify-between">
          <div>
            <span className="flex gap-2">
              <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
                All Tickets
              </h2>
              <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
                All Tickets
              </p>
            </span>
            <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
              Review and manage user-generated content
            </p>
          </div>
          <div>
            <div className="relative w-full flex items-center gap-4 min-w-[320px]">
              <input
                type="text"
                placeholder="Search User ID, Title, or Keywords"
                className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
                name="searchWord"
                onChange={handleSearch}
                value={ticketSearch}
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
                    Ticket ID
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="tickId"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Username
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="user"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Number of Disputes
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="__v"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Date Opened
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="createdAt"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Last Updated
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="updatedAt"
                      onSort={handleSort}
                    />
                  </th>
                  <th className={ThStyles}>
                    Status
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="status"
                      onSort={handleSort}
                    />
                  </th>

                  <th className={ThStyles}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((ticket) => (
                  <tr className="items-center relative">
                    <td className="text-[#101828] font-inter font-medium uppercase text-[14px] leading-5 py-4 px-8">
                      # {truncateText(ticket.tickId, 12)}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {ticket.user.name || ticket.userDetails.name}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {Array.isArray(ticket.associatedDisputes)
                        ? ticket.associatedDisputes.length
                        : 0}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {new Date(ticket.updatedAt).toLocaleDateString()}
                    </td>

                    <td className="text-[#F3A218] bg-[#FEF6E7] font-inter font-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-6 mx-6 rounded-2xl w-fit">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                      >
                        <circle cx="4" cy="4" r="3" fill="#F3A218" />
                      </svg>
                      {ticket.status}
                    </td>
                    <td>
                      <Link
                        to={`/admin/dispute-tick/${ticket._id}`}
                        className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8 cursor-pointer"
                      >
                        View
                      </Link>
                    </td>

                    {/* <td
                    className={`py-4 px-4 ${
                      openDropdowns[track._id] ? 'flex' : ''
                    }`}
                  >
                    <span onClick={() => toggleDropdown(track._id)}>
                      <img src={DotMenu} alt="Dot Menu" />
                    </span>

                    {openDropdowns[track._id] && (
                      <div className="absolute z-10 flex flex-col gap-[8px] right-[-55px] rounded-[8px] py-2 px-4">
                        <button className="text-[#667085] font-formular-medium text-[12px] leading-5 border border-[#E4E7EC] p-2.5 rounded-[8px]">
                          Edit
                        </button>
                        <button className="text-white font-formular-medium text-[12px] leading-5 bg-red-600 border border-[#E4E7EC] p-2.5 rounded-[8px]">
                          Delete
                        </button>
                      </div>
                    )}
                  </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between mx-[25%] gap-3 mt-5 ">
              <div className="flex gap-3 items-center">
                <p>
                  {startIndex} - {endIndex} of {totaltracks}
                </p>
              </div>

              <div className="flex items-center mx-auto gap-3">
                <div className="gap-3 flex">
                  {getPaginationRange().map((page, index) =>
                    typeof page === 'number' ? (
                      <div>
                        <button
                          key={index}
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
                {' '}
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
            <img src={NoDispute} alt="No Track" />
            <p className="text-[#5E5E5E] text-[16px] font-formular-bold tracking-[-0.5px] leading-6 mt-[28px]">
              No Disputes
            </p>
            <p className="text-[#667085] text-[12px] font-formular-medium leading-4">
              You don't have any dispute at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeTicket;
