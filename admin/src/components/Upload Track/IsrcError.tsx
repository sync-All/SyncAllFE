import Modal from 'react-modal';
import Warning from '../../assets/images/warning.svg';

interface IsrcErrorProps {
  isOpen: boolean;
  onClose: () => void;
  onDispute: () => void;
}

const IsrcError: React.FC<IsrcErrorProps> = ({
  isOpen,
  onClose,
  onDispute,
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
            <img src={Warning} alt="" />
          </span>{' '}
          <h2 className="text-[56px] text-[#013131] font-Utile-bold  leading-[56px] tracking-[-2.24px] mt-[28px]">
            Oops! Track Already Uploaded
          </h2>
          <p className="text-[24px] leading-[28px] font-Utile-regular  text-[#013131] tracking-[-0.96px] mt-[23px]">
            It looks like this track has already been uploaded to SyncAll. If
            you believe this is a mistake or if you have the rights to this
            track, you can file a dispute.
          </p>
          <div className="flex space-x-4 mt-[56px]">
            <button
              onClick={onClose}
              className="text-[#013131] rounded-[8px] border border-[#013131] py-2.5 px-4 w-[176px]"
            >
              Cancel
            </button>
            <button
              onClick={onDispute}
              className="bg-yellow text-[#013131] rounded-[8px] py-2.5 px-4 hover:bg-yellow-600 w-[176px] "
            >
              File a Dispute
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default IsrcError;
