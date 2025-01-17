import { Content } from '../contexts/ContentContext';

interface MinRecInfoProps {
  details?: Content;
}

const MinimumRecordingInfo: React.FC<MinRecInfoProps> = ({ details }) => {
  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] ';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';

  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="mainArtist" className={applyLabelStyles}>
            Main Artist
          </label>
          <input
            type="text"
            name="mainArtist"
            
            placeholder={details?.mainArtist}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="featuredArtist" className={applyLabelStyles}>
            Featured Artist{' '}
          </label>
          <input
            name="featuredArtist"
            
            placeholder={Array.isArray(details?.featuredArtist)? details.featuredArtist.join(', ') : ''}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseType" className={applyLabelStyles}>
            Release Type
          </label>
          <input
            name="releaseType"
            
            placeholder={details?.releaseType}
            className={applyInputStyles}
          ></input>
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseTitle" className={applyLabelStyles}>
            Release Title
          </label>
          <input
            name="releaseTitle"
            
            placeholder={details?.releaseTitle}
            className={applyInputStyles}
          ></input>
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="trackTitle" className={applyLabelStyles}>
            Track Title
          </label>
          <input
            type="text"
            name="trackTitle"
            
            placeholder={details?.trackTitle}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="trackLink" className={applyLabelStyles}>
            Track Link
          </label>
          <input
            type="text"
            name="trackLink"
            
            placeholder={details?.trackLink}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="upc" className={applyLabelStyles}>
            UPC
          </label>
          <input
            type="number"
            name="upc"
            disabled
            placeholder={details?.upc}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="isrc" className={applyLabelStyles}>
            ISRC
          </label>
          <input
            type="text"
            name="isrc"
            placeholder={details?.isrc}
            className={applyInputStyles}
            disabled
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="genre" className={applyLabelStyles}>
            Genre
          </label>
          <input
            name="genre"
            
            placeholder={details?.genre}
            className={applyInputStyles}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default MinimumRecordingInfo;
