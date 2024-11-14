

// import React, { useState, useMemo } from 'react';
// import ArrowDown from '../assets/images/arrowdown.svg';
// import ArrowUp from '../assets/images/up-arrow.svg';
// import { useSyncUser } from '../../../Context/syncUserData';
import NoPendingLicense from '../assets/images/no_track.svg';

// interface SortConfig {
//   key: keyof LicensedTracks | null;
//   direction: 'ascending' | 'descending';
// }

// const SortButton: React.FC<{
//   sortConfig: SortConfig;
//   sortKey: keyof LicensedTracks;
//   onSort: (key: keyof LicensedTracks) => void;
// }> = ({ sortConfig, sortKey, onSort }) => (
//   <button
//     type="button"
//     onClick={() => onSort(sortKey)}
//     aria-label={`Sort by ${sortKey}`}
//   >
//     <img
//       src={
//         sortConfig.key === sortKey && sortConfig.direction === 'ascending'
//           ? ArrowUp
//           : ArrowDown
//       }
//       alt="Sort"
//     />
//   </button>
// );

const UserLicenseRequest = () => {
  //  const { user } = useSyncUser();
  //  const [sortConfig, setSortConfig] = useState<SortConfig>({
  //    key: null,
  //    direction: 'ascending',
  //  });
  //  const pendingTracks = useMemo(() => {
  //    return user?.user?.pendingLicensedTracks || [];
  //  }, [user]);

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  //  const sortedData = useMemo(() => {
  //    return [...pendingTracks].sort((a, b) => {
  //      if (sortConfig.key === null) return 0;
  //      const aValue = a[sortConfig.key as keyof LicensedTracks];
  //      const bValue = b[sortConfig.key as keyof LicensedTracks];

  //      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
  //      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
  //      return 0;
  //    });
  //  }, [pendingTracks, sortConfig]);

  //  const handleSort = (key: keyof LicensedTracks) => {
  //    let direction: 'ascending' | 'descending' = 'ascending';
  //    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
  //      direction = 'descending';
  //    }
  //    setSortConfig({ key, direction });
  //  };

  const sortedData = [
    {
      _id: 1,
      track_name: 'tom',
      license_status: 'done',
      createdAt: '1/1/2021',
      license_type: 'Interpolation',
    },
  ];

  return (
    <div className="mb-20">
      {sortedData.length > 0 ? (
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className={ThStyles}>
                Track
                {/* <SortButton
                 sortConfig={sortConfig}
                 sortKey="track_name"
                 onSort={handleSort}
               /> */}
              </th>
              <th className={ThStyles}>
                Quote Request
                {/* <SortButton
                 sortConfig={sortConfig}
                 sortKey="createdAt"
                 onSort={handleSort}
               /> */}
              </th>
              <th className={ThStyles}>
                Request Date
                {/* <SortButton
                 sortConfig={sortConfig}
                 sortKey="license_status"
                 onSort={handleSort}
               /> */}
              </th>
              <th className={ThStyles}>
                License Type
                {/* <SortButton
                 sortConfig={sortConfig}
                 sortKey="amount"
                 onSort={handleSort}
               /> */}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((track) => (
              <tr key={track._id}>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track.track_name}
                </td>

                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {track.license_status}
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

