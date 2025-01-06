import { useMemo, useState } from 'react';
import LoadingAnimation from '../constants/loading-animation';
import { Content, useContent } from '../contexts/ContentContext';
import { Link, useParams } from 'react-router-dom';
import ArrowDown from '../assets/images/arrowdown.svg';
import ArrowUp from '../assets/images/up-arrow.svg';
import MusicPlayer from './MusicPlayer';
import Dot from '../assets/images/dot.svg';
import NoTrack from '../assets/images/no_track.svg';
import usePagination from '../hooks/usePaginate';
import Left from '../assets/images/left-arrow.svg';
import Right from '../assets/images/right-arrow.svg';
import SpotifyHelper from '../helper/spotifyHelper';

interface SortConfig {
  key: keyof Content | null;
  direction: 'ascending' | 'descending';
}

const SortButton: React.FC<{
  sortConfig: SortConfig;
  sortKey: keyof Content;
  onSort: (key: keyof Content) => void;
}> = ({ sortConfig, sortKey, onSort }) => (
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

const MusicUploaderTrack = () => {
  const { content, loading } = useContent();
  const { id } = useParams();

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  const fetchContentById = (id: string) => {
    return content.filter((item) => item.user._id === id);
  };
  const tracks = fetchContentById(id || '');

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!Array.isArray(tracks) || tracks.length === 0) return [];

    return [...tracks].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      // Use nullish coalescing to provide fallback values for comparison
      const aValue = a[sortConfig.key as keyof Content] ?? '';
      const bValue = b[sortConfig.key as keyof Content] ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [tracks, sortConfig]);

  const handleSort = (key: keyof Content) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
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
  } = usePagination(sortedData, itemsPerPage);

  const totaltracks = sortedData.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="mb-[96px]">
      {tracks.length > 0 ? (
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className={ThStyles}>
                  Track Name
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="trackTitle"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Upload Date
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="releaseDate"
                    onSort={handleSort}
                  />
                </th>
                <th className="text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6">
                  Upload Status
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="uploadStatus"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Earnings ($)
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="earnings"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Play Track
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="duration"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((track) => (
                <tr key={track._id} className="items-center relative">
                  <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                    {track.trackTitle}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {new Date(track.releaseDate).toLocaleDateString()}
                  </td>
                  <td> <div className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px]  px-2 flex items-center justify-center  rounded-2xl w-fit ">
                    <img src={Dot} alt="Dot" />
                    {track.uploadStatus}
                  </div></td>
                 
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {track.earnings}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8  max-h-5">
                    {track.trackLink ? (
                      <MusicPlayer
                        trackLink={track.spotifyLink}
                        songId={track._id}
                        containerStyle="mt-0 flex items-center gap-3"
                        buttonStyle="w-4 cursor-pointer"
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
                  <td className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8 cursor-pointer">
                    <Link to={`/admin/manage-contents/${track._id}`}>View</Link>
                  </td>
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
  );
};

export default MusicUploaderTrack;
