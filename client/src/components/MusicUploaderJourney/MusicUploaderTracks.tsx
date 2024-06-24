import React, { useState } from 'react';
import Filter from '../../assets/images/Filter-lines.svg';
import Download from '../../assets/images/download-cloud.svg';
import Plus from '../../assets/images/plus.svg';
import Duration from '../../assets/images/music-info.svg';
import DotMenu from '../../assets/images/threedot.svg';
import Dot from '../../assets/images/dot.svg';
import ArrowDown from '../../assets/images/arrowdown.svg';
import ArrowUp from '../../assets/images/AddCircle.svg'; 

interface TableData {
  trackName: string;
  uploadDate: string;
  uploadStatus: string;
  earning: string;
}

interface SortConfig {
  key: keyof TableData | null;
  direction: 'ascending' | 'descending';
}

const MusicUploaderTracks: React.FC = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: 'ascending',
  });


  

  const ThStyles =
    'text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ';

const tableData: TableData[] = [
  {
    trackName: 'Savannah Dreams',
    uploadDate: '20-05-2024',
    uploadStatus: 'Approved',
    earning: '$465,900',
  },
  {
    trackName: 'Track 2',
    uploadDate: '21-05-2024',
    uploadStatus: 'Pending',
    earning: '$300,500',
  },
  {
    trackName: 'Track 3',
    uploadDate: '22-05-2024',
    uploadStatus: 'Rejected',
    earning: '$0',
  },
  {
    trackName: 'Track 4',
    uploadDate: '23-05-2024',
    uploadStatus: 'Approved',
    earning: '$100,000',
  },
  {
    trackName: 'Track 5',
    uploadDate: '24-05-2024',
    uploadStatus: 'Pending',
    earning: '$200,000',
  },
  {
    trackName: 'Track 6',
    uploadDate: '25-05-2024',
    uploadStatus: 'Rejected',
    earning: '$0',
  },
  {
    trackName: 'Track 7',
    uploadDate: '26-05-2024',
    uploadStatus: 'Approved',
    earning: '$300,000',
  },
  {
    trackName: 'Track 8',
    uploadDate: '27-05-2024',
    uploadStatus: 'Pending',
    earning: '$400,000',
  },
  {
    trackName: 'Track 9',
    uploadDate: '28-05-2024',
    uploadStatus: 'Rejected',
    earning: '$0',
  },
  {
    trackName: 'Track 10',
    uploadDate: '29-05-2024',
    uploadStatus: 'Approved',
    earning: '$500,000',
  },
  {
    trackName: 'Track 11',
    uploadDate: '30-05-2024',
    uploadStatus: 'Pending',
    earning: '$600,000',
  },
  {
    trackName: 'Track 12',
    uploadDate: '31-05-2024',
    uploadStatus: 'Rejected',
    earning: '$0',
  },
  {
    trackName: 'Track 13',
    uploadDate: '01-06-2024',
    uploadStatus: 'Approved',
    earning: '$700,000',
  },
  {
    trackName: 'Track 14',
    uploadDate: '02-06-2024',
    uploadStatus: 'Pending',
    earning: '$800,000',
  },
  {
    trackName: 'Track 15',
    uploadDate: '03-06-2024',
    uploadStatus: 'Rejected',
    earning: '$0',
  },
  {
    trackName: 'Track 16',
    uploadDate: '04-06-2024',
    uploadStatus: 'Approved',
    earning: '$200,000',
  },
  {
    trackName: 'Track 17',
    uploadDate: '05-06-2024',
    uploadStatus: 'Pending',
    earning: '$150,000',
  },
];

  const sortedData = [...tableData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
    return 0;
  });

  const handleSort = (key: keyof TableData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
      <div className=" flex justify-between">
        <div className="">
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
            <img src={Filter} alt="" />
            <p>Filters</p>
          </button>
          <button className="border rounded-[8px] bg-transparent py-2.5 px-4 flex items-center gap-2">
            <img src={Download} alt="" />
            <p>Download</p>
          </button>
          <button className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2">
            <img src={Plus} alt="" />
            <p>Upload New Track</p>
          </button>
        </div>
      </div>

      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className={ThStyles}>
              Track Name{' '}
              <button onClick={() => handleSort('trackName')}>
                <img
                  src={
                    sortConfig.key === 'trackName' &&
                    sortConfig.direction === 'ascending'
                      ? ArrowUp
                      : ArrowDown
                  }
                  alt="Sort"
                />
              </button>
            </th>
            <th className={ThStyles}>
              Upload Date{' '}
              <button onClick={() => handleSort('uploadDate')}>
                <img
                  src={
                    sortConfig.key === 'uploadDate' &&
                    sortConfig.direction === 'ascending'
                      ? ArrowUp
                      : ArrowDown
                  }
                  alt="Sort"
                />
              </button>
            </th>
            <th className="text-[#667085] font-formular-medium text-[12px] leading-5 text-start pl-8 bg-grey-100 py-3 px-6 ">
              Upload Status
            </th>
            <th className={ThStyles}>
              Earning{' '}
              <button onClick={() => handleSort('earning')}>
                <img
                  src={
                    sortConfig.key === 'earning' &&
                    sortConfig.direction === 'ascending'
                      ? ArrowUp
                      : ArrowDown
                  }
                  alt="Sort"
                />
              </button>
            </th>
            <th className={ThStyles}>
              Play Track{' '}
              <button>
                <img src={ArrowDown} alt="Sort" />
              </button>
            </th>
            <th className="bg-grey-100 py-3 px-6"></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((data, index) => (
            <tr key={index}>
              <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                {data.trackName}
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {data.uploadDate}
              </td>
              <td className="text-[#037847] bg-[#ECFDF3] font-formular-medium text-[14px] leading-5 gap-[6px] px-2 flex items-center justify-center my-[11px] mx-6 rounded-2xl w-fit">
                <img src={Dot} alt="" />
                {data.uploadStatus}
              </td>
              <td className="text-[#667085] font-inter text-[14px] font-medium leading-5 py-4 px-8">
                {data.earning}
              </td>
              <td className="text-[#101828] font-formular-medium text-[14px] leading-5 py-4 px-8">
                <img src={Duration} alt="" />
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
    </div>
  );
};

export default MusicUploaderTracks;
