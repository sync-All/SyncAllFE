// import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

interface SuspendAccountModal {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
}



const SuspendAccountModal: React.FC<SuspendAccountModal> = ({
  isOpen,
  onClose,
  recipient,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically integrate with your email sending service
    console.log('Sending email:', { recipient });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="border rounded-lg bg-white shadow-xl max-w-[600px] mx-auto mt-20 p-8"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <button
        onClick={onClose}
        className="text-black font-bold w-full text-[24px] hover:text-[32px] transition-all ease-out text-right"
      >
        ×
      </button>
      <div className=" rounded-t-lg">
        <h2 className="text-[32px] font-inter font-semibold leading-[120%] tracking-[-0.32px] mt-[7px]">
          Suspend Account
        </h2>
        <p className="mt-6 text-base font-inter tracking-[-0.4px] text-[#3A434B]">
          Enter the reason for suspending this account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          name=""
          id=""
          className="bg-[#F4F5F6] w-full h-[232px] border border-[#D7DCE0]"
        ></textarea>
          <div className="flex justify-end mt-[36px]">
          <button className="w-fit bg-[#DE1212] py-[9px] px-[28px] text-white text-[14px] rounded-[4px] font-inter font-medium tracking-[-0.14px]">
            Suspend
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuspendAccountModal;

