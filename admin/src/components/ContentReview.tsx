import { useState } from 'react';
import Background from '../assets/images/user-homepage-head.png';
import ReleaseInformation from './ReleaseInformation';
import CopyrightOwnerClaim from './CopyrightOwnerClaim';
import AdditionalRecordingInfo from './AdditionalRecordingInfo';
import MinimumRecordingInfo from './MinimumRecordingInfo';
import { useContent } from '../contexts/ContentContext';
import LoadingAnimation from '../constants/loading-animation';
import { useParams } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { Content } from '../contexts/ContentContext';

const ContentReview = () => {
  const { content, loading } = useContent();
  const { id } = useParams();
  const [currentSection, setCurrentSection] = useState<string>(
    'Minimum Recording Information'
  );

  const getContentById = (id: string): Content | undefined => {
    return content.find((item) => item._id === id);
  };

  const contentItem = getContentById(id || '');

  if (loading) {
    return <LoadingAnimation />;
  }

  const liClass =
    'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4 cursor-pointer transition-all ease-in-out duration-300';
  const activeLiClass = 'border-b border-[#013131] text-[#013131]';
  const controlBtn =
    'btn bg-[#EFA705] py-3 px-4 border border-[#EFA705] rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2';

  const renderSection = () => {
    switch (currentSection) {
      case 'Minimum Recording Information':
        return <MinimumRecordingInfo details={contentItem} />;
      case 'Additional Recording Information':
        return <AdditionalRecordingInfo details={contentItem} />;
      case 'Copyright Owner Claim':
        return <CopyrightOwnerClaim details={contentItem} />;
      case 'Release Information':
        return <ReleaseInformation details={contentItem} />;
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
    <div className="mx-[31px]">
      <div className="flex justify-between">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              Track Upload Review
            </h2>
          </span>
        </div>
        <div className="flex gap-2 place-items-end">
          <button
            className="bg-transparent p-[10px] gap-[8px] rounded-[8px] flex border border-[#D0D5DD] text-[14px]"
            type="button"
          >
            Reject Post
          </button>

          <button
            className="bg-[#EFA705] p-[10px] gap-[8px] rounded-[8px] flex text-[14px]"
            type="button"
          >
            Approve Post
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-[50px] mt-12">
        {' '}
        <div className="lg:min-w-[40%] h-[412px]">
          <img
            src={contentItem?.artWork || Background}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col mt-11 lg:mt-0 lg:w-[60%]">
          <div className="flex justify-between flex-col  md:flex-row">
            <div className="flex flex-col gap-2 lg:gap-4 w-full">
              <p className="text-[#475367] text-[32px] lg:text-[56px] font-formular-bold ">
                {contentItem?.trackTitle || 'No Title Available'}
              </p>
              <p className="text-[#667185] text-[16px] lg:text-[24px] font-Utile-regular  ">
                {contentItem?.mainArtist}
              </p>
            </div>
          </div>
          <div className="mt-20">
            <MusicPlayer
              trackLink={contentItem?.trackLink}
              songId={contentItem?._id}
            />
          </div>
        </div>
      </div>

      <div className="w-fit">
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
        {renderSection()}
        <div className="buttons flex justify-between my-4 pr-2 ">
          {currentSection !== 'Minimum Recording Information' && (
            <div
              onClick={() => setCurrentSection(previousSection(currentSection))}
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
        </div>
      </div>
    </div>
  );
};

export default ContentReview;
