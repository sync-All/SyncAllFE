import React from 'react';
import Modal from 'react-modal';
import Confirm from '../../../assets/images/confirm.svg'

interface DisputeSuccessProps {
  isOpen: boolean;
  onClose: () => void;
}

const DisputeSuccess: React.FC<DisputeSuccessProps> = ({
  isOpen,
  onClose,
}) => {
  Modal.setAppElement('#root');
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-[200]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60"
    >
    <div className="bg-[#FFF8E7] rounded-lg p-8 max-w-lg mx-auto shadow-lg">
      <div className="flex flex-col items-center text-center">
        <span>
          <img src={Confirm} alt="" />
        </span>{' '}
        <h2 className="text-[56px] text-[#013131] font-Utile-bold  leading-[56px] tracking-[-2.24px] mt-[28px]">
          Dispute Filed Successfully!
        </h2>
        <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
          Your dispute has been filed successfully. Our team will review the
          details and get back to you shortly.
        </p>
        <div className="flex space-x-4 mt-[56px]">
          <button
            
            className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]"
          >
            View Disputes
          </button>
          <button
            onClick={onClose}
            className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] "
          >
            Okay
          </button>
        </div>
      </div>
    </div>
       </Modal>
  );
}

export default DisputeSuccess;
