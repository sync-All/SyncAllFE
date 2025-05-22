import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DuplicateByYouTab from './DuplicateByYouTab';
import DuplicateByOtherTab from './DuplicateByOtherTab';
import InvalidSpotifyTab from './InvalidSpotifyTab';
import ProceedBulkError from './ProceedBulkError';
import DuplicateByYouResolveBulkError from './DuplicateByYouResolveBulkError';
import DuplicateByOthersResolveBulkError from './DuplicateByOthersResolveBulkError';

import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import LoadingAnimation from '../../../constants/loading-animation';

export interface TrackData {
  _id: string;
  releaseType: string;
  releaseTitle: string;
  mainArtist: string;
  featuredArtist: string;
  trackTitle: string;
  upc: string;
  isrc: string;
  trackLink: string;
  genre: string;
  subGenre: string;
  claimBasis: string;
  role: string;
  percentClaim: string;
  recordingVersion: string;
  featuredInstrument: string;
  producers: string;
  recordingDate: string;
  countryOfRecording: string;
  writers: string;
  composers: string;
  publishers: string;
  copyrightName: string;
  copyrightYear: string;
  releaseDate: string;
  countryOfRelease: string;
  mood: string;
  tag: string;
  lyrics: string;
  audioLang: string;
  releaseLabel: string;
  releaseDesc: string;
  message?: string;
  err_type?: string;
  user: string;
  trackOwner: string;
  associatedErrors: TrackData[];
  bulkError_id?: string;
}

interface ResolveErrorProps {
  errorTracks: TrackData;
}

interface ErrorTabsProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
  duplicateCount: number;
  otherDuplicateCount: number;
  invalidSpotifyCount: number;
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

const ResolveError: React.FC<ResolveErrorProps> = ({ errorTracks }) => {
  const [activeTab, setActiveTab] = useState('duplicateByYou');
  const [showProceedModal, setShowProceedModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const navigate = useNavigate();

  const handleProceed = () => {
    setShowProceedModal(true);
  };

  if (!errorTracks) {
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

  // Fixed title string (remove undefined "source" variable)
  const title = 'Resolve Upload Errors';

  const duplicatesByYou = errorTracks.associatedErrors.filter(
    (error) => error.err_type === 'duplicateTrack'
  );

  const duplicatesByOthers = errorTracks.associatedErrors.filter(
    (error) => error.err_type === 'duplicateTrackByAnother'
  );

  const invalidSpotifyLink = errorTracks.associatedErrors.filter(
    (error) => error.err_type === 'InvalidSpotifyLink'
  );

  // Update counts
  const duplicatesCount = duplicatesByYou.length;
  const duplicatesOtherCount = duplicatesByOthers.length;
  const invalidLinksCount = invalidSpotifyLink.length;

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
            uploadId={errorTracks.bulkError_id || ''}
          />
        );
      case 'duplicateByOther':
        return (
          <DuplicateByOthersResolveBulkError
            isOpen={showResolveModal}
            onClose={() => setShowResolveModal(false)}
            errorCount={duplicatesOtherCount}
            uploadId={errorTracks.bulkError_id || ''}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="lg:mx-8 ml-5">
      <div className="flex justify-between items-center">
        <div>
          <span className="flex gap-2">
            <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
              {title}
            </h2>
            <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] flex items-center bg-[#ECF7F7] rounded-2xl">
              Track Details
            </p>
          </span>
          <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
            Upload multiple tracks at once to save time
          </p>
        </div>
        <div className="flex gap-2 items-end">
            {activeTab !== 'invalidSpotify' && (
            (activeTab === 'duplicateByOther' && duplicatesByOthers.length > 0) ||
            (activeTab === 'duplicateByYou' && duplicatesByYou.length > 0)
            ) && (
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
  // Destructure the expected parameter (adjust the key based on your route configuration)
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log('bulkerrorid:', id);
    getUploadHistory();
  }, [id]);


  // errorTracks is now a single object or null until loaded
  const [errorTracks, setErrorTracks] = useState<TrackData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getUploadHistory = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    const config = {
      headers: {
        Authorization: token || '',
      },
      withCredentials: true
    };

    try {
      const res = await axios.get(
        `${baseUrl}/get-upload-error-history?bulkErrorId=${id}`,
        config
      );
      setErrorTracks(res.data.errorHistory);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        (
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred') || ''
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUploadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  // Check if errorTracks is available
  if (!errorTracks) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-600">No error data available</p>
        {/* <button
          onClick={() => (window.location.href = '/dashboard')}
          className="mt-4 px-4 py-2 bg-[#0B1B2B] text-white rounded-lg"
        >
          Return to Dashboard
        </button> */}
      </div>
    );
  }

  return <ResolveError errorTracks={errorTracks} />;
};

export default ResolveErrorWrapper;
