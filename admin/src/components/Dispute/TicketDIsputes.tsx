import { useMemo, useState } from 'react';
import Search from '../../assets/images/search-1.svg';
import LoadingAnimation from '../../constants/loading-animation';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/up-arrow.svg';
import Dot from '../../assets/images/dot.svg';
import NoDispute from '../../assets/images/no_track.svg';
import { Link, useParams } from 'react-router-dom';
import { AssociatedDispute, useDispute } from '../../contexts/DisputeContext';

interface SortConfig {
  key: keyof AssociatedDispute | null;
  direction: 'ascending' | 'descending';
}

const SortButton: React.FC<{
  sortConfig: SortConfig;
  sortKey: keyof AssociatedDispute;
  onSort: (key: keyof AssociatedDispute) => void;
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

const TicketDIsputes = () => {
  const { id } = useParams();
  const { dispute, loading } = useDispute();

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const ticketDispute = dispute.find((d) => d._id === id); // Retrieve main dispute by ID
  const disputes = ticketDispute?.associatedDisputes || [];

  const totalDisputes = disputes.length;

  console.log(disputes);

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const sortedData = useMemo(() => {
    if (!Array.isArray(disputes) || dispute.length === 0) return [];

    return [...disputes].sort((a, b) => {
      if (sortConfig.key === null) return 0;

      // Use nullish coalescing to provide fallback values for comparison
      const aValue = a[sortConfig.key as keyof AssociatedDispute] ?? '';
      const bValue = b[sortConfig.key as keyof AssociatedDispute] ?? '';

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [dispute, sortConfig]);

  const handleSort = (key: keyof AssociatedDispute) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

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
                {ticketDispute?.user.name}
                <span className="font-Utile-medium">'</span> s Disputes
              </h2>
              <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
                {totalDisputes} Disputes
              </p>
            </span>
            <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
              Review and manage user-generated content{' '}
            </p>
          </div>
          <div>
            <div className="relative w-full flex items-center gap-4 min-w-[320px]">
              <input
                type="text"
                placeholder="Search Dispute ID, Title, or Keywords"
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
            </div>
          </div>
        </div>
        {disputes.length > 0 ? (
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className={ThStyles}>
                  Dispute ID
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="_id"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Associated Item
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="nameOfTrack"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Filed Date
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="createdAt"
                    onSort={handleSort}
                  />
                </th>
                <th className={ThStyles}>
                  Dispute Reason{' '}
                  <SortButton
                    sortConfig={sortConfig}
                    sortKey="issueType"
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
                {/* <th className="bg-grey-100 py-3 px-6"></th> */}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((dispute) => (
                <tr key={dispute._id} className="items-center relative">
                  <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                    {dispute._id}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {dispute.nameOfTrack}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {new Date(dispute.createdAt).toLocaleDateString()}
                  </td>
                  <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                    {dispute.issueType}
                  </td>
                  <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-6 mx-6 rounded-2xl w-fit">
                    <img src={Dot} alt="Dot" />
                    {dispute.status}
                    {/* {track.uploadStatus} */}
                  </td>
                  <td>
                    {' '}
                    <Link
                      to={`/admin/dispute-tick/details/${dispute._id}`}
                      className="text-[#1671D9] font-formular-medium text-[14px] leading-5 py-4 px-8 cursor-pointer"
                      // onClick={() => onTabChange('Quote Detail', user)}
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
        ) : (
          <div className="flex flex-col justify-center items-center mx-auto mt-[195px]">
            <img src={NoDispute} alt="No Track" />
            <p className="text-[#5E5E5E] text-[16px] font-formular-bold tracking-[-0.5px] leading-6 mt-[28px]">
              No Quotes
            </p>
            <p className="text-[#667085] text-[12px] font-formular-medium leading-4">
              You don't have any quote at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDIsputes;
