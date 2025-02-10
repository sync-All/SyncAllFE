import { ErrorMessage, Field } from 'formik';
import { Content } from '../contexts/ContentContext';
import InputField from './InputField';

interface MinRecInfoProps {
  details?: Content;
}

const MinimumRecordingInfo: React.FC<MinRecInfoProps> = () => {
  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] ';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
  const applyErrorStyles = 'italic text-red-600';

  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="mainArtist" className={applyLabelStyles}>
            Main Artist
          </label>
          <Field type="text" name="mainArtist" className={applyInputStyles} />
          <ErrorMessage
            name="mainArtist"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Featured Artist"
            name="featuredArtist"
            placeholder=""
            className={applyInputStyles}
          />
          <ErrorMessage
            name="featuredArtist"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseType" className={applyLabelStyles}>
            Release Type
          </label>
          <Field name="releaseType" className={applyInputStyles} />
          <ErrorMessage
            name="releaseType"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseTitle" className={applyLabelStyles}>
            Release Title
          </label>
          <Field name="releaseTitle" className={applyInputStyles} />
          <ErrorMessage
            name="releaseTitle"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="trackTitle" className={applyLabelStyles}>
            Track Title
          </label>
          <Field type="text" name="trackTitle" className={applyInputStyles} />
          <ErrorMessage
            name="trackTitle"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="trackLink" className={applyLabelStyles}>
            Track Link/Spotify Link
          </label>
          <Field type="text" name="trackLink" className={applyInputStyles} />
          <ErrorMessage
            name="trackLink"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="upc" className={applyLabelStyles}>
            UPC
          </label>
          <Field type="number" name="upc" className={applyInputStyles} />
          <ErrorMessage
            name="upc"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="isrc" className={applyLabelStyles}>
            ISRC
          </label>
          <Field
            type="text"
            name="isrc"
            className={applyInputStyles}
            disabled
          />
          <ErrorMessage
            name="isrc"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="genre" className={applyLabelStyles}>
            Genre
          </label>
          <Field name="genre" className={applyInputStyles} />
          <ErrorMessage
            name="genre"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default MinimumRecordingInfo;
