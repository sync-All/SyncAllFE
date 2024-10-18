import Avater from '../../assets/images/Avatar.png';

const QuoteDetails = () => {
  const title =
    'text-black2 text-[24px] font-formular-bold leading-[24px] tracking-[-0.96px] w-[154px]';
  const detail =
    'text-black2 text-[20px] font-Utile-regular leading-[22.4px] tracking-[-0.8px] max-w-[672px] ml-[28px]';
  return (
    <div className="mx-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-black2 text-[56px] font-formular-bold leading-[56px] tracking-[-2.24px] ">
            Quote Request{' '}
          </h1>
        </div>
        <div className="flex gap-4">
          <button
            className="bg-transparent p-[10px] gap-[8px] rounded-[8px] flex border border-[#D0D5DD] text-[14px] font-inter"
            type="button"
          >
            Close Request
          </button>
          <button
            className="bg-[#EFA705] p-[10px] gap-[8px] rounded-[8px] flex text-[14px] font-inter"
            type="button"
          >
            Send Agreement
          </button>
        </div>
      </div>
      <p className="font-inter text-[16px] text-[#667085] leading-5 mt-4 ">
        Here is the quote summary
      </p>
      <div className="flex flex-col gap-7 mt-[59px]">
        <span className="flex items-center">
          <p className={title}>User Name:</p>
          <p className={detail}>David Effiong</p>
        </span>
        <span className="flex items-center">
          <p className={title}>Quote Type:</p>
          <p className={detail}>Sampling & Interpolation</p>
        </span>
        <span className="flex items-center">
          <p className={title}>Status:</p>
          <p className={detail} style={{ color: '#F59E0B' }}>
            Pending
          </p>
        </span>
        <span className="flex items-center">
          <p className={title} style={{ alignSelf: 'start' }}>
            Description:
          </p>
          <p className={detail} style={{ color: '#637083' }}>
            The new album "Echoes of the Past" by Lena Rivers samples "Memories
            Fade" by Tears for Fears. Writers will share 30% for Lena & 20% each
            for co-writers. Released by Harmonic Waves Records and distributed
            by Global Sound Distribution in the U.S., the album is set for a
            December 15, 2024 release, both physically and digitally. The
            primary territory is North America, with a private listening link at
            spotify.com/private-listen. Additional notes mention a special remix
            as a bonus track.
          </p>
        </span>
      </div>
      <div className="w-[809px] mt-16">
        <h3>Comment</h3>
        <hr className='mt-7'/>
        <span className="flex justify-between py-[13px]">
          <span className="flex items-center gap-4">
            <img src={Avater} alt="" className="w-9 h-9" />{' '}
            <p className="poppins-regular text-[16px] leading-6 ">
              Add a new comment
            </p>
          </span>

          <button className="px-5 py-2.5 rounded-[4px] border text-[#21293C] leading-6">
            Comment
          </button>
        </span>
        <hr />
      </div>
    </div>
  );
};

export default QuoteDetails;
