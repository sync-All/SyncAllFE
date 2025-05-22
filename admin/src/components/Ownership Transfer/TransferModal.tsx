import { useState } from 'react';
import ReactModal from 'react-modal';
import { useUsers } from '../../contexts/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedContents: { contentId: string; user: string }[];
}

const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  selectedContents,
}) => {
  const [selectedToUser, setSelectedToUser] = useState('');
  const { users } = useUsers();

  const handleTransfer = async () => {
    const trackIds = selectedContents.map((content) => content.contentId);
    const newTrackOwnerId = selectedToUser;

    if (!newTrackOwnerId || trackIds.length === 0) {
      toast.error('Please select a user and at least one track to transfer.');
      return;
    }

    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/manage_content/transferownership`;

    try {
      const response = await axios.post(
        apiUrl,
        { trackIds, newTrackOwnerId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success('Ownership transferred successfully!');
        onClose();
      } else {
        toast.error('Failed to transfer ownership. Please try again.');
      }
    } catch (error) {
      console.error('Error transferring ownership:', error);
      toast.error('An error occurred while transferring ownership.');
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      className="bg-white p-8 rounded-lg w-full max-w-md mx-auto mt-[10%] shadow-md outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start z-50"
    >
      <div className="text-center">
        <h2 className="text-[#101828] text-[24px] font-formular-bold leading-[32px] mb-1">
          Transfer Ownership
        </h2>
        <p className="text-[#667085] text-[14px] font-formular-normal leading-5 mb-6">
          Pass the mic, transfer track’s ownership in just a few clicks.
        </p>

        <div className="mb-5 text-left">
          <label className="text-[14px] text-[#344054] font-formular-medium block mb-2">
            From
          </label>
          <div className="flex flex-wrap gap-2 border border-gray-300 rounded-md px-3 py-2 bg-white max-h-32 overflow-y-auto">
            {selectedContents.map(({ user, contentId }) => (
              <span
                key={contentId}
                className="bg-[#FEF0C7] text-[#B54708] text-[14px] px-2 py-1 rounded-md font-formular-normal"
              >
                {user}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 text-left">
          <label className="text-[14px] text-[#344054] font-formular-medium block mb-2">
            To
          </label>
          <select
            value={selectedToUser}
            onChange={(e) => setSelectedToUser(e.target.value)}
            className="w-full border border-gray-300 text-[#667085] font-Utile-medium text-[16px] py-2 px-3 rounded-md bg-white focus:outline-none"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} (<strong>{user.email}</strong>) 
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="border border-[#101828] text-[#101828] font-formular-medium text-[14px] px-6 py-2 rounded-lg"
          >
            Back
          </button>
          <button
            onClick={handleTransfer}
            disabled={!selectedToUser || selectedContents.length === 0}
            className="bg-[#101828] text-[#F9F6FF] font-formular-medium text-[14px] px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Transfer Ownership
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default TransferModal;
