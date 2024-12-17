import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MinimumRecordingInfo from './MinimumRecordingInfo';
import AdditionalRecordingInfo from './AdditionalRecordingInfo';
import CopyrightOwnerClaim from './CopyrightOwnerClaim';
import ReleaseInformation from './ReleaseInformation';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';
import Plus from '../../../assets/images/plus.svg';
import { Link } from 'react-router-dom';

interface FormData {
  mainArtist: string;
  featuredArtist: string[];
  releaseType: string;
  releaseTitle: string;
  trackTitle: string;
  trackLink: string;
  upc: number;
  isrc: string;
  genre: string;
  artWork: File | null;
  recordingVersion: string;
  featuredInstrument: string[];
  producers: string[];
  recordingDate: Date | null;
  countryOfRecording: string;
  writers: string[];
  composers: string[];
  publishers: string[];
  claimBasis: string;
  claimingUser: string;
  role: string;
  percentClaim: number;
  copyrightName: string;
  copyrightYear: number | null;
  releaseDate: Date | null;
  countryOfRelease: string;
  mood: string[];
  tag: string[];
  lyrics: string;
  audioLang: string;
  explicitCont: boolean;
  releaseLabel: string;
  releaseDesc: string;
}

interface ResponseData {
  message?: string;
}

const initialFormData: FormData = {
  mainArtist: '',
  featuredArtist: [],
  releaseType: '',
  releaseTitle: '',
  trackTitle: '',
  trackLink: '',
  upc: 0,
  isrc: '',
  genre: '',
  artWork: null,
  recordingVersion: '',
  featuredInstrument: [],
  producers: [],
  recordingDate: null,
  countryOfRecording: '',
  writers: [],
  composers: [],
  publishers: [],
  claimBasis: '',
  claimingUser: '',
  role: '',
  percentClaim: 0,
  copyrightName: '',
  copyrightYear: null,
  releaseDate: null,
  countryOfRelease: '',
  mood: [],
  tag: [],
  lyrics: '',
  audioLang: '',
  explicitCont: false,
  releaseLabel: '',
  releaseDesc: '',
};

const validationSchema = Yup.object().shape({
  mainArtist: Yup.string().required('Required'),
  featuredArtist: Yup.array().of(Yup.string()),
  releaseType: Yup.string().required('Required'),
  releaseTitle: Yup.string().required('Required'),
  trackTitle: Yup.string().required('Required'),
  trackLink: Yup.string().url('Must be a valid URL').required('Required'),
  upc: Yup.number().min(0).required('Required'),
  isrc: Yup.string().required('Required'),
  genre: Yup.string().required('Required'),
  artWork: Yup.mixed().nullable(),
  recordingVersion: Yup.string(),
  featuredInstrument: Yup.array().of(Yup.string()),
  producers: Yup.array().of(Yup.string()),
  recordingDate: Yup.date().nullable(),
  countryOfRecording: Yup.string(),
  writers: Yup.array().of(Yup.string()),
  composers: Yup.array().of(Yup.string()),
  publishers: Yup.array().of(Yup.string()),
  claimBasis: Yup.string(),
  claimingUser: Yup.string(),
  role: Yup.string(),
  percentClaim: Yup.number().min(0).max(100),
  copyrightName: Yup.string(),
  copyrightYear: Yup.number()
    .nullable()
    .notRequired()
    .positive()
    .integer()
    .test(
      'len',
      'Must be exactly 4 digits',
      (val) => (val ?? 0).toString().length === 4 || val === null
    ),
  releaseDate: Yup.date().nullable(),
  countryOfRelease: Yup.string(),
  mood: Yup.array().of(Yup.string()),
  tag: Yup.array().of(Yup.string()),
  lyrics: Yup.string(),
  audioLang: Yup.string(),
  explicitCont: Yup.boolean(),
  releaseLabel: Yup.string(),
  releaseDesc: Yup.string(),
});

const UploadTrackMultiForm: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>(
    'Minimum Recording Information'
  );

  const { loading, setLoading } = useLoading();
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="lg:mx-8 ml-5">
      <div className='flex justify-between'>
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
        <Link
          to="/dashboard/bulkupload"
          className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2 w-fit"
        >
          <img src={Plus} alt="Plus" />
          <p>Bulk Upload</p>
        </Link>
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
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { validateForm }) => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const urlVar = import.meta.env.VITE_APP_API_URL;
            const apiUrl = `${urlVar}/trackUpload/`;
            const config = {
              headers: {
                Authorization: `${token}`,
              },
            };

            const errors = await validateForm(values);

            if (Object.keys(errors).length) {
              // Iterate over the errors object and toast each error message
              Object.values(errors).forEach((error) => {
                if (typeof error === 'string') {
                  toast.error(error);
                }
              });
              return; // Prevent form submission if there are errors
            }
            try {
              await delay(2000);
              await axios.postForm(apiUrl, values, config);
              toast.success('Track Uploaded Successfully');
              refreshPage();
            } catch (error: unknown) {
              const axiosError = error as AxiosError<ResponseData>;

              toast.error(
                (axiosError.response && axiosError.response.data
                  ? axiosError.response.data.message || axiosError.response.data
                  : axiosError.message || 'An error occurred'
                ).toString()
              );
            } finally {
              setLoading(false);
            }
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
                <button type="submit" className={controlBtn} disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload Track'}
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
