import React from 'react';
import Modal from 'react-modal';
import Warning from '../../../assets/images/warning.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface DuplicateByYouResolveBulkErrorProps {
  isOpen: boolean;
  onClose: () => void;
  trackId: string | null;
}

const DuplicateByOtherSingleError: React.FC<
  DuplicateByYouResolveBulkErrorProps
> = ({ isOpen, onClose, trackId }) => {
  const handleIgnoreResolution = async () => {
    try {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/ignore_single_resolution?errorId=${trackId}`;
      await axios.delete(apiUrl, { headers: { Authorization: token || '' }, withCredentials: true });
      toast.success('Error ignored successfully');
      window.location.reload();
      // Optionally refresh or update the list here.
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
    }
  };

  const fileSingleDisputeResolution = async () => {
    try {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      // Endpoint sample: api/v1/ignore_single_resolution?errorId=...
      const apiUrl = `${urlVar}/bulkUploadFileDispute?errorId=${trackId}&disputeType=single`;
      await axios.get(apiUrl, {
        headers: { Authorization: token || '' },
        withCredentials: true,
      });
      toast.success('Error ignored successfully');

      onClose();
      window.location.reload();
      // Optionally refresh or update the list here.
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
    }
  };

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
            Resolve Duplicate Uploads by another user
          </h2>
          <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
            We have identified this duplicate tracks that was already uploaded
            by another user. If you believe you own the rights to this track,
            you can file dispute. Otherwise, you may ignore the track and
            proceed with the other uploads.
          </p>
          <div className="flex space-x-4 mt-[56px]">
            <button
              onClick={() => handleIgnoreResolution()}
              className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]"
            >
              Ignore Track
            </button>
            <button
              className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] "
              onClick={() => fileSingleDisputeResolution()}
            >
              File Dispute
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DuplicateByOtherSingleError;
