import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import Attach from '../../../assets/images/attachimage.svg';
import InputField from '../../InputField';
import { useFormikContext } from 'formik';
import axios from 'axios';
// import { toast } from 'react-toastify';

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';



const MinimumRecordingInfo: React.FC = () => {
  const { setFieldValue } = useFormikContext();
  const [fileName, setFileName] = useState('Click to upload jpeg or png');
  const [isrcValidationMessage, setIsrcValidationMessage] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      setFieldValue('artWork', event.currentTarget.files[0]);
      setFileName(event.currentTarget.files[0].name);
    }
  };

  const verifyISRC = async (isrc: string) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/verifyTrackUploaded/${isrc}`;
     console.log(` ${token} + ${apiUrl}`);
    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };
    try {
      const response = await axios.get(apiUrl, config);
      // Assuming the API returns a JSON object with a boolean 'isValid' field
      if (response.data.isValid) {
        setIsrcValidationMessage('ISRC is valid.');
      } else {
        setIsrcValidationMessage('ISRC is not valid.');
      }
    } catch (error) {
      console.error('Error verifying ISRC:', error);
      setIsrcValidationMessage('Failed to verify ISRC.');
    }
  };

    const handleIsrcBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const isrc = e.target.value;
      if (isrc) {
        verifyISRC(isrc);
      }
    };

  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="mainArtist" className={applyLabelStyles}>
            Main Artist
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
            label="Featured Artist"
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
            Release Type
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
            Release Title
          </label>
          <Field type="text" name="releaseTitle" className={applyInputStyles} />
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
            Track Title
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
            Track Link
          </label>
          <Field type="text" name="trackLink" className={applyInputStyles} />
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
            UPC
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
            ISRC
          </label>
          <Field
            type="text"
            name="isrc"
            className={applyInputStyles}
            onBlur={handleIsrcBlur}
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
            Genre
          </label>
          <Field type="text" name="genre" className={applyInputStyles} />
          <ErrorMessage
            name="genre"
            component="div"
            className={applyErrorStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="artWork" className={applyLabelStyles}>
            Upload Digital Artwork
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
    </div>
  );
};

export default MinimumRecordingInfo;
