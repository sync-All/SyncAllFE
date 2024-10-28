import { Content } from '../contexts/ContentContext';

interface AdditionalRecordingInfoProps {
  details?: Content;
  
}

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';

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
          <input
            type="text"
            name="recordingVersion"
            disabled
            placeholder={
              details?.recordingVersion
            }
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="featuredInstrument" className={applyLabelStyles}>
            Featured Instrument
          </label>
          <input
            className={applyInputStyles}
            name="featuredInstrument"
            disabled
            placeholder={
              details?.featuredInstrument?.join(', ')
            }
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="producers" className={applyLabelStyles}>
            Producer(s)
          </label>
          <input
            name="producers"
            disabled
            placeholder={
              details?.producers?.join(', ') 
            }
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="recordingDate" className={applyLabelStyles}>
            Recording Date
          </label>
          <input
            
            name="recordingDate"
            disabled
            placeholder={new Date(details?.recordingDate ?? '').toLocaleDateString()}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="countryOfRecording" className={applyLabelStyles}>
            Country of Recording
          </label>
          <input
            name="countryOfRecording"
            disabled
            placeholder={details?.countryOfRecording}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="writers" className={applyLabelStyles}>
            Writer(s)
          </label>
          <input
            name="writers"
            disabled
            placeholder={
              details?.writers?.join(', ')
            }
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="composers" className={applyLabelStyles}>
            Composer(s)
          </label>
          <input
            name="composers"
            disabled
            placeholder={
              details?.composers?.join(', ')
            }
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="publishers" className={applyLabelStyles}>
            Publisher(s)
          </label>
          <input
            name="publishers"
            disabled
            placeholder={
              details?.publishers?.join(', ')
            }
            className={applyInputStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalRecordingInfo;
