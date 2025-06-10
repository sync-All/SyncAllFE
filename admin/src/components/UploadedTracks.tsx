import React, { useState, useMemo, useEffect } from 'react';
import { Track } from '../declaration';
import Plus from '../assets/images/plus.svg'
import ArrowDown from '../assets/images/arrowdown.svg';
import ArrowUp from '../assets/images/up-arrow.svg';
import NoTrack from '../assets/images/no_track.svg';
import Left from '../assets/images/left-arrow.svg';
import Right from '../assets/images/right-arrow.svg';
import { Link, useLocation } from 'react-router-dom';
import SpotifyHelper from '../helper/spotifyHelper';
import MusicPlayer from './MusicPlayer';
import getStatusColors from '../helper/getStatusColors';
import usePagination from '../hooks/usePaginate';
import LoadingAnimation from '../constants/loading-animation';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import { useUploadHistory } from '../contexts/UploadHistoryContext';

// Types
interface SortConfig {
  key: keyof Track | null;
  direction: 'ascending' | 'descending';
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface TableProps {
  tracks: Track[];
  sortConfig: SortConfig;
  onSort: (key: keyof Track) => void;
}

interface SortButtonProps {
  sortConfig: SortConfig;
  sortKey: keyof Track;
  onSort: (key: keyof Track) => void;
}

interface EmptyStateProps {
  type: 'All' | 'Error';
}


// Components
const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 font-formular-medium ${
      active ? 'text-black2 border-b-2 border-black2' : 'text-[#667085]'
    }`}
  >
    {children}
  </button>
);

const SortButton: React.FC<SortButtonProps> = ({
  sortConfig,
  sortKey,
  onSort,
}) => (
  <button type="button" onClick={() => onSort(sortKey)} className="ml-2">
    <img
      src={
        sortConfig.key === sortKey && sortConfig.direction === 'ascending'
          ? ArrowUp
          : ArrowDown
      }
      alt="Sort"
      className="w-4 h-4"
    />
  </button>
);

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => (
  <div className="flex flex-col justify-center items-center mx-auto mt-[195px]">
    <img src={NoTrack} alt="No Track" />
    <p className="text-[#5E5E5E] text-[16px] font-formular-bold tracking-[-0.5px] leading-6 mt-[28px]">
      {type === 'All' ? 'No Tracks' : 'No Failed Uploads'}
    </p>
    <p className="text-[#667085] text-[12px] font-formular-medium leading-4">
      {type === 'All'
        ? 'You have not uploaded any track'
        : 'You have no failed track uploads'}
    </p>
  </div>
);

const AllTracksTable: React.FC<TableProps> = ({
  tracks,
  sortConfig,
  onSort,
}) => {
  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  const sortedTracks = useMemo(() => {
    return [...tracks].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key] ?? '';
      const bValue = b[sortConfig.key] ?? '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === 'ascending'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
  }, [tracks, sortConfig]);

  const itemsPerPage = 30;
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination(sortedTracks, itemsPerPage);

  const totaltracks = tracks.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);

  return (
    <>
      <TrackTable
        tracks={paginatedItems}
        sortConfig={sortConfig}
        onSort={onSort}
      />
      <div className="flex items-center justify-between lg:mx-8 gap-3 mt-[196px] ">
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
    </>
  );
};

const ErrorTracksTable: React.FC<TableProps> = ({
  tracks,
  sortConfig,
  onSort,
}) => {
  // const navigate = useNavigate();

  const sortedTracks = useMemo(() => {
    return [...tracks].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = a[sortConfig.key] ?? '';
      const bValue = b[sortConfig.key] ?? '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return sortConfig.direction === 'ascending'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });
  }, [tracks, sortConfig]);
  const itemsPerPage = 30;
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    getPaginationRange,
  } = usePagination(sortedTracks, itemsPerPage);

  const totaltracks = tracks.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);
  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';
  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6';

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length);
  };

  return (
    <>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className={ThStyles}>
              Upload ID
              <SortButton
                sortConfig={sortConfig}
                sortKey="uploadId"
                onSort={onSort}
              />
            </th>
            <th className={ThStyles}>
              Filename
              <SortButton
                sortConfig={sortConfig}
                sortKey="filename"
                onSort={onSort}
              />
            </th>
            <th className={ThStyles}>
              Upload Date
              <SortButton
                sortConfig={sortConfig}
                sortKey="createdAt"
                onSort={onSort}
              />
            </th>
            <th className={ThStyles}>
              Number of Errors
              <SortButton
                sortConfig={sortConfig}
                sortKey="errorCount"
                onSort={onSort}
              />
            </th>
            <th className={ThStyles}>Status</th>
            <th className={ThStyles}>Error Details</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((track) => (
            <tr key={track._id} className="hover:bg-gray-50">
              <td className="text-[#101828] font-inter font-medium text-[14px] leading-5 py-4 px-8 uppercase">
                <span className="font-inter">#</span>
                <span className="capilatize">
                  {truncateText(track.uploadId, 11)}
                </span>
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {track.filename}
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {new Date(track.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-8">
                <span className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {track.associatedErrors.length}
                </span>
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {track.status}
              </td>
              <td className="py-4 px-8">
                <Link to={`/dashboard/bulk-upload/resolve-errors/${track._id}`}>
                  {' '}
                  <button className="text-[#1671D9] hover:text-blue-800 font-inter">
                    View
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between lg:mx-8 gap-3 mt-[96px] ">
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
    </>
  );
};

const TrackTable: React.FC<TableProps> = ({ tracks, sortConfig, onSort }) => {
  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6';

  return (
    <table className="w-full mt-5">
      <thead>
        <tr>
          <th className={ThStyles}>
            Track Name
            <SortButton
              sortConfig={sortConfig}
              sortKey="trackTitle"
              onSort={onSort}
            />
          </th>
          <th className={ThStyles}>
            Release Date
            <SortButton
              sortConfig={sortConfig}
              sortKey="releaseDate"
              onSort={onSort}
            />
          </th>
          <th className={ThStyles}>Upload Status</th>
          <th className={ThStyles}>
            Earning
            <SortButton
              sortConfig={sortConfig}
              sortKey="earnings"
              onSort={onSort}
            />
          </th>
          <th className={ThStyles}>Play Track</th>
        </tr>
      </thead>
      <tbody>
        {tracks.map((track) => (
          <tr key={track._id} className="hover:bg-gray-50">
            <td className="text-[#101828] font-inter font-medium text-[14px] leading-5 py-4 px-8">
              {track.trackTitle}
            </td>
            <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
              {new Date(track.releaseDate).toLocaleDateString()}
            </td>
            <td className="py-4 px-8">
              <span
                className={`${getStatusColors(track.uploadStatus).text} ${
                  getStatusColors(track.uploadStatus).bg
                } font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center rounded-2xl w-fit`}
              >
                <div
                  className={`${
                    getStatusColors(track.uploadStatus).dot
                  } w-2 h-2 rounded-full`}
                ></div>
                {track.uploadStatus}
              </span>
            </td>

            <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
              ${track.earnings}
            </td>
            <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
              {track.trackLink ? (
                <MusicPlayer
                  trackLink={track.trackLink}
                  containerStyle="mt-0 flex items-center gap-3"
                  buttonStyle="w-4 cursor-pointer"
                  songId={track._id}
                  waveStyle="w-[70px]"
                />
              ) : (
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/track/${SpotifyHelper(
                    track?.spotifyLink || ''
                  )}?utm_source=generator`}
                  width="100%"
                  height="100"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UploadedTracks = () => {
  const { errorTracks, loading } = useUploadHistory();
  const { user } = useAuth();
  const [allTracks, setAllTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const fetchUploaderContent = async () => {
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/all_content?user=${user?._id}`;

    try {
      setIsLoading(true);
      const response = await axios.get(apiUrl, {
        withCredentials: true,
      });

      setAllTracks(response.data || []);
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUploaderContent();
  }, []);

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'All' | 'Error'>(
    location.state?.activeTab || 'All'
  );

  const handleSort = (key: keyof Track) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === 'ascending'
          ? 'descending'
          : 'ascending',
    }));
  };


  if (loading || isLoading) {
    <LoadingAnimation />;
  }

  const renderContent = () => {
    if (activeTab === 'All') {
      return allTracks.length > 0 ? (
        <AllTracksTable
          tracks={allTracks}
          sortConfig={sortConfig}
          onSort={handleSort}
        />
      ) : (
        <EmptyState type="All" />
      );
    }
    return errorTracks.length > 0 ? (
      <ErrorTracksTable
        tracks={errorTracks}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
    ) : (
      <EmptyState type="Error" />
    );
  };

  return (
    <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
            Your Music Library
          </h2>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Manage all your uploaded tracks here.
          </p>
        </div>
        <Link to='/admin/upload-contents'>   <button
          className="bg-yellow py-2.5 px-4 rounded-[8px] flex items-center gap-2"
          
        >
          <img src={Plus} alt="Add" className="w-4 h-4" />
          <span>Upload New Track</span>
        </button></Link>
     
      </div>

      <div className="border-b border-[#EAECF0] mb-6">
        <TabButton
          active={activeTab === 'All'}
          onClick={() => setActiveTab('All')}
        >
          All Uploads
        </TabButton>
        <TabButton
          active={activeTab === 'Error'}
          onClick={() => setActiveTab('Error')}
        >
          Upload Error History
        </TabButton>
      </div>

      {renderContent()}
    </div>
  );
};

export default UploadedTracks;
