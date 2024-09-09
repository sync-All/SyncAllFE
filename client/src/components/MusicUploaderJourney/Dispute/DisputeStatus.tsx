import React, { useState, useEffect, useMemo } from 'react';
// import DotMenu from '../../../assets/images/threedot.svg';
import Dot from '../../../assets/images/dot.svg';
import ArrowDown from '../../../assets/images/arrowdown.svg';
import ArrowUp from '../../../assets/images/up-arrow.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import NoDispute from '../../../assets/images/no_dispute.svg';

interface Dispute {
  _id: string;
  disputeId: string;
  createdAt: string;
  nameOfTrack: string;
  issueType: string;
  status: string;
}

interface TableData {
  disputeId: string;
  nameOfTrack: string;
  issueType: string;
  status: string;
  createdAt: string;
}

interface SortConfig {
  key: keyof TableData | null;
  direction: 'ascending' | 'descending';
}

interface ResponseData {
  message: Dispute[];
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

const DisputeStatus = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const CACHE_KEY = 'cachedDisputes';
  const CACHE_TIMESTAMP_KEY = 'cacheTimestamp';
  const CACHE_DURATION = 60000; // 1 minute

  const fetchDisputes = async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/alldispute`;
    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };

    try {
      const response = await axios.get<ResponseData>(apiUrl, config);
      setDisputes(response.data.message);
      localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.message));
      localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;

      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    }
  };

  const shouldFetchData = () => {
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!cachedTimestamp) return true;
    const age = Date.now() - parseInt(cachedTimestamp, 10);
    return age > CACHE_DURATION;
  };

  useEffect(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedData && !shouldFetchData()) {
      setDisputes(JSON.parse(cachedData));
    } else {
      fetchDisputes();
    }
  }, []);

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const sortedData = useMemo(() => {
    return [...disputes].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const aValue = a[sortConfig.key as keyof Dispute];
      const bValue = b[sortConfig.key as keyof Dispute];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [disputes, sortConfig]);

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="">
      {disputes.length > 0 ? (
        <table className="w-full mt-5">
          <thead>
            <tr>
              <th className={ThStyles}>
                Dispute ID
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="disputeId"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Date Filed
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="createdAt"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Track Name
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="nameOfTrack"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Issue Type
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="issueType"
                  onSort={handleSort}
                />
              </th>
              <th className={ThStyles}>
                Dispute Status
                <SortButton
                  sortConfig={sortConfig}
                  sortKey="status"
                  onSort={handleSort}
                />
              </th>
              <th className="bg-grey-100 py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((dispute) => (
              <tr key={dispute._id}>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {dispute._id}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {new Date(dispute.createdAt).toLocaleDateString()}
                </td>
                <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                  {dispute.nameOfTrack}
                </td>
                <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                  {dispute.issueType}
                </td>
                <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-[11px] mx-6 rounded-2xl w-fit">
                  <img src={Dot} alt="Dot" />
                  {dispute.status}
                </td>
                <td className="py-4 px-4">
                  <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-[109px] text-[16px] leading-[20px] py-6 ">
          <img src={NoDispute} alt="" className="mx-auto" />
          <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
            You have no ongoing dispute
          </p>
        </div>
      )}
    </div>
  );
};

export default DisputeStatus;
