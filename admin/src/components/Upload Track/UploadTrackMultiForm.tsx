import React, { useState, useMemo } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MinimumRecordingInfo from './MinimumRecordingInfo';
import AdditionalRecordingInfo from './AdditionalRecordingInfo';
import CopyrightOwnerClaim from './CopyrightOwnerClaim';
import ReleaseInformation from './ReleaseInformation';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import Plus from '../../assets/images/plus.svg';
import { Link, useLocation } from 'react-router-dom';
import useLoading from '../../constants/loading';

interface UploadFormValues {
  _id?: string;
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
  trackErrorId: string;
  err_type: string;
  // New fields:
  likes: string[]; // e.g. array of user IDs or similar
  spotifyArtistIds: string[]; // as provided in your data
  message?: string; // if needed
  earnings?: number; // if you want to include earnings
  createdAt?: string; // system-generated fields if needed
  updatedAt?: string;
  __v?: number;
}


const initialFormData: UploadFormValues = {
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
  trackErrorId: '',
  err_type: 'InvalidSpotifyLink',
  // New fields with defaults:
  likes: [],
  spotifyArtistIds: [],
  message: '',
  earnings: 0,
  createdAt: '', // usually these come from the backend so you may not prefill them
  updatedAt: '',
  __v: 0,
};


const uploadSchema = Yup.object({
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

const updateSchema = Yup.object({
  // Perhaps only trackLink is required for update
  trackLink: Yup.string()
    .url('Must be a valid URL')
    .required('Track link is required for update'),
  // Other fields can be optional because you’re just resolving the error
  mainArtist: Yup.string(),
  releaseType: Yup.string(),
  releaseTitle: Yup.string(),
  trackTitle: Yup.string(),
  upc: Yup.number().min(0),
  isrc: Yup.string(),
  genre: Yup.string(),
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
  // percentClaim: Yup.number(),
  copyrightName: Yup.string(),
  copyrightYear: Yup.number().nullable(),
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

const FORM_SECTIONS = [
  {
    id: 'minimum-info',
    title: 'Minimum Recording Information',
    Component: MinimumRecordingInfo,
  },
  {
    id: 'additional-info',
    title: 'Additional Recording Information',
    Component: AdditionalRecordingInfo,
  },
  {
    id: 'copyright',
    title: 'Copyright Owner Claim',
    Component: CopyrightOwnerClaim,
  },
  {
    id: 'release',
    title: 'Release Information',
    Component: ReleaseInformation,
  },
] as const;

// Helper functions
const formatDate = (date: Date | string | null): string | null => {
  if (!date) return null;
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj instanceof Date && !isNaN(dateObj.getTime())
    ? dateObj.toISOString()
    : null;
};

const buildFormData = (
  values: UploadFormValues,
  trackId?: string
): FormData => {
  const formData = new FormData();

  // Handle dates properly
  const recordingDate = formatDate(values.recordingDate);
  const releaseDate = formatDate(values.releaseDate);

  if (trackId) formData.append('_id', trackId);
  if (recordingDate) formData.append('recordingDate', recordingDate);
  if (releaseDate) formData.append('releaseDate', releaseDate);

  // Define array fields that you want to append individually
  const arrayFields = [
    'featuredArtist',
    'featuredInstrument',
    'producers',
    'writers',
    'composers',
    'publishers',
    'mood',
    'tag',
    'likes', // New field
    'spotifyArtistIds', // New field
  ];

  // Append array fields item by item
  arrayFields.forEach((field) => {
    const arr = values[field as keyof UploadFormValues] as any[];
    if (Array.isArray(arr)) {
      arr.forEach((item) => {
        formData.append(field, item);
      });
    }
  });

  // Append other fields (skipping arrayFields, dates, and _id)
  Object.entries(values).forEach(([key, value]) => {
    if (
      !arrayFields.includes(key) &&
      value !== null &&
      !['recordingDate', 'releaseDate', '_id'].includes(key)
    ) {
      formData.append(key, value.toString());
    }
  });

  return formData;
};




const UploadTrackMultiForm: React.FC = () => {
  const location = useLocation();
  const updateTrackData = location.state?.spotifyErrorTrack as
    | UploadFormValues
    | undefined;
  const isUpdate = Boolean(updateTrackData);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const { loading, setLoading } = useLoading();

  console.log(`id: ${updateTrackData?.trackErrorId}`);
  console.log(updateTrackData);

  const validationSchema = useMemo(
    () => (isUpdate ? updateSchema : uploadSchema),
    [isUpdate]
  );

  // Pre-fill form values if in update mode.
 const initialValues: UploadFormValues = useMemo(() => {
   if (isUpdate && updateTrackData) {
     return {
       ...initialFormData,
       ...updateTrackData,
     };
   }
   return initialFormData;
 }, [isUpdate, updateTrackData]);


  // Centralize form submission logic.
  const handleSubmit = async (values: UploadFormValues) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    try {
      const endpoint = isUpdate ? 'invalid_spotify_resolution' : 'trackUpload';
      const formData = buildFormData(values, updateTrackData?._id);

      await axios.postForm(`${baseUrl}/${endpoint}/`, formData, {
        headers: { Authorization: token || '' }, withCredentials: true
      });

      toast.success(
        isUpdate ? 'Track updated successfully' : 'Track uploaded successfully'
      );
      window.location.reload();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:mx-8 ml-5">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              {isUpdate ? 'Update Track' : 'New Track Upload'}
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] flex items-center bg-[#ECF7F7] rounded-2xl">
              Track Details
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            {isUpdate
              ? 'Update your track details.'
              : 'Upload your track for distribution and licensing.'}
          </p>
        </div>
        <Link
          to="/admin/bulkupload"
          className="border-none rounded-[8px] bg-yellow py-2.5 px-4 flex items-center gap-2 w-fit"
        >
          <img src={Plus} alt="Plus" />
          <p>Bulk Upload</p>
        </Link>
      </div>

      {/* Form */}
      <div className="w-fit">
        <nav className="mt-8">
          <ul className="flex gap-8">
            {FORM_SECTIONS.map((section, index) => (
              <li
                key={section.id}
                onClick={() => setCurrentSectionIndex(index)}
                className={`text-[#81909D] font-formular-regular text-[14px] font-medium leading-[16px] 
                  tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300
                  ${
                    index === currentSectionIndex
                      ? 'border-b border-[#013131] text-[#013131]'
                      : ''
                  }`}
              >
                {section.title}
              </li>
            ))}
          </ul>
        </nav>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form>
            {/* Render current section */}
            {React.createElement(FORM_SECTIONS[currentSectionIndex].Component)}

            {/* Navigation buttons */}
            <div className="buttons flex justify-between my-4 pr-2">
              {currentSectionIndex > 0 && (
                <button
                  type="button"
                  onClick={() => setCurrentSectionIndex((prev) => prev - 1)}
                  className="btn bg-[#EFA705] py-3 px-4 border border-[#EFA705] rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2"
                >
                  Previous
                </button>
              )}

              {currentSectionIndex < FORM_SECTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentSectionIndex((prev) => prev + 1)}
                  className="btn bg-[#EFA705] py-3 px-4 border border-[#EFA705] rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-[#EFA705] py-3 px-4 border border-[#EFA705] rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2"
                >
                  {loading
                    ? isUpdate
                      ? 'Updating...'
                      : 'Uploading...'
                    : isUpdate
                    ? 'Update Track'
                    : 'Upload Track'}
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
