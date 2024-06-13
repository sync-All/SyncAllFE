import React from 'react';
import { Field, ErrorMessage, FormikProps } from 'formik';
import Attach from '../../../assets/images/attachimage.svg';
import InputField from '../../InputField';

interface MinimumRecordingInfoProps extends FormikProps<FormData> {}

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyFormDiv = 'flex items-center mb-4 gap-8';
const applyErrorStyles = 'italic text-red-600';

const MinimumRecordingInfo: React.FC<MinimumRecordingInfoProps> = ({
  setFieldValue,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    setFieldValue('digitalArtwork', file);
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
          <Field type="text" name="upc" className={applyInputStyles} />
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
          <Field type="text" name="isrc" className={applyInputStyles} />
          <ErrorMessage
            name="isrc"
            component="div"
            className={applyErrorStyles}
          />
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
          <label htmlFor="digitalArtwork" className={applyLabelStyles}>
            Upload Digital Artwork
          </label>
          <div className="relative">
            <label
              htmlFor="digitalArtwork"
              className="cursor-pointer shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 text-[#98A2B3] leading-4 focus:outline-none focus:shadow-outline font-inter flex justify-between items-center"
            >
              <span>Click to upload jpeg or png</span>
              <img src={Attach} alt="Upload Icon" />
              <input
                type="file"
                id="digitalArtwork"
                name="digitalArtwork"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <ErrorMessage
            name="digitalArtwork"
            component="div"
            className={applyErrorStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default MinimumRecordingInfo;
