import Modal from 'react-modal';

const resolveActions = [
  {
    label: 'Deny Dispute',
    className: 'bg-red-500 hover:bg-red-600 text-white',
  },
  {
    label: 'Escalate Case',
    className: 'bg-blue-500 hover:bg-blue-600 text-white',
  },
  {
    label: 'Transfer Ownership',
    className: 'bg-emerald-600 hover:bg-emerald-700 text-white',
  },
];

interface ResolveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

Modal.setAppElement('#root');

const DisputeResolve = ({ isOpen, onClose, onAction }: ResolveModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={false}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF8E7] rounded-[10px] p-6 max-w-[715px] w-full outline-none z-100"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-end">
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="text-center space-y-[17px] mb-8">
        <h2 className="text-black2 font-Utile-bold text-[40px] leading-[100%] tracking-[-1.6px]">
          Resolve Case
        </h2>
        <p className="text-black2 text-[24px] font-Utile-regular leading-[117%] tracking-[-0.96px]">
          Please choose a resolution action for this case. <br /> Select an
          option below to proceed.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-[121px] mb-[80px]">
        {resolveActions.map((action) => (
          <button
            key={action.label}
            onClick={() => onAction(action.label)}
            className={`px-4 py-2.5 rounded-lgd font-inter text-[14px] leading-5 ${action.className}`}
          >
            {action.label}
          </button>
        ))}
      </div>
    </Modal>
  );
};

export default DisputeResolve;
