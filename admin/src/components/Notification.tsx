import NoNotification from '../assets/images/no_dispute.svg';
import ReactModal from 'react-modal';

interface NotificationProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  isOpen,
  onRequestClose,
}) => {
  ReactModal.setAppElement('#root');

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          maxWidth: '515px',

          marginTop: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 'auto',
          height: 'fit-content',
          borderRadius: '24px',
          backgroundColor: '#FFF',
          zIndex: 300,
        },
        overlay: {
          zIndex: 300,
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      }}
    >
      <div className=" h-[594px] py-[12px]  bg-white z-10">
        <div className="flex items-center justify-between">
          <h2 className="font-formular-bold text-[24px] leading-8 tracking-[-0.5px] text-[#202020]">
            Notifications
          </h2>
          <span
            onClick={onRequestClose}
            className="text-xl font-formular-bold cursor-pointer "
          >
            X
          </span>
        </div>

        <hr />
        <div className="flex items-center gap-1 py-[14px]">
          <p className="font-formular-regular text-[16px] leading-7 tracking-[-0.5px] text-[#202020]">
            All
          </p>
          <span className="bg-[#013131] rounded-[24px] h-[28px] w-[40px] flex items-center justify-center text-white ">
            <p>0</p>
          </span>
        </div>

        <hr className="" />
        <div className="mt-[87px]">
          <img src={NoNotification} alt="" className="mx-auto my-auto" />
        </div>
      </div>
    </ReactModal>
  );
};

export default Notification;
