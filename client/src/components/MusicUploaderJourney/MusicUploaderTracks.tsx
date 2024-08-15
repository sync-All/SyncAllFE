import React, { useState, useMemo } from 'react';
import Filter from '../../assets/images/Filter-lines.svg';
import Download from '../../assets/images/download-cloud.svg';
import Plus from '../../assets/images/plus.svg';
import DotMenu from '../../assets/images/threedot.svg';
import Dot from '../../assets/images/dot.svg';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/AddCircle.svg';
import { useDataContext } from '../../Context/DashboardDataProvider';
// import { useNavigate } from 'react-router-dom';
import MusicPlayer from '../MusicPlayer';
import { usePDF } from 'react-to-pdf'

interface Track {
  _id: string;
  trackTitle: string;
  releaseDate: string;
  uploadStatus: string;
  earnings: number;
}

interface TableData {
  trackTitle: string;
  releaseDate: string;
  uploadStatus: string;
  earnings: number;
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

const MusicUploaderTracks: React.FC = () => {
  // const navigate = useNavigate();

  // const navigateToUploadTracks = () => {
  //     navigate('/upload-tracks');
  // };

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const { dashboardData } = useDataContext();
  const myTracks = dashboardData?.dashboardDetails.totalTracks || [];

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const sortedData = useMemo(() => {
    return [...myTracks].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const aValue = a[sortConfig.key as keyof Track];
      const bValue = b[sortConfig.key as keyof Track];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [myTracks, sortConfig]);

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const {toPDF, targetRef} = usePDF({filename:'myTracks.pdf' })

  const scrollToUploadMusic = () => {
    const element = document.getElementById('uploadMusic');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    return(scrollToUploadMusic)
  };

  return (
    <div  ref={targetRef}>
      {' '}
      <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
        <div className="flex justify-between">
          <div>
            <span className="flex gap-2">
              <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
                Your Music Library
              </h2>
              <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
                Track List
              </p>
            </span>
            <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
              Manage all your uploaded tracks here.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="border-none bg-transparent py-2.5 px-4 flex items-center gap-2">
              <img src={Filter} alt="Filter" />
              <p>Filters</p>
            </button>
            <button className="border rounded-[8px] bg-transparent py-2.5 px-4 flex items-center gap-2">
              <img src={Download} alt="Download" />
              <button
                onClick={() => {
                  toPDF();
                }}
              >
                Download
              </button>
            </button>
            <button
              className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2" onClick={scrollToUploadMusic}
              
            >
              <img src={Plus} alt="Plus" />
              <p>Upload New Track</p>
            </button>
          </div>
        </div>

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
                Release Date
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="releaseDate"
                  onSort={handleSort}
                />
              </th>
              <th className="text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6">
                Upload Status
              </th>
              <th className={ThStyles}>
                Earning
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="earnings"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>Play Track</th>
              <th className="bg-grey-100 py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((track) => (
              <tr key={track['_id']} className="items-center">
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track['trackTitle']}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {new Date(track['releaseDate']).toLocaleDateString()}
                </td>
                <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-6 mx-6 rounded-2xl w-fit">
                  <img src={Dot} alt="Dot" />
                  {track['uploadStatus']}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {track['earnings']}
                </td>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  <MusicPlayer
                    trackLink={track['trackLink']}
                    containerStyle="mt-0 flex items-center gap-3"
                    buttonStyle="w-4 cursor-pointer"
                    waveStyle="w-[70px]"
                  />
                </td>
                <td className="py-4 px-4">
                  <span>
                    <img src={DotMenu} alt="Dot Menu" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MusicUploaderTracks;
