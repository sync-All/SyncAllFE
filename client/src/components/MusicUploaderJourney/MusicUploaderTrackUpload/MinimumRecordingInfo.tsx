import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import Attach from '../../../assets/images/attachimage.svg';
import InputField from '../../InputField';
import { useFormikContext } from 'formik';
import axios, { AxiosError } from 'axios';
import IsrcError from './IsrcError';
import { genres } from '../../../constants/genre'; // import { toast } from 'react-toastify';

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';

const MinimumRecordingInfo: React.FC = () => {
  const { setFieldValue } = useFormikContext();
  const [fileName, setFileName] = useState('Click to upload jpeg or png');
  const [isIsrcErrorModalOpen, setIsIsrcErrorModalOpen] = useState(false);

  const [isrcValidationMessage, setIsrcValidationMessage] = useState('');
  const closeIsrcErrorModal = () => setIsIsrcErrorModalOpen(false);

  const handleDispute = () => {
    // Implement your dispute logic here
    closeIsrcErrorModal();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFieldValue('artWork', event.currentTarget.files[0]);
      setFileName(event.currentTarget.files[0].name);
    }
  };

  interface ResponseData {
    message?: string;
  }

  const verifyTrackLink = async (trackLink: string) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/verifyTrackUploaded/?trackLink="${trackLink}"`;
    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };
    try {
      const res = await axios.get(apiUrl, config);
      setFieldValue('isrc', res.data.isrc);
      setFieldValue('releaseDate', res.data.release_date);
      setFieldValue('explicitCont', res.data.explicit_content);
      setIsrcValidationMessage('');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      const errorMessage = (
        axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
      ).toString();
      setIsrcValidationMessage(errorMessage);
      setFieldValue('isrc', '');
      setFieldValue('releaseDate', '');
      setFieldValue('explicitCont', '');
    }
  };

  const handleTrackLink = (e: React.FocusEvent<HTMLInputElement>) => {
    const trackLink = e.target.value;
    if (trackLink) {
      verifyTrackLink(trackLink);
    }
  };

  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="mainArtist" className={applyLabelStyles}>
            Main Artist*
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
            label="Featured Artist*"
            name="featuredArtist"
            placeholder=""
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
            Release Type*
          </label>
          <Field as="select" name="releaseType" className={applyInputStyles}>
            <option value="">Select...</option>
            <option value="Album">Album</option>
            <option value="Single">Single</option>
            <option value="EP">EP</option>
          </Field>
          <ErrorMessage
            name="releaseType"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="releaseTitle" className={applyLabelStyles}>
            Release Title*
          </label>
          <Field as="select" name="releaseTitle" className={applyInputStyles}>
            <option value="">Select...</option>
            <option value="Album">Album title</option>
            <option value="Single">Single title</option>
            <option value="EP">EP ttle</option>
          </Field>
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
            Track Title*
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
            Track Link*
          </label>
          <Field
            type="text"
            name="trackLink"
            className={applyInputStyles}
            onBlur={handleTrackLink}
          />
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
            UPC*
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
            ISRC*
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
          {isrcValidationMessage && (
            <div className={applyErrorStyles}>{isrcValidationMessage}</div>
          )}
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="genre" className={applyLabelStyles}>
            Genre*
          </label>
          <Field as="select" name="genre" className={applyInputStyles}>
            <option value="">Select genre</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="genre"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="artWork" className={applyLabelStyles}>
            Upload Digital Artwork*
          </label>
          <div className="relative">
            <label
              htmlFor="artWork"
              className="cursor-pointer shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 text-[#98A2B3] leading-4 focus:outline-none focus:shadow-outline font-inter flex justify-between items-center"
            >
              <span>{fileName}</span>
              <img src={Attach} alt="Upload Icon" />
              <input
                type="file"
                id="artWork"
                name="artWork"
                className="hidden"
                accept=".jpeg, .jpg, .png"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <ErrorMessage
            name="artWork"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
      <IsrcError
        isOpen={isIsrcErrorModalOpen}
        onClose={closeIsrcErrorModal}
        onDispute={handleDispute}
      />
    </div>
  );
};

export default MinimumRecordingInfo;
