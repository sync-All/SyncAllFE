import { useSyncUser } from '../../../Context/syncUserData';
import ArrowDown from '../../../assets/images/arrowdown.svg';
import ArrowUp from '../../../assets/images/AddCircle.svg';
import React, { useState, useMemo } from 'react';
import MusicPlayer from '../../MusicPlayer';
import NoPendingLicense from '../../../assets/images/no_track.svg';
import { TracklistDetails } from '../../../Context/syncUserData';

interface SortConfig {
  key: keyof TracklistDetails | null;
  direction: 'ascending' | 'descending';
}

const SortButton: React.FC<{
  sortConfig: SortConfig;
  sortKey: keyof TracklistDetails;
  onSort: (key: keyof TracklistDetails) => void;
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

const PendingLicense = () => {
  const { user } = useSyncUser();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });
  const licensedTracks = useMemo(() => {
    return user?.user?.totalLicensedTracks || [];
  }, [user]);

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const sortedData = useMemo(() => {
    return [...licensedTracks].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const aValue = a[sortConfig.key as keyof TracklistDetails];
      const bValue = b[sortConfig.key as keyof TracklistDetails];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [licensedTracks, sortConfig]);

  const handleSort = (key: keyof TracklistDetails) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="">
      {licensedTracks.length > 0 ? (
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className={ThStyles}>
                Track Name{' '}
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="trackTitle"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Request Date{' '}
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="date"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                License Status{' '}
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="status"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Amount{' '}
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="amount"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>Play Track</th>
              <th className="bg-grey-100 py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((track) => (
              <tr key={track._id}>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track.trackTitle}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {new Date(track.date).toLocaleDateString()}
                </td>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track.status}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {track.amount}
                </td>

                <td className="py-4 px-4">
                  <span>
                    <MusicPlayer trackLink={track.trackLink} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-[109px] text-[16px] leading-[20px] py-6 ">
          <img src={NoPendingLicense} alt="" className="mx-auto" />
          <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
            You have no pending license
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingLicense;