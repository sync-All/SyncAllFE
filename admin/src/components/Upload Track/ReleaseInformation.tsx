import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { COUNTRIES } from '../../constants/countries';
import { LANGUAGES } from '../../constants/languages';
import InputField from '../InputField';


const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';

const ReleaseInformation: React.FC = () => {
  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="copyrightName" className={applyLabelStyles}>
            Copyright Name
          </label>
          <Field name="copyrightName" className={applyInputStyles} />

          <ErrorMessage
            name="copyrightName"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="copyrightYear" className={applyLabelStyles}>
            Copyright Year
          </label>
          <Field
            type="number"
            name="copyrightYear"
            className={applyInputStyles}
          />
          <ErrorMessage
            name="copyrightYear"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseDate" className={applyLabelStyles}>
            Release Date
          </label>
          <Field disabled name="releaseDate" className={applyInputStyles} />

          <ErrorMessage
            name="releaseDate"
            component="div"
            className={applyErrorStyles}
          />
        </div>

        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="countryOfRelease" className={applyLabelStyles}>
            Country Of Release
          </label>
          <Field
            as="select"
            name="countryOfRelease"
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
            name="countryOfRelease"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField label="Mood" name="mood" placeholder="" />
          <ErrorMessage
            name="mood"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <InputField label="Tags" name="tag" placeholder="" />
          <ErrorMessage
            name="tag"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="lyrics" className={applyLabelStyles}>
            Lyrics
          </label>
          <Field
            name="lyrics"
            className={applyInputStyles}
            placeholder="add lyrics"
          />
          <ErrorMessage
            name="lyrics"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="audioLang" className={applyLabelStyles}>
            Audio Language
          </label>
          <Field as="select" name="audioLang" className={applyInputStyles}>
            <option value="">Select a language</option>
            {LANGUAGES.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="audioLang"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="explicitCont" className={applyLabelStyles}>
            Explicit Content
          </label>
          <Field name="explicitCont" className={applyInputStyles} disabled />
       
          <ErrorMessage
            name="explicitCont"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseLabel" className={applyLabelStyles}>
            Release Label
          </label>
          <Field type="text" name="releaseLabel" className={applyInputStyles} />
          <ErrorMessage
            name="releaseLabel"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseDesc" className={applyLabelStyles}>
            Release Description
          </label>
          <Field type="text" name="releaseDesc" className={applyInputStyles} />
          <ErrorMessage
            name="releaseDesc"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default ReleaseInformation;
