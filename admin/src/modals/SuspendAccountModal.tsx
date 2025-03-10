import React, { useState } from 'react';
import Modal from 'react-modal';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

interface SuspendAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
}

const SuspendAccountModal: React.FC<SuspendAccountModalProps> = ({
  isOpen,
  onClose,
  recipient,
}) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  console.log(recipient);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError('Please provide a reason for suspension.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/suspenduser`;
      const payload = { userId: recipient, reason };

      const config = {
        headers: {
          Authorization: token || '',
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(apiUrl, payload, config);

      setSuccess(response.data || 'Account has been suspended');
      setReason('');
      toast.success('Account has been suspended');
      window.location.reload();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred'
      );
    } finally {
      setLoading(false);
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
      <div className="rounded-t-lg">
        <h2 className="text-[32px] font-inter font-semibold leading-[120%] tracking-[-0.32px] mt-[7px]">
          Suspend Account
        </h2>
        <p className="mt-6 text-base font-inter tracking-[-0.4px] text-[#3A434B]">
          Enter the reason for suspending this account
        </p>
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="bg-[#F4F5F6] w-full h-[232px] border border-[#D7DCE0] p-2"
          placeholder="Enter suspension reason..."
        ></textarea>

        <div className="flex justify-end mt-[36px]">
          <button
            type="submit"
            disabled={loading}
            className={`w-fit bg-[#DE1212] py-[9px] px-[28px] text-white text-[14px] rounded-[4px] font-inter font-medium tracking-[-0.14px] ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Suspending...' : 'Suspend'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SuspendAccountModal;
