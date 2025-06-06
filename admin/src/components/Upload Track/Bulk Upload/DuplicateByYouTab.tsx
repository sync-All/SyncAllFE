import React, { useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import ArrowDown from '../../../assets/images/arrowdown.svg';
import ArrowUp from '../../../assets/images/up-arrow.svg';
import usePagination from '../../../hooks/usePaginate';
import Left from '../../../assets/images/left-arrow.svg';
import Right from '../../../assets/images/right-arrow.svg';
import NoTrack from '../../.../../../assets/images/no_track.svg';
import { TrackData } from './ResolveError';


interface SortButtonProps {
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  sortKey: string;
  onSort: (key: string) => void;
  ArrowUp: string;
  ArrowDown: string;
}

const SortButton: React.FC<SortButtonProps> = ({
  sortConfig,
  sortKey,
  onSort,
  ArrowUp,
  ArrowDown,
}) => (
  <button onClick={() => onSort(sortKey)} className="ml-1">
    {sortConfig?.key === sortKey && sortConfig?.direction ? (
      <img
        src={sortConfig.direction === 'asc' ? ArrowUp : ArrowDown}
        alt={`Sort ${
          sortConfig.direction === 'asc' ? 'ascending' : 'descending'
        }`}
      />
    ) : (
      <img src={ArrowDown} alt="Sort" />
    )}
  </button>
);

const DuplicateByYouTab: React.FC<{ tracks: TrackData[] }> = ({ tracks }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  


  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    }));
  };

  const sortedTracks = useMemo(() => {
    if (!sortConfig) return tracks;
    return [...tracks].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof TrackData] ?? '';
      const bValue = b[sortConfig.key as keyof TrackData] ?? '';
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      return 0;
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
  const totaltracks = sortedTracks.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);
  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';
  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6';

 

  return (
    <>
      {paginatedItems.length > 0 ? (
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
                    ArrowUp={ArrowUp}
                    ArrowDown={ArrowDown}
                  />
                </th>
                <th className={ThStyles}>Status</th>
                <th className={ThStyles}>
                  Error Type
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="message"
                    onSort={handleSort}
                    ArrowUp={ArrowUp}
                    ArrowDown={ArrowDown}
                  />
                </th>
                <th className={ThStyles}>Suggested Actions</th>
                <th className={ThStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedItems.map((track) => (
                <tr key={track._id} className="border-b border-[#EAECF0]">
                  <td className="text-[#101828] font-inter font-medium text-[14px] leading-5 py-3 px-6">
                    {track.trackTitle}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-3 px-6">
                    ❌ Failed
                  </td>
                  <td className="text-[#667085] font-inter font-normal text-[14px] leading-5 py-3 px-6">
                    {track.message}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-3 px-6">
                    Replace or Ignore
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px] rounded"
                      
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-between mx-[25%] gap-3 mt-5">
            <div className="flex gap-3 items-center">
              <p>
                {startIndex} - {endIndex} of {totaltracks}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {getPaginationRange().map((page, index) =>
                typeof page === 'number' ? (
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
                ) : (
                  <span key={index}>...</span>
                )
              )}
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
        <div className="text-center mt-[109px] text-[16px] leading-[20px] py-6">
          <img src={NoTrack} alt="" className="mx-auto" />
          <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
            No duplicate uploads by you found
          </p>
        </div>
      )}

     
    </>
  );
};

export default DuplicateByYouTab;
