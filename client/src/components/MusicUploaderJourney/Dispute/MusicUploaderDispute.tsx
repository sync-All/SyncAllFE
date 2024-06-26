import { useState } from 'react';
import FileDispute from './FileDispute';
import DisputeStatus from './DisputeStatus';
import DisputeHistory from './DisputeHistory';

const MusicUploaderDispute = () => {
  const [activeSection, setActiveSection] = useState<string>('File New Dispute');

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';

  const renderSection = () => {
    switch (activeSection) {
      case 'File New Dispute':
        return <FileDispute />;
      case 'Dispute Status':
        return <DisputeStatus />;
      case 'Dispute History':
        return <DisputeHistory />;
    }
  };

  return (
    <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
      <div className="flex justify-between">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              Dispute Management
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
              Report/Resolve
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Manage and resolve issues related to your tracks
          </p>
        </div>
      </div>
      <div className="mt-8 ">
        <ul className="flex gap-8">
          <li
            className={`${liClass} ${
              activeSection === 'File New Dispute' ? `${activeLiClass}` : ''
            }`}
            onClick={() => {
              setActiveSection('File New Dispute');
            }}
          >
            File New Dispute
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Dispute Status' ? `${activeLiClass}` : ''
            }`}
            onClick={() => {
              setActiveSection('Dispute Status');
            }}
          >
            Dispute Status
          </li>
          <li
            className={`${liClass} ${
              activeSection === 'Dispute History' ? `${activeLiClass}` : ''
            }`}
            onClick={() => {
              setActiveSection('Dispute History');
            }}
          >
            Dispute History
          </li>
        </ul>
      </div>
      {renderSection()}
    </div>
  );
};

export default MusicUploaderDispute;
