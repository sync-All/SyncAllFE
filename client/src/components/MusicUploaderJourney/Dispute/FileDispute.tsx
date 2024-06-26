import Attach from '../../../assets/images/attachimage.svg';

const FileDispute = () => {
  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';

  return (
    <div className="mt-[60px]">
      <div className={applyFormDiv}>
        <div className={input}>
          <label htmlFor="trackName" className={applyLabelStyles}>
            Name of Track
          </label>
          <input type="text" name="trackName" className={applyInputStyles} />
        </div>
        <div className={input}>
          <label htmlFor="issueType" className={applyLabelStyles}>
            Issue Type
          </label>
          <select className={applyInputStyles}>
            <option value="">Select</option>
            <option value="licensing">Licensing</option>
          </select>
        </div>
      </div>

      <div className={applyFormDiv}>
        <div className={input}>
          <label htmlFor="desc">Your Bio</label>
          <textarea
            className={`${applyInputStyles} h-[147px]`}
            placeholder="Describe yourself a little"
            name="desc"
          ></textarea>
        </div>
        <div className={`${input} relative `}>
          <label className={applyLabelStyles}>
            Upload Supporting Documents{' '}
          </label>
          <label
            htmlFor="documentIssue"
            className={`${applyInputStyles} h-[147px] border-dashed border-spacing-10 border-[2px] flex flex-col items-center px-7 py-6`}
          >
            <span>
              <img src={Attach} alt="" className="" />
            </span>

            <p className="text-yellow font-inter text-[16px] font-medium mt-5">
              Click to upload{' '}
              <span className="text-[#292D32]">or drag & drop it here</span>
            </p>
            <p className="font-Utile-regular text-[16px] leading-normal text-[#A9ACB4] mt-3">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </label>
          <input
            type="file"
            id="documentIssue"
            accept="image/svg+xml, image/png, image/jpeg, image/gif"
            className={` opacity-0 w-0.1 h-0.1 absolute z-[-1]`}
          />
        </div>
      </div>
    </div>
  );
};

export default FileDispute;
