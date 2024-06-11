import React, { useState, ChangeEvent, FormEvent } from 'react';

// Define the type for the form data
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

// Initial form data
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

interface FormProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MinimumRecordingInfo: React.FC<FormProps> = ({
  formData,
  handleChange,
}) => (
  <div>
    <h2>Minimum Recording Information</h2>
    <label>
      Main Artist:
      <input
        type="text"
        name="mainArtist"
        value={formData.mainArtist}
        onChange={handleChange}
      />
    </label>
    <label>
      Featured Artist:
      <input
        type="text"
        name="featuredArtist"
        value={formData.featuredArtist.join(',')}
        onChange={handleChange}
      />
      {/* Implement the ability to add multiple featured artists */}
    </label>
  </div>
);

const AdditionalRecordingInfo: React.FC<FormProps> = ({
  formData,
  handleChange,
}) => (
  <div>
    <h2>Additional Recording Information</h2>
    <label>
      Release Type:
      <select
        name="releaseType"
        value={formData.releaseType}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value="Album">Album</option>
        <option value="Single">Single</option>
        <option value="EP">EP</option>
      </select>
    </label>
    <label>
      Release Title:
      <input
        type="text"
        name="releaseTitle"
        value={formData.releaseTitle}
        onChange={handleChange}
      />
    </label>
    <label>
      Track Title:
      <input
        type="text"
        name="trackTitle"
        value={formData.trackTitle}
        onChange={handleChange}
      />
    </label>
    <label>
      Track Link:
      <input
        type="text"
        name="trackLink"
        value={formData.trackLink}
        onChange={handleChange}
      />
    </label>
  </div>
);

const CopyrightOwnerClaim: React.FC<FormProps> = ({
  formData,
  handleChange,
  handleFileChange,
}) => (
  <div>
    <h2>Copyright Owner Claim</h2>
    <label>
      UPC:
      <input
        type="text"
        name="upc"
        value={formData.upc}
        onChange={handleChange}
      />
    </label>
    <label>
      ISRC:
      <input
        type="text"
        name="isrc"
        value={formData.isrc}
        onChange={handleChange}
      />
    </label>
    <label>
      Genre:
      <input
        type="text"
        name="genre"
        value={formData.genre}
        onChange={handleChange}
      />
    </label>
    <label>
      Upload Digital Artwork:
      <input type="file" name="digitalArtwork" onChange={handleFileChange} />
    </label>
  </div>
);
const UploadTrackContent: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<string>(
    'Minimum Recording Information'
  );
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4';

  const activeLiClass =
    'nav-item active border-b border-[#013131] text-[#013131]';
  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      digitalArtwork: e.target.files ? e.target.files[0] : null,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'Minimum Recording Information':
        return (
          <MinimumRecordingInfo
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      case 'Additional Recording Information':
        return (
          <AdditionalRecordingInfo
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 'Copyright Owner Claim':
        return (
          <CopyrightOwnerClaim
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return null;
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
        <ul className="flex gap-8 ">
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
            className={`nav-item  ${liClass} ${
              currentSection === 'Additional Recording Information'
                ? 'active'
                : ''
            }`}
            onClick={() =>
              setCurrentSection('Additional Recording Information')
            }
          >
            Additional Recording Information
          </li>
          <li
            className={`nav-item ${liClass} ${
              currentSection === 'Copyright Owner Claim' ? 'active' : ''
            }`}
            onClick={() => setCurrentSection('Copyright Owner Claim')}
          >
            Copyright Owner Claim
          </li>
          {/* Add more nav items as needed */}
        </ul>
      </nav>
      <form onSubmit={handleSubmit}>
        {renderSection()}
        <div className="buttons">
          {currentSection !== 'Minimum Recording Information' && (
            <button
              type="button"
              onClick={() => setCurrentSection('Minimum Recording Information')}
            >
              Previous
            </button>
          )}
          {currentSection !== 'Copyright Owner Claim' && (
            <button
              type="button"
              onClick={() => setCurrentSection('Copyright Owner Claim')}
            >
              Next
            </button>
          )}
          {currentSection === 'Copyright Owner Claim' && (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadTrackContent;
