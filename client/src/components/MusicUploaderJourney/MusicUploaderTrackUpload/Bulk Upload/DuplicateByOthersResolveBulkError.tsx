

import React from 'react';
import Modal from 'react-modal';
import Warning from '../../../../assets/images/warning.svg';

interface DuplicateByOthersResolveBulkErrorProps {
  isOpen: boolean;
  onClose: () => void;
  errorCount: number;
}

const DuplicateByOthersResolveBulkError: React.FC<
  DuplicateByOthersResolveBulkErrorProps
> = ({ isOpen, onClose, errorCount }) => {
  Modal.setAppElement('#root');
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-[200]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
    >
      <div className="bg-[#FFF8E7] rounded-lg p-8 max-w-lg mx-auto shadow-lg relative">
        <div className="flex flex-col items-center text-center">
          <span>
            <img src={Warning} alt="" />
            <p
              className="absolute top-[56px] right-[56px] font-bold cursor-pointer"
              onClick={onClose}
            >
              X
            </p>
          </span>{' '}
          <h2 className="text-[56px] text-[#013131] font-Utile-bold  leading-[56px] tracking-[-2.24px] mt-[28px]">
            Resolve Duplicate Uploads by another user in bulk
          </h2>
          <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
            We have identified{' '}
            <span className="font-semibold">{errorCount}</span> duplicate tracks
            that are already uploaded by another user. If you believe you own
            the rights to these track, you can file dispute. Otherwise, you may
            ignore the tracks and proceed with the other uploads.
          </p>
          <div className="flex space-x-4 mt-[56px]">
            <button
              onClick={onClose}
              className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]"
            >
              Ignore All Tracks
            </button>
            <button className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] ">
              File Dispute for All
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateByOthersResolveBulkError;
