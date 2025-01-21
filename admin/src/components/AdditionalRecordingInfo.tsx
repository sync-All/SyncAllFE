import { ErrorMessage, Field } from 'formik';
import { Content } from '../contexts/ContentContext';
import InputField from './InputField';

interface AdditionalRecordingInfoProps {
  details?: Content;
  
}

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';

const AdditionalRecordingInfo: React.FC<AdditionalRecordingInfoProps> = ({
  details,
}) => {
  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="recordingVersion" className={applyLabelStyles}>
            Recording Version
          </label>
          <Field
            type="text"
            name="recordingVersion"
            placeholder={details?.recordingVersion}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="recordingVersion"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            className={applyInputStyles}
            label="Featured Instrument"
            name="featuredInstrument"
            placeholder={details?.featuredInstrument?.join(', ') || ''}
          />
          <ErrorMessage
            name="featuredInstrument"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="producers(s)"
            name="producers"
            placeholder={details?.producers?.join(', ') || ''}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="recordingDate" className={applyLabelStyles}>
            Recording Date
          </label>
          <Field
            name="recordingDate"
            placeholder={new Date(
              details?.recordingDate ?? ''
            ).toLocaleDateString()}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="recordingDate"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="countryOfRecording" className={applyLabelStyles}>
            Country of Recording
          </label>
          <Field
            name="countryOfRecording"
            placeholder={details?.countryOfRecording}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="countryOfRecording"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="writers(s)"
            name="writers"
            placeholder={details?.writers?.join(', ') || ''}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="writers"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="composers(s)"
            name="composers"
            placeholder={details?.composers?.join(', ') || ''}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="composers"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="publishers(s)"
            name="publishers"
            placeholder={details?.publishers?.join(', ') || ''}
            className={applyInputStyles}
          />
          <ErrorMessage
            name="publishers"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalRecordingInfo;
