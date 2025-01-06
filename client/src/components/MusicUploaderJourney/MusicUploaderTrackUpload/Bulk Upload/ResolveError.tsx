// ErrorTabs.tsx
interface ErrorTabsProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  duplicateCount: number;
  otherDuplicateCount: number;
  invalidSpotifyCount: number;
}

interface ResolveErrorProps {
  data: {
    duplicates: TrackData[];
    invalidSpotifyLink: TrackData[];
  };
  source: 'upload' | 'error_list';
}

const ErrorTabs: React.FC<ErrorTabsProps> = ({
  activeTab,
  onTabChange,
  duplicateCount,
  otherDuplicateCount,
  invalidSpotifyCount,
}) => {
  const tabs = [
    {
      label: `Duplicate Uploads by You (${duplicateCount})`,
      value: 'duplicateByYou',
    },
    {
      label: `Duplicate Uploads by Another User (${otherDuplicateCount})`,
      value: 'duplicateByOther',
    },
    {
      label: `Invalid Spotify Link (${invalidSpotifyCount})`,
      value: 'invalidSpotify',
    },
  ];

  return (
    <div className="border-b border-b-[#D7DCE0]">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`px-4 py-2 relative ${
            activeTab === tab.value ? 'text-[black]' : 'text-[#475367]'
          }`}
        >
          {tab.label}
          {activeTab === tab.value && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
          )}
        </button>
      ))}
    </div>
  );
};

// ResolveError.tsx
import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DuplicateByYouTab from './DuplicateByYouTab';
import DuplicateByOtherTab from './DuplicateByOtherTab';
import InvalidSpotifyTab from './InvalidSpotifyTab';
import ProceedBulkError from './ProceedBulkError';
import DuplicateByYouResolveBulkError from './DuplicateByYouResolveBulkError';
import DuplicateByOthersResolveBulkError from './DuplicateByOthersResolveBulkError';
import { TrackData, useUpload } from '../../../../Context/UploadContext';

const ResolveError: React.FC<ResolveErrorProps> = ({ data, source }) => {
  const [activeTab, setActiveTab] = useState('duplicateByYou');
  const [showProceedModal, setShowProceedModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const navigate = useNavigate();
  const { uploadStats } = useUpload();

  const handleProceed = () => {
    setShowProceedModal(true);
  };

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600">No error data available</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 px-4 py-2 bg-[#0B1B2B] text-white rounded-lg"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  console.log(data);
  console.log(data);

  const getTitle = () => {
    return source === 'upload' ? 'Bulk Track Upload' : 'Resolve Upload Errors';
  };

  const duplicatesByYou = data.duplicates.filter(
    (track) => track.user === track.trackOwner
  );

  const duplicatesByOthers = data.duplicates.filter(
    (track) => track.user !== track.trackOwner
  );

  const invalidSpotifyLink = data.invalidSpotifyLink || [];

  console.log(invalidSpotifyLink);

  // Update counts
  const duplicatesCount = duplicatesByYou.length;
  const duplicatesOtherCount = duplicatesByOthers.length;
  const invalidLinksCount = uploadStats?.errors.invalidSpotifyLink.length || invalidSpotifyLink.length;

  console.log(invalidLinksCount);

  const errorCount = duplicatesCount + duplicatesOtherCount + invalidLinksCount;

  const renderContent = () => {
    switch (activeTab) {
      case 'duplicateByYou':
        return <DuplicateByYouTab tracks={duplicatesByYou} />;
      case 'duplicateByOther':
        return <DuplicateByOtherTab tracks={duplicatesByOthers} />;
      case 'invalidSpotify':
        return <InvalidSpotifyTab tracks={invalidSpotifyLink} />;
      default:
        return null;
    }
  };

  const renderModal = () => {
    switch (activeTab) {
      case 'duplicateByYou':
        return (
          <DuplicateByYouResolveBulkError
            isOpen={showResolveModal}
            onClose={() => setShowResolveModal(false)}
            errorCount={duplicatesCount}
          />
        );
      case 'duplicateByOther':
        return (
          <DuplicateByOthersResolveBulkError
            isOpen={showResolveModal}
            onClose={() => setShowResolveModal(false)}
            errorCount={duplicatesOtherCount}
          />
        );
    }
  };

  return (
    <div className="lg:mx-8 ml-5">
      <div className="flex justify-between items-center">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              {getTitle()}
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
              Track Details
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Upload multiple tracks at once to save time
          </p>
        </div>
        <div className="flex gap-2 items-end">
          {activeTab !== 'invalidSpotify' && (
            <button
              onClick={() => setShowResolveModal(true)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Resolve All
            </button>
          )}
          {renderModal()}
          <button
            onClick={handleProceed}
            className="px-4 py-2.5 bg-[#0B1B2B] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Proceed
          </button>
        </div>
      </div>

      <div className="mt-8">
        <ErrorTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          duplicateCount={duplicatesCount}
          otherDuplicateCount={duplicatesOtherCount}
          invalidSpotifyCount={invalidLinksCount}
        />
        {renderContent()}
      </div>
      {showProceedModal && (
        <ProceedBulkError
          isOpen={showProceedModal}
          onClose={() => setShowProceedModal(false)}
          errorCount={errorCount}
          source="resolve"
        />
      )}
    </div>
  );
};

const ResolveErrorWrapper: React.FC = () => {
  const { uploadStats } = useUpload();
  const location = useLocation();
  const errorData = location.state?.errorData;

  console.log(errorData);
  // If coming from error list
  if (errorData) {
    return <ResolveError data={errorData} source="error_list" />;
  }

  // If coming from bulk upload
  if (uploadStats?.errors) {
    return <ResolveError data={uploadStats.errors} source="upload" />;
  }

  // If no data available
  return <Navigate to="/dashboard" replace />;
};

export default ResolveErrorWrapper;
