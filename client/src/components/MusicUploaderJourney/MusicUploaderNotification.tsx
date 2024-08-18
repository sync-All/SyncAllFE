import NoNotification from '../../assets/images/no_dispute.svg';

const MusicUploaderNotification = () => {
  return (
    <div className="w-[808px] h-[594px] px-[28px] py-[12px] border border-black bg-white z-10">
      <h2 className="font-formular-bold text-[24px] leading-8 tracking-[-0.5px] text-[#202020]">
        Notifications
      </h2>
      <hr />
      <div className="flex items-center gap-1 py-[14px]">
        <p className="font-formular-regular text-[16px] leading-7 tracking-[-0.5px] text-[#202020]">
          All
        </p>
        <span className="bg-[#013131] rounded-[24px] h-[28px] w-[40px] flex items-center justify-center text-white ">
          <p >0</p>
          
        </span>
      </div>

      <hr className='' />
      <div className='mt-[87px]'>
        <img src={NoNotification} alt="" className='mx-auto my-auto'/>
      </div>
    </div>
  );
};

export default MusicUploaderNotification;
