import React, { useState, useEffect, useMemo } from 'react';
import DotMenu from '../../../assets/images/threedot.svg';
import ArrowDown from '../../../assets/images/arrowdown.svg';
import ArrowUp from '../../../assets/images/up-arrow.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import NoDispute from '../../../assets/images/no_dispute.svg';
import getStatusColors from '../../../utils/getStatusColors';

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

const DisputeHistory = () => {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });


  useEffect(() => {
    const fetchData = async () => {
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
        const allData = response.data.message;
        const filteredData = allData.filter((item) => item.status !== 'Pending');

      
        setDisputes(filteredData);
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

    fetchData();
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
                Resolution
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
                <td className="py-4 px-8">
                  <span
                    className={`${getStatusColors(dispute.status).text} ${
                      getStatusColors(dispute.status).bg
                    } font-inter font-medium text-[12px] leading-[18px] gap-[6px] px-[6px] flex items-center justify-center rounded-2xl w-fit`}
                  >
                    <div
                      className={`${
                        getStatusColors(dispute.status).dot
                      } w-2 h-2 rounded-full`}
                    ></div>
                    {dispute.status}
                  </span>
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

export default DisputeHistory;
