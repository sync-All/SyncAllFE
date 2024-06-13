import React from 'react';
import { Field } from 'formik';
import InputField from '../../InputField';



const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex items-center mb-4 gap-8';

const AdditionalRecordingInfo: React.FC = () => {
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
            placeholder="E.g “live”, “dance remix”, etc"
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Featured Instrument"
            name="featuredInstrument"
            placeholder="e.g saxophone, lead guitar"
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Producer(s)"
            name="producer"
            placeholder="add all producers involved"
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="recordingDate" className={applyLabelStyles}>
            Recording Date
          </label>
          <Field
            type="date"
            name="recordingDate"
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="countryOfRecording" className={applyLabelStyles}>
            Country of Recording
          </label>
          <Field
            type="text"
            name="countryOfRecording"
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Writer(s)"
            name="writer"
            placeholder="add all producer(s) involved"
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Composer(s)"
            name="composer"
            placeholder="add all composer(s) involved"
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Publisher(s)"
            name="publisher"
            placeholder="add all publisher(s) involved"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalRecordingInfo;
