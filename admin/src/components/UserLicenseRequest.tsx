import React, { useState, useMemo } from 'react';
import ArrowDown from '../assets/images/arrowdown.svg';
import ArrowUp from '../assets/images/up-arrow.svg';
// import { useSyncUser } from '../../../Context/syncUserData';
import NoPendingLicense from '../assets/images/no_track.svg';
import { Track, User } from '../contexts/UserContext';
import getStatusColors from '../helper/getStatusColors';

interface UserLicenseRequestProps {
  userDetails: User | undefined;
}

interface SortConfig {
  key: keyof Track | null;
  direction: 'ascending' | 'descending';
}

const SortButton: React.FC<{
  sortConfig: SortConfig;
  sortKey: keyof Track;
  onSort: (key: keyof Track) => void;
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

const UserLicenseRequest: React.FC<UserLicenseRequestProps> = ({
  userDetails,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });
  const pendingLicensedTracks = userDetails?.pendingLicensedTracks;

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const sortedData = useMemo(() => {
    return [...(pendingLicensedTracks || [])].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      const aValue = a[sortConfig.key as keyof Track];
      const bValue = b[sortConfig.key as keyof Track];

      if (aValue == null && bValue == null) return 0; // Both null or undefined
      if (aValue == null) return sortConfig.direction === 'ascending' ? -1 : 1; // aValue is null/undefined
      if (bValue == null) return sortConfig.direction === 'ascending' ? 1 : -1; // bValue is null/undefined

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [pendingLicensedTracks, sortConfig]);

  const handleSort = (key: keyof Track) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="mb-20">
      {sortedData.length > 0 ? (
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className={ThStyles}>
                Track
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="trackTitle"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Quote Request
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="createdAt"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Request Date
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="status"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                License Type
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="amount"
                  onSort={handleSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((track) => (
              <tr key={track._id}>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track.trackTitle}
                </td>

                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  <span
                    className={`${getStatusColors(track.uploadStatus).text} ${
                      getStatusColors(track.status).bg
                    } font-inter font-medium text-[12px] leading-[18px] gap-[6px] px-[6px] flex items-center justify-center rounded-2xl w-fit`}
                  >
                    <div
                      className={`${
                        getStatusColors(track.uploadStatus).dot
                      } w-2 h-2 rounded-full`}
                    ></div>
                    {track.uploadStatus}
                  </span>
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium py-4 leading-5 -4 px-8">
                  {new Date(track.createdAt).toLocaleDateString()}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {track.license_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-[109px] text-[16px] leading-[20px] py-6 ">
          <img src={NoPendingLicense} alt="" className="mx-auto" />
          <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
            User does not have any license request at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default UserLicenseRequest;
