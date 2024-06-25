import React, { useState } from 'react';
import { Formik, Form } from 'formik';
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
  recordingVersion: string;
  featuredInstrument: string[];
  producer: string[];
  recordingDate: Date;
  countryOfRecording: string;
  writer: string[];
  composer: string[];
  publisher: string[];
  basisOfClaim: string;
  claimingUser: string;
  role: string;
  percentageClaim: string;
  copyrightName: string;
  copyrightYear: number;
  releaseDate: Date;
  countryOfRelease: string;
  mood: string[];
  tag: string[];
  lyrics: string;
  audioLanguage: string;
  explicitContent: string;
  releaseLabel: string;
  releaseDescription: string;
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
  recordingVersion: '',
  featuredInstrument: [],
  producer: [],
  recordingDate: new Date(),
  countryOfRecording: '',
  writer: [],
  composer: [],
  publisher: [],
  basisOfClaim: '',
  claimingUser: '',
  role: '',
  percentageClaim: '',
  copyrightName: '',
  copyrightYear: 0,
  releaseDate: new Date(),
  countryOfRelease: '',
  mood: [],
  tag: [],
  lyrics: '',
  audioLanguage: '',
  explicitContent: '',
  releaseLabel: '',
  releaseDescription: '',
};

const validationSchema = Yup.object().shape({
  mainArtist: Yup.string().required('Required'),
  featuredArtist: Yup.array().of(Yup.string()),
  releaseType: Yup.string().required('Required'),
  releaseTitle: Yup.string().required('Required'),
  trackTitle: Yup.string().required('Required'),
  trackLink: Yup.string().url('Must be a valid URL').required('Required'),
  upc: Yup.string().required('Required'),
  isrc: Yup.string().required('Required'),
  genre: Yup.string().required('Required'),
  digitalArtwork: Yup.mixed().required('A file is required'),
  recordingVersion: Yup.string().required('Required'),
  featuredInstrument: Yup.array().of(Yup.string()).min(1, 'At least one featured instrument is required'),
  producer: Yup.array().of(Yup.string()).min(1, 'At least one producer is required'),
  recordingDate: Yup.date().required('Required'),
  countryOfRecording: Yup.string().required('Required'),
  writer: Yup.array().of(Yup.string()).min(1, 'At least one writer is required'),
  composer: Yup.array().of(Yup.string()).min(1, 'At least one composer is required'),
  publisher: Yup.array().of(Yup.string()).min(1, 'At least one publisher is required'),
  basisOfClaim: Yup.string().required('Required'),
  claimingUser: Yup.string().required('Required'),
  role: Yup.string().required('Required'),
  percentageClaim: Yup.number().min(0).max(100).required('Required'),
  copyrightName: Yup.string().required('Required'),
  copyrightYear: Yup.number().required('Required').positive().integer(),
  releaseDate: Yup.date().required('Required'),
  countryOfRelease: Yup.string().required('Required'),
  mood: Yup.array().of(Yup.string()).min(1, 'At least one mood is required'),
  tag: Yup.array().of(Yup.string()).min(1, 'At least one tag is required'),
  lyrics: Yup.string().required('Required'),
  audioLanguage: Yup.string().required('Required'),
  explicitContent: Yup.string().required('Required'),
  releaseLabel: Yup.string().required('Required'),
  releaseDescription: Yup.string().required('Required'),
});


const UploadTrackMultiForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>(
    'Minimum Recording Information'
  );

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';
  const controlBtn =
    'btn bg-[#EFA705] py-3 px-4 border border-[#EFA705] rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2';

  const renderSection = () => {
    switch (currentSection) {
      case 'Minimum Recording Information':
        return <MinimumRecordingInfo />;
      case 'Additional Recording Information':
        return <AdditionalRecordingInfo />;
      case 'Copyright Owner Claim':
        return <CopyrightOwnerClaim />;
      case 'Release Information':
        return <ReleaseInformation />;
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
    <div className="lg:mx-8 ml-5">
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
      <div className="w-fit">
        {' '}
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
          <Form>
            {renderSection()}
            <div className="buttons flex justify-between my-4 pr-2 ">
              {currentSection !== 'Minimum Recording Information' && (
                <div
                  onClick={() =>
                    setCurrentSection(previousSection(currentSection))
                  }
                  className={controlBtn}
                >
                  Previous
                </div>
              )}
              {currentSection !== 'Release Information' && (
                <div
                  onClick={() => setCurrentSection(nextSection(currentSection))}
                  className={controlBtn}
                >
                  Next
                </div>
              )}
              {currentSection === 'Release Information' && (
                <button type="submit" className={controlBtn}>
                  Submit
                </button>
              )}
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UploadTrackMultiForm;
