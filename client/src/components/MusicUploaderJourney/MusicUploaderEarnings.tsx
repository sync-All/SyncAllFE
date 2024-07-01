import React from 'react';
import Logo from '../../assets/light-sync-logo.svg';
import Withdraw from '../../assets/images/withdraw.svg';
import Average from '../../assets/images/average.svg';
import Filter from '../../assets/images/Filter-lines.svg';
import Download from '../../assets/images/download-cloud.svg';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/AddCircle.svg';
import { useState, useMemo } from 'react';
import DotMenu from '../../assets/images/threedot.svg';
import Dot from '../../assets/images/dot.svg';
import WithdrawalModal from './WithdrawalModal';
import { useDataContext } from '../../Context/DashboardDataProvider';

interface TableData {
  transactionId: string;
  transactionType: string;
  transactionStatus: string;
  amount: string;
  date: Date;
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

const MusicUploaderEarnings: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const earningInfo = useDataContext();
  const earningDetails = Array.isArray(
    earningInfo.dashboardData?.dashboardDetails?.earnings
  )
    ? earningInfo.dashboardData.dashboardDetails.earnings[0]
    : {};

  const transactionDetails = earningInfo.dashboardData?.transactions || [];

  const sortedData = useMemo(() => {
    return [...transactionDetails].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const aValue = a[sortConfig.key as keyof TableData];
      const bValue = b[sortConfig.key as keyof TableData];

      if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });
  }, [transactionDetails, sortConfig]);

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className="lg:mx-8 ml-5 mt-[38px] mb-[96px]">
      <div className="relative bg-black2 rounded-[20px] flex flex-col w-full px-10 text-white">
        <div className="flex flex-col gap-3 justify-center pt-10">
          <p className="font-Utile-regular text-[16px] leading-[23px]">
            Your available balance:
          </p>
          <h2 className="font-Utile-bold text-[36px] tracking-[-1.44px] leading-[43.2px]">
            {earningDetails?.availableBal}
          </h2>
        </div>
        <div className="flex justify-between text-[16px] font-Utile-regular leading-[23.2px] mt-[25px] pb-10 ">
          <p>
            {earningDetails?.accNumber} <br />
            {earningDetails?.accName}, {earningDetails?.bankName}
          </p>
          <span>
            <button
              className="py-2.5 px-4 flex items-center gap-2 text-black2 font-Utile-medium text-[14px] leading-[20px] bg-yellow border border-yellow rounded-lg"
              onClick={openModal}
            >
              <img src={Withdraw} alt="" />
              <p>Withdraw Money</p>
            </button>
          </span>
        </div>
        <span className="absolute left-[25%]">
          <img src={Logo} alt="" />
        </span>
      </div>
      <div className="flex gap-6 mt-[19px]">
        <div className="py-5 pr-[61px] pl-4 border rounded-[10px] gap-[15px]">
          <img src={Withdraw} alt="" className="p-2 border rounded-[5px]"></img>
          <div className="flex flex-col gap-2">
            <p className="font-formular-light text-[14px]text-[#667185]">
              Total Earnings:
            </p>
            <h2 className="font-formular-regular text-[32px] text-[#1D2739]">
              <span className="font-Utile-regular">&#36;</span>{' '}
              {earningDetails?.totalEarnings}
            </h2>
          </div>
        </div>
        <div className="py-5 pr-[61px] pl-4 border rounded-[10px] gap-[15px]">
          <img src={Withdraw} alt="" className="p-2 border rounded-[5px]" />
          <div className="flex flex-col gap-2">
            <p className="font-formular-light text-[14px]text-[#667185]">
              Total Withdrawals
            </p>
            <h3 className="font-formular-regular text-[32px] text-[#1D2739]">
              <span className="font-Utile-regular">&#36;</span>{' '}
              {earningDetails?.totalWithdrawals}
            </h3>
          </div>
        </div>
        <div className="py-5 pr-[61px] pl-4 border rounded-[10px] gap-[15px]">
          <img src={Average} alt="" className="p-2 border rounded-[5px]" />
          <div className="flex flex-col gap-2">
            <p className="font-formular-light text-[14px]text-[#667185]">
              Average Monthly Earnings
            </p>
            <h3 className="font-formular-regular text-[32px] text-[#1D2739]">
              <span className="font-Utile-regular">&#36;</span>{' '}
              {earningDetails?.averageMonthlyEarnings}
            </h3>
          </div>
        </div>
      </div>
      <div className=" mt-[57px] flex justify-between">
        <div className="">
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              Transaction History
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
              Track List
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            See all your credit and debit history
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="border-none bg-transparent py-2.5 px-4 flex items-center gap-2">
            <img src={Filter} alt="" />
            <p>Filters</p>
          </button>
          <button className="border rounded-[8px] bg-transparent py-2.5 px-4 flex items-center gap-2">
            <img src={Download} alt="" />
            <p>Download</p>
          </button>
        </div>
      </div>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className={ThStyles}>
              Transaction ID
              <SortButton
                sortConfig={sortConfig}
                sortKey="transactionId"
                onSort={handleSort}
              />
            </th>
            <th className={ThStyles}>
              Transaction Type{' '}
              <SortButton
                sortConfig={sortConfig}
                sortKey="transactionType"
                onSort={handleSort}
              />
            </th>
            <th className="text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ">
              Transaction Status
            </th>
            <th className={ThStyles}>
              Amount{' '}
              <SortButton
                sortConfig={sortConfig}
                sortKey="amount"
                onSort={handleSort}
              />
            </th>
            <th className={ThStyles}>
              Date
              <SortButton
                sortConfig={sortConfig}
                sortKey="date"
                onSort={handleSort}
              />
            </th>
            <th className="bg-grey-100 py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                {data.transactionId}
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {data.transactionType}
              </td>
              <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-[11px] mx-6 rounded-2xl w-fit">
                <img src={Dot} alt="" />
                {data.transactionStatus}
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {data.amount}
              </td>
              <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                {data.date.toLocaleDateString()}
              </td>
              <td className=" py-4 px-4">
                <span>
                  <img src={DotMenu} alt="" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <WithdrawalModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default MusicUploaderEarnings;
