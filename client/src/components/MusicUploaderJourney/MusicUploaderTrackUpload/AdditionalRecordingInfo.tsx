import React from 'react';
import { Field, ErrorMessage } from 'formik';
import InputField from '../../InputField';
import { COUNTRIES } from '../../../constants/countries';

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';

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
          <ErrorMessage
            name="recordingVersion"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField
            label="Featured Instrument"
            name="featuredInstrument"
            placeholder="e.g saxophone, lead guitar"
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
            placeholder="add all producers involved"
          />
          <ErrorMessage
            name="producers"
            component="div"
            className={applyErrorStyles}
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
            as="select"
            name="countryOfRecording"
            className={applyInputStyles}
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Field>
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
            placeholder="add all producers(s) involved"
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
            placeholder="add all composers(s) involved"
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
            placeholder="add all publishers(s) involved"
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
