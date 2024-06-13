import React, { useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import * as Yup from 'yup';
import MinimumRecordingInfo from './MinimumRecordingInfo';
import AdditionalRecordingInfo from './AdditionalRecordingInfo';
import CopyrightOwnerClaim from './CopyrightOwnerClaim';
import ReleaseInformation from './ReleaseInformation';

interface FormData {
  mainArtist: string;
  featuredArtist: string[];
  releaseType: string;
  releaseTitle: string;
  trackTitle: string;
  trackLink: string;
  upc: string;
  isrc: string;
  genre: string;
  digitalArtwork: File | null;
}

const initialFormData: FormData = {
  mainArtist: '',
  featuredArtist: [],
  releaseType: '',
  releaseTitle: '',
  trackTitle: '',
  trackLink: '',
  upc: '',
  isrc: '',
  genre: '',
  digitalArtwork: null,
};

const validationSchema = Yup.object().shape({
  mainArtist: Yup.string().required('Required'),
  releaseType: Yup.string().required('Required'),
  releaseTitle: Yup.string().required('Required'),
  trackTitle: Yup.string().required('Required'),
  trackLink: Yup.string().url('Must be a valid URL').required('Required'),
  upc: Yup.string().required('Required'),
  isrc: Yup.string().required('Required'),
  genre: Yup.string().required('Required'),
  digitalArtwork: Yup.mixed().required('A file is required'),
});

const UploadTrackMultiForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>(
    'Minimum Recording Information'
  );

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';

  const renderSection = (formikProps: FormikProps<FormData>) => {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
      formikProps;

    const commonProps = {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      setFieldValue,
    };

    switch (currentSection) {
      case 'Minimum Recording Information':
        return <MinimumRecordingInfo {...commonProps} />;
      case 'Additional Recording Information':
        return <AdditionalRecordingInfo {...commonProps} />;
      case 'Copyright Owner Claim':
        return <CopyrightOwnerClaim {...commonProps} />;
      case 'Release Information':
        return <ReleaseInformation {...commonProps} />;
      default:
        return null;
    }
  };

  const previousSection = (currentSection: string) => {
    switch (currentSection) {
      case 'Additional Recording Information':
        return 'Minimum Recording Information';
      case 'Copyright Owner Claim':
        return 'Additional Recording Information';
      case 'Release Information':
        return 'Copyright Owner Claim';
      default:
        return currentSection;
    }
  };

  const nextSection = (currentSection: string) => {
    switch (currentSection) {
      case 'Minimum Recording Information':
        return 'Additional Recording Information';
      case 'Additional Recording Information':
        return 'Copyright Owner Claim';
      case 'Copyright Owner Claim':
        return 'Release Information';
      default:
        return currentSection;
    }
  };

  return (
    <div className="lg:mx-8">
      <div>
        <span className="flex gap-2">
          <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
            New Track Upload
          </h2>
          <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
            Track Details
          </p>
        </span>
        <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
          Upload your track for distribution and licensing.
        </p>
      </div>
      <nav className="mt-8">
        <ul className="flex gap-8">
          <li
            className={`${liClass} ${
              currentSection === 'Minimum Recording Information'
                ? activeLiClass
                : ''
            }`}
            onClick={() => setCurrentSection('Minimum Recording Information')}
          >
            Minimum Recording Information
          </li>
          <li
            className={`${liClass} ${
              currentSection === 'Additional Recording Information'
                ? activeLiClass
                : ''
            }`}
            onClick={() =>
              setCurrentSection('Additional Recording Information')
            }
          >
            Additional Recording Information
          </li>
          <li
            className={`${liClass} ${
              currentSection === 'Copyright Owner Claim' ? activeLiClass : ''
            }`}
            onClick={() => setCurrentSection('Copyright Owner Claim')}
          >
            Copyright Owner Claim
          </li>
          <li
            className={`${liClass} ${
              currentSection === 'Release Information' ? activeLiClass : ''
            }`}
            onClick={() => setCurrentSection('Release Information')}
          >
            Release Information
          </li>
        </ul>
      </nav>
      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {(formikProps) => (
          <Form>
            {renderSection(formikProps)}
            <div className="buttons flex justify-between mt-4">
              {currentSection !== 'Minimum Recording Information' && (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSection(previousSection(currentSection))
                  }
                  className="btn-secondary"
                >
                  Previous
                </button>
              )}
              {currentSection !== 'Release Information' && (
                <button
                  type="button"
                  onClick={() => setCurrentSection(nextSection(currentSection))}
                  className="btn-primary"
                >
                  Next
                </button>
              )}
              {currentSection === 'Release Information' && (
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadTrackMultiForm;
