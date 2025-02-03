// import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

interface RejectPostModal {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

interface ResponseData {
  message?: string;
}



const RejectPostModal: React.FC<RejectPostModal> = ({
  isOpen,
  onClose,
  contentId,
}) => {
  const handleContentReview = async (
    contentId: string,
    action: 'Approved' | 'Rejected'
  ) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/manage_content/review?contentId=${contentId}&actionTaken=${action}`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      await axios.get(apiUrl, config);

      toast.success(`Post ${action} successfully`);
      onClose();
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
          Reject Post
        </h2>
        <p className="mt-6 text-base font-inter tracking-[-0.4px] text-[#3A434B]">
          Enter the reason for rejecting this post{' '}
        </p>
      </div>
      <div className="mt-4">
        <textarea
          name=""
          id=""
          className="bg-[#F4F5F6] w-full h-[232px] border border-[#D7DCE0] p-2"
        ></textarea>
        <div className="flex justify-end mt-[36px]">
          <button
            className="w-fit bg-[#DE1212] py-[9px] px-[28px] text-white text-[14px] rounded-[4px] font-inter font-medium tracking-[-0.14px]"
            onClick={() => {
              if (contentId) {
                handleContentReview(contentId, 'Rejected');
              }
            }}
          >
            Reject Post
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectPostModal;

