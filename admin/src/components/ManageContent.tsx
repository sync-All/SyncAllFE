import React, { useState, useMemo } from 'react';
// import Filter from '../../assets/images/Filter-lines.svg';

import Dot from '../assets/images/dot.svg';
import ArrowDown from '../assets/images/arrowdown.svg';
import ArrowUp from '../assets/images/up-arrow.svg';

import NoTrack from '../assets/images/no_track.svg';
import LoadingAnimation from '../constants/loading-animation';
import Search from '../assets/images/search-1.svg';
import { useContent } from '../contexts/ContentContext';
import { Content } from '../contexts/ContentContext';
import { Link } from 'react-router-dom';
import usePagination from '../hooks/usePaginate';
import Left from '../assets/images/left-arrow.svg';
import Right from '../assets/images/right-arrow.svg'; 

// interface ManageContentProps {
//   onTabChange: (tab: string, content?: Content) => void;
// }

interface TableData {
  _id: string;
  trackTitle: string;
  email: string;
  status: string;
  role: string;
  name: string;
  img: string;
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
        sortConfig.key === sortKey && sortConfig.direction === 'ascending'
          ? ArrowUp
          : ArrowDown
      }
      alt="Sort"
    />
  </button>
);

const ManageContent = () => {
  const { content, loading } = useContent();

  console.log(content);

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const active =
    'text-[#F9F6FF] bg-[#013131] font-bold flex items-center flex-col h-8 w-8 rounded-[4px] p-1';

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  // Change to sort the full content data
  const sortedData = useMemo(() => {
    if (!Array.isArray(content) || content.length === 0) return [];

    return [...content].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      // Use nullish coalescing to provide fallback values for comparison
      const aValue = a[sortConfig.key as keyof Content] ?? '';
      const bValue = b[sortConfig.key as keyof Content] ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [content, sortConfig]);

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
  } = usePagination(sortedData, itemsPerPage);

  const totaltracks = sortedData.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totaltracks);

  if (loading) {
    return <LoadingAnimation />;
  }

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      {' '}
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
          <div>
            <div className="relative w-full flex items-center gap-4 min-w-[320px]">
              <input
                type="text"
                placeholder="Search User ID, Title, or Keywords"
                className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
                name="searchWord"
                // value={searchWord}
                // onChange={(e) => setSearchWord(e.target.value)}
              />
              <img
                src={Search}
                alt="Search"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              />
              {}
            </div>
          </div>
        </div>

        {paginatedItems.length > 0 ? (
          <div>
            {' '}
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
                    User{' '}
                    <SortButton
                      sortConfig={sortConfig}
                      sortKey="name"
                      onSort={handleSort}
                    />
                  </th>
                  <th className="text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6">
                    Status
                  </th>

                  <th className={ThStyles}>Actions</th>
                  <th className="bg-grey-100 py-3 px-6"></th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((content) => (
                  <tr
                    key={content.user._id}
                    className="items-center relative border border-r-0 border-l-0 "
                  >
                    <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                      {content.trackTitle}
                    </td>
                    <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                      {content.user.name}
                    </td>
                    <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-6 mx-6 rounded-2xl w-fit">
                      <img src={Dot} alt="Dot" />
                      ACTIVE
                    </td>

                    <td className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8 cursor-pointer">
                      <Link to={content._id}>Review</Link>
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
                  Next{' '}
                  <img src={Right} alt="" />
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
