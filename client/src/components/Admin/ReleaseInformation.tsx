import { Content } from '../../Context/ContentContext';

interface ReleaseInformationProps {
  details?: Content;
}

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';

const ReleaseInformation: React.FC<ReleaseInformationProps> = ({ details }) => {
  console.log(details);
  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="copyrightName" className={applyLabelStyles}>
            Copyright Name
          </label>
          <input
            name="copyrightName"
            disabled
            placeholder={details?.copyrightName}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="copyrightYear" className={applyLabelStyles}>
            Copyright Year
          </label>
          <input
            type="number"
            name="copyrightYear"
            disabled
            placeholder={details?.copyrightYear?.toString()}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseDate" className={applyLabelStyles}>
            Release Date
          </label>
          <input
        
            name="releaseDate"
            disabled
            placeholder={new Date(details?.releaseDate ?? '').toLocaleDateString()}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="countryOfRelease" className={applyLabelStyles}>
            Country Of Release
          </label>
          <input
            name="countryOfRelease"
            disabled
            placeholder={details?.countryOfRelease}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="mood" className={applyLabelStyles}>
            Mood
          </label>
          <input
            name="mood"
            disabled
            placeholder={
              Array.isArray(details?.mood) ? details?.mood.join(', ') : ''
            }
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="tag" className={applyLabelStyles}>
            Tags
          </label>
          <input
            name="tag"
            disabled
            placeholder={
              Array.isArray(details?.tag) ? details?.tag.join(', ') : ''
            }
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="lyrics" className={applyLabelStyles}>
            Lyrics
          </label>
          <input
            name="lyrics"
            disabled
            placeholder={details?.lyrics || 'add lyrics'}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="audioLang" className={applyLabelStyles}>
            Audio Language
          </label>
          <input
            name="audioLang"
            disabled
            placeholder={details?.audioLang}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="explicitCont" className={applyLabelStyles}>
            Explicit Content
          </label>
          <input
            name="explicitCont"
            disabled
            placeholder={details?.explicitCont}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseLabel" className={applyLabelStyles}>
            Release Label
          </label>
          <input
            type="text"
            name="releaseLabel"
            disabled
            placeholder={details?.releaseLabel}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseDesc" className={applyLabelStyles}>
            Release Description
          </label>
          <input
            type="text"
            name="releaseDesc"
            disabled
            placeholder={details?.releaseDesc}
            className={applyInputStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseInformation;
