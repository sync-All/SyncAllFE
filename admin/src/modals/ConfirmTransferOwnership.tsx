
import Modal from 'react-modal'

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmTransferOwnership = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF8E7] rounded-[10px] p-6 max-w-[715px] w-full outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="text-center mt-[87px] mb-[73px]">
        <h2 className="text-black2 font-Utile-bold text-[40px] leading-[100%] tracking-[-1.6px] max-w-[389px] mx-auto">
          Confirm Transfer of Ownership
        </h2>
        <p className="text-black2 text-[24px] font-Utile-regular leading-[117%] tracking-[-0.96px] max-w-[437px] mx-auto mt-4">
          Are you sure you want to transfer ownership of Ile-Ife from Sagoyin to
          Gbasky? Confirming this action will notify both the customer and the
          affected artist.
        </p>
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-[#6C778B] border-[#D0D5DD] border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2.5 bg-emerald-600 text-white font-inter text-[14px] leading-5 rounded-lg hover:bg-emerald-700"
          >
            Transfer Ownership
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmTransferOwnership;
