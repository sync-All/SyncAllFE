import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import DuplicateByYouTab from './DuplicateByYouTab';
import DuplicateByOtherTab from './DuplicateByOtherTab';
import InvalidSpotifyTab from './InvalidSpotifyTab';
import ProceedBulkError from './ProceedBulkError';
import DuplicateByYouResolveBulkError from './DuplicateByYouResolveBulkError';
import DuplicateByOthersResolveBulkError from './DuplicateByOthersResolveBulkError';
import { TrackData, useUpload } from '../../../../Context/UploadContext';
import { useUploadHistory } from '../../../../Context/UploadHistoryContext';
import LoadingAnimation from '../../../../constants/loading-animation';

// Helper function to convert arrays to string
function arrayToString(arr: string[] | string | undefined): string {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr.join(', '); // Convert array to comma-separated string
}

interface ResolveErrorProps {
  data: {
    bulkError_id?: string;
    associatedErrors: TrackData[];
  };
  source: 'upload' | 'error_list';
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

const ResolveError: React.FC<ResolveErrorProps> = ({ data, source }) => {
  const [activeTab, setActiveTab] = useState('duplicateByYou');
  const [showProceedModal, setShowProceedModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const navigate = useNavigate();
  // const { uploadStats } = useUpload();

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

  const getTitle = () => {
    return source === 'upload' ? 'Bulk Track Upload' : 'Resolve Upload Errors';
  };

  const duplicatesByYou = data.associatedErrors.filter(
    (error) => error.err_type === 'duplicateTrack'
  );

  const duplicatesByOthers = data.associatedErrors.filter(
    (error) => error.err_type === 'duplicateTrackByAnother'
  );

  const invalidSpotifyLink = data.associatedErrors.filter(
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
            uploadId={data.bulkError_id || ''}
          />
        );
      case 'duplicateByOther':
        return (
          <DuplicateByOthersResolveBulkError
            isOpen={showResolveModal}
            onClose={() => setShowResolveModal(false)}
            errorCount={duplicatesOtherCount}
            uploadId={data.bulkError_id || ''}
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
  const { uploadStats, clearStoredErrorId } = useUpload();
  const { errorTracks, loading, getUploadHistory } = useUploadHistory();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [hasFetched, setHasFetched] = useState(false);

  // Check if we're coming from a fresh upload
  const isFromFreshUpload = location.state?.freshUpload === true;

  // Clear any stored error ID if we're coming from a fresh upload
  useEffect(() => {
    if (isFromFreshUpload) {
      clearStoredErrorId();
    }
  }, [isFromFreshUpload, clearStoredErrorId]);

  // Get the bulkErrorId from various possible sources
  const bulkErrorIdFromQuery = searchParams.get('bulkErrorId');
  const bulkErrorIdFromState = location.state?.errorData?.bulkError_id;

  // Only use localStorage if not coming from a fresh upload
  const bulkErrorIdFromStorage = !isFromFreshUpload
    ? localStorage.getItem('bulkErrorId')
    : null;

  const bulkErrorId =
    bulkErrorIdFromQuery || bulkErrorIdFromState || bulkErrorIdFromStorage;

  // Store valid bulkErrorId in localStorage (but not for fresh uploads)
  useEffect(() => {
    if (bulkErrorId && !isFromFreshUpload) {
      localStorage.setItem('bulkErrorId', bulkErrorId);
    }
  }, [bulkErrorId, isFromFreshUpload]);

  // Fetch history data if needed
  useEffect(() => {
    // Skip fetch for fresh uploads
    if (isFromFreshUpload) {
      return;
    }

    const needsFetch =
      !hasFetched &&
      bulkErrorId &&
      !errorTracks.some((track) => track._id === bulkErrorId);

    if (needsFetch) {
      setHasFetched(true);
      getUploadHistory();
    }
  }, [
    bulkErrorId,
    errorTracks,
    getUploadHistory,
    hasFetched,
    isFromFreshUpload,
  ]);

  // Show loading state when appropriate
  if (loading && !hasFetched && !isFromFreshUpload) {
    return <LoadingAnimation />;
  }

  // CASE 1: Handle fresh uploads - use current uploadStats
  if (isFromFreshUpload && uploadStats?.errors) {
    // Check if we have any errors to display
    const hasErrors =
      (uploadStats.errors.duplicates &&
        uploadStats.errors.duplicates.length > 0) ||
      (uploadStats.errors.duplicateTrackByAnother &&
        uploadStats.errors.duplicateTrackByAnother.length > 0) ||
      (uploadStats.errors.invalidSpotifyLink &&
        uploadStats.errors.invalidSpotifyLink.length > 0);

    if (hasErrors) {
      // Create the array of errors from uploadStats
      const associatedErrors: TrackData[] = [
        ...(uploadStats.errors.duplicates || []),
        ...(uploadStats.errors.duplicateTrackByAnother || []),
        ...(uploadStats.errors.invalidSpotifyLink || []),
      ].map((track) => ({
        _id: track._id,
        releaseType: track.releaseType || '',
        releaseTitle: track.releaseTitle || '',
        mainArtist: track.mainArtist || '',
        featuredArtist: arrayToString(track.featuredArtist),
        trackTitle: track.trackTitle || '',
        upc: track.upc?.toString() || '',
        isrc: track.isrc || '',
        trackLink: track.trackLink || '',
        genre: track.genre || '',
        subGenre: track.subGenre || '',
        claimBasis: track.claimBasis || '',
        role: track.role || '',
        percentClaim:
          typeof track.percentClaim === 'number'
            ? track.percentClaim.toString()
            : track.percentClaim || '',
        recordingVersion: track.recordingVersion || '',
        featuredInstrument: arrayToString(track.featuredInstrument),
        producers: arrayToString(track.producers),
        recordingDate: track.recordingDate || '',
        countryOfRecording: track.countryOfRecording || '',
        writers: arrayToString(track.writers),
        composers: arrayToString(track.composers),
        publishers: arrayToString(track.publishers),
        copyrightName: track.copyrightName || '',
        copyrightYear:
          typeof track.copyrightYear === 'number'
            ? track.copyrightYear.toString()
            : track.copyrightYear || '',
        releaseDate: track.releaseDate || '',
        countryOfRelease: track.countryOfRelease || '',
        mood: arrayToString(track.mood),
        tag: arrayToString(track.tag),
        lyrics: track.lyrics || '',
        audioLang: track.audioLang || '',
        releaseLabel: track.releaseLabel || '',
        releaseDesc: track.releaseDesc || '',
        message: track.message,
        err_type: track.err_type,
        user: track.user || '',
        trackOwner: track.trackOwner || '',
      }));

      console.log(
        'Using fresh upload data with',
        associatedErrors.length,
        'errors'
      );

      return (
        <ResolveError
          data={{
            bulkError_id: uploadStats.bulkError_id,
            associatedErrors,
          }}
          source="upload"
        />
      );
    }
  }

  // CASE 2: Handle errors from error history
  if (bulkErrorId) {
    const bulkErrorData = errorTracks.find((doc) => doc._id === bulkErrorId);

    if (bulkErrorData) {
      const associatedErrors: TrackData[] = bulkErrorData.associatedErrors.map(
        (error) => ({
          _id: error._id,
          releaseType: error.releaseType || '',
          releaseTitle: error.releaseTitle || '',
          mainArtist: error.mainArtist || '',
          featuredArtist: arrayToString(error.featuredArtist),
          trackTitle: error.trackTitle || '',
          upc: error.upc?.toString() || '',
          isrc: error.isrc || '',
          trackLink: error.trackLink || '',
          genre: error.genre || '',
          subGenre: error.subGenre || '',
          claimBasis: error.claimBasis || '',
          role: error.role || '',
          percentClaim:
            typeof error.percentClaim === 'number'
              ? error.percentClaim.toString()
              : error.percentClaim || '',
          recordingVersion: error.recordingVersion || '',
          featuredInstrument: arrayToString(error.featuredInstrument),
          producers: arrayToString(error.producers),
          recordingDate: error.recordingDate || '',
          countryOfRecording: error.countryOfRecording || '',
          writers: arrayToString(error.writers),
          composers: arrayToString(error.composers),
          publishers: arrayToString(error.publishers),
          copyrightName: error.copyrightName || '',
          copyrightYear:
            typeof error.copyrightYear === 'number'
              ? error.copyrightYear.toString()
              : error.copyrightYear || '',
          releaseDate: error.releaseDate || '',
          countryOfRelease: error.countryOfRelease || '',
          mood: arrayToString(error.mood),
          tag: arrayToString(error.tag),
          lyrics: error.lyrics || '',
          audioLang: error.audioLang || '',
          releaseLabel: error.releaseLabel || '',
          releaseDesc: error.releaseDesc || '',
          message: error.message,
          err_type: error.err_type,
          user: error.user || '',
          trackOwner: error.trackOwner || '',
        })
      );

      console.log('Using error history data with ID:', bulkErrorId);

      return (
        <ResolveError
          data={{
            bulkError_id: bulkErrorData._id,
            associatedErrors,
          }}
          source="error_list"
        />
      );
    } else if (!loading && hasFetched) {
      // Redirect if we've finished loading and still can't find the data
      console.log('Could not find error data with ID:', bulkErrorId);
      navigate('/dashboard/tracks', { replace: true });
      return null;
    }

    return <LoadingAnimation />; // Show loading while we're still looking for data
  }

  // CASE 3: Fall back to showing active upload errors if available
  if (uploadStats?.errors) {
    // Try one more time with uploadStats if available
    const hasErrors =
      (uploadStats.errors.duplicates &&
        uploadStats.errors.duplicates.length > 0) ||
      (uploadStats.errors.duplicateTrackByAnother &&
        uploadStats.errors.duplicateTrackByAnother.length > 0) ||
      (uploadStats.errors.invalidSpotifyLink &&
        uploadStats.errors.invalidSpotifyLink.length > 0);

    if (hasErrors) {
      const associatedErrors: TrackData[] = [
        ...(uploadStats.errors.duplicates || []),
        ...(uploadStats.errors.duplicateTrackByAnother || []),
        ...(uploadStats.errors.invalidSpotifyLink || []),
      ].map((track) => ({
        // Same mapping as before
        _id: track._id,
        releaseType: track.releaseType || '',
        releaseTitle: track.releaseTitle || '',
        mainArtist: track.mainArtist || '',
        featuredArtist: arrayToString(track.featuredArtist),
        trackTitle: track.trackTitle || '',
        upc: track.upc?.toString() || '',
        isrc: track.isrc || '',
        trackLink: track.trackLink || '',
        genre: track.genre || '',
        subGenre: track.subGenre || '',
        claimBasis: track.claimBasis || '',
        role: track.role || '',
        percentClaim:
          typeof track.percentClaim === 'number'
            ? track.percentClaim.toString()
            : track.percentClaim || '',
        recordingVersion: track.recordingVersion || '',
        featuredInstrument: arrayToString(track.featuredInstrument),
        producers: arrayToString(track.producers),
        recordingDate: track.recordingDate || '',
        countryOfRecording: track.countryOfRecording || '',
        writers: arrayToString(track.writers),
        composers: arrayToString(track.composers),
        publishers: arrayToString(track.publishers),
        copyrightName: track.copyrightName || '',
        copyrightYear:
          typeof track.copyrightYear === 'number'
            ? track.copyrightYear.toString()
            : track.copyrightYear || '',
        releaseDate: track.releaseDate || '',
        countryOfRelease: track.countryOfRelease || '',
        mood: arrayToString(track.mood),
        tag: arrayToString(track.tag),
        lyrics: track.lyrics || '',
        audioLang: track.audioLang || '',
        releaseLabel: track.releaseLabel || '',
        releaseDesc: track.releaseDesc || '',
        message: track.message,
        err_type: track.err_type,
        user: track.user || '',
        trackOwner: track.trackOwner || '',
      }));

      console.log('Fallback: Using available upload stats');

      return (
        <ResolveError
          data={{
            bulkError_id: uploadStats.bulkError_id,
            associatedErrors,
          }}
          source="upload"
        />
      );
    }
  }

  // No valid error data found, redirect to dashboard
  console.log('No valid error data found, redirecting to dashboard');
  navigate('/dashboard/tracks', { replace: true });
  return null;
};

export default ResolveErrorWrapper;

// // ErrorTabs.tsx
// interface ErrorTabsProps {
//   onTabChange: (tab: string) => void;
//   activeTab: string;
//   duplicateCount: number;
//   otherDuplicateCount: number;
//   invalidSpotifyCount: number;
// }

// interface ResolveErrorProps {
//   data: {
//     bulkError_id?: string;
//     associatedErrors: TrackData[];
//   };
//   source: 'upload' | 'error_list';
// }

// const ErrorTabs: React.FC<ErrorTabsProps> = ({
//   activeTab,
//   onTabChange,
//   duplicateCount,
//   otherDuplicateCount,
//   invalidSpotifyCount,
// }) => {
//   const tabs = [
//     {
//       label: `Duplicate Uploads by You (${duplicateCount})`,
//       value: 'duplicateByYou',
//     },
//     {
//       label: `Duplicate Uploads by Another User (${otherDuplicateCount})`,
//       value: 'duplicateByOther',
//     },
//     {
//       label: `Invalid Spotify Link (${invalidSpotifyCount})`,
//       value: 'invalidSpotify',
//     },
//   ];

//   return (
//     <div className="border-b border-b-[#D7DCE0]">
//       {tabs.map((tab) => (
//         <button
//           key={tab.value}
//           onClick={() => onTabChange(tab.value)}
//           className={`px-4 py-2 relative ${
//             activeTab === tab.value ? 'text-[black]' : 'text-[#475367]'
//           }`}
//         >
//           {tab.label}
//           {activeTab === tab.value && (
//             <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// };

// // ResolveError.tsx
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
// import DuplicateByYouTab from './DuplicateByYouTab';
// import DuplicateByOtherTab from './DuplicateByOtherTab';
// import InvalidSpotifyTab from './InvalidSpotifyTab';
// import ProceedBulkError from './ProceedBulkError';
// import DuplicateByYouResolveBulkError from './DuplicateByYouResolveBulkError';
// import DuplicateByOthersResolveBulkError from './DuplicateByOthersResolveBulkError';
// import { TrackData, useUpload } from '../../../../Context/UploadContext';
// import { useUploadHistory } from '../../../../Context/UploadHistoryContext';
// import LoadingAnimation from '../../../../constants/loading-animation';

// const ResolveError: React.FC<ResolveErrorProps> = ({ data, source }) => {
//   const [activeTab, setActiveTab] = useState('duplicateByYou');
//   const [showProceedModal, setShowProceedModal] = useState(false);
//   const [showResolveModal, setShowResolveModal] = useState(false);
//   const navigate = useNavigate();
//   const { uploadStats } = useUpload();

//   const handleProceed = () => {
//     setShowProceedModal(true);
//   };

//   if (!data) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-gray-600">No error data available</p>
//         <button
//           onClick={() => navigate('/dashboard')}
//           className="mt-4 px-4 py-2 bg-[#0B1B2B] text-white rounded-lg"
//         >
//           Return to Dashboard
//         </button>
//       </div>
//     );
//   }

//   const getTitle = () => {
//     return source === 'upload' ? 'Bulk Track Upload' : 'Resolve Upload Errors';
//   };

//   const duplicatesByYou = data.associatedErrors.filter(
//     (error) => error.err_type === 'duplicateTrack'
//   );

//   const duplicatesByOthers = data.associatedErrors.filter(
//     (error) => error.err_type === 'duplicateTrackByAnother'
//   );

//   const invalidSpotifyLink = data.associatedErrors.filter(
//     (error) => error.err_type === 'InvalidSpotifyLink'
//   );

//   // Update counts
//   const duplicatesCount = duplicatesByYou.length;
//   const duplicatesOtherCount = duplicatesByOthers.length;
//   const invalidLinksCount =
//     uploadStats?.errors.invalidSpotifyLink.length || invalidSpotifyLink.length;

//   const errorCount = duplicatesCount + duplicatesOtherCount + invalidLinksCount;

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'duplicateByYou':
//         return <DuplicateByYouTab tracks={duplicatesByYou} />;
//       case 'duplicateByOther':
//         return <DuplicateByOtherTab tracks={duplicatesByOthers} />;
//       case 'invalidSpotify':
//         return <InvalidSpotifyTab tracks={invalidSpotifyLink} />;
//       default:
//         return null;
//     }
//   };

//   const renderModal = () => {
//     switch (activeTab) {
//       case 'duplicateByYou':
//         return (
//           <DuplicateByYouResolveBulkError
//             isOpen={showResolveModal}
//             onClose={() => setShowResolveModal(false)}
//             errorCount={duplicatesCount}
//             uploadId={data.bulkError_id || ''}
//           />
//         );
//       case 'duplicateByOther':
//         return (
//           <DuplicateByOthersResolveBulkError
//             isOpen={showResolveModal}
//             onClose={() => setShowResolveModal(false)}
//             errorCount={duplicatesOtherCount}
//             uploadId={data.bulkError_id || ''}
//           />
//         );
//     }
//   };

//   return (
//     <div className="lg:mx-8 ml-5">
//       <div className="flex justify-between items-center">
//         <div>
//           <span className="flex gap-2">
//             <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
//               {getTitle()}
//             </h2>
//             <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
//               Track Details
//             </p>
//           </span>
//           <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
//             Upload multiple tracks at once to save time
//           </p>
//         </div>
//         <div className="flex gap-2 items-end">
//           {activeTab !== 'invalidSpotify' && (
//             <button
//               onClick={() => setShowResolveModal(true)}
//               className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//             >
//               Resolve All
//             </button>
//           )}
//           {renderModal()}
//           <button
//             onClick={handleProceed}
//             className="px-4 py-2.5 bg-[#0B1B2B] text-white rounded-lg hover:bg-opacity-90 transition-colors"
//           >
//             Proceed
//           </button>
//         </div>
//       </div>

//       <div className="mt-8">
//         <ErrorTabs
//           activeTab={activeTab}
//           onTabChange={setActiveTab}
//           duplicateCount={duplicatesCount}
//           otherDuplicateCount={duplicatesOtherCount}
//           invalidSpotifyCount={invalidLinksCount}
//         />
//         {renderContent()}
//       </div>
//       {showProceedModal && (
//         <ProceedBulkError
//           isOpen={showProceedModal}
//           onClose={() => setShowProceedModal(false)}
//           errorCount={errorCount}
//           source="resolve"
//         />
//       )}
//     </div>
//   );
// };

// // const ResolveErrorWrapper: React.FC = () => {
// //   const { uploadStats } = useUpload();
// //   const { errorTracks, loading, getUploadHistory } = useUploadHistory();
// //   const location = useLocation();
// //   const [searchParams] = useSearchParams();
// //   const navigate = useNavigate();
// //   const [hasFetched, setHasFetched] = useState(false);

// //   function arrayToString(arr: string[] | string | undefined): string {
// //     if (!arr) return '';
// //     if (typeof arr === 'string') return arr;
// //     return arr.join(', '); // Convert array to comma-separated string
// //   }

// //   // Extract bulkErrorId from query parameter or location state or localStorage
// //   const bulkErrorIdFromQuery = searchParams.get('bulkErrorId');
// //   const bulkErrorIdFromState = location.state?.errorData?.bulkError_id;
// //   const bulkErrorIdFromStorage = localStorage.getItem('bulkErrorId');
// //   const bulkErrorId =
// //     bulkErrorIdFromQuery || bulkErrorIdFromState || bulkErrorIdFromStorage;

// //   // Store bulkErrorId in localStorage whenever it changes
// //   useEffect(() => {
// //     if (bulkErrorId) {
// //       localStorage.setItem('bulkErrorId', bulkErrorId);
// //     }
// //   }, [bulkErrorId]);

// //   // Fetch history only once and only if needed
// //   useEffect(() => {
// //     // Only fetch if:
// //     // 1. We haven't fetched yet
// //     // 2. We have a bulkErrorId
// //     // 3. The errorTracks don't already contain our bulkErrorId
// //     const needsFetch =
// //       !hasFetched &&
// //       bulkErrorId &&
// //       !errorTracks.some((track) => track._id === bulkErrorId);

// //     if (needsFetch) {
// //       setHasFetched(true);
// //       getUploadHistory();
// //     }
// //   }, [bulkErrorId, errorTracks, getUploadHistory, hasFetched]);

// //   // Don't make decisions until initial loading is complete
// //   if (loading && !hasFetched) {
// //     return <LoadingAnimation />;
// //   }

// //   // If a bulk error ID exists, use the UploadHistory context (source: "error_list")
// //   if (bulkErrorId) {
// //     const bulkErrorData = errorTracks.find((doc) => doc._id === bulkErrorId);
// //     if (bulkErrorData) {
// //       const associatedErrors: TrackData[] = bulkErrorData.associatedErrors.map(
// //         (error) => ({
// //           _id: error._id,
// //           releaseType: error.releaseType || '',
// //           releaseTitle: error.releaseTitle || '',
// //           mainArtist: error.mainArtist || '',
// //           featuredArtist: arrayToString(error.featuredArtist), // Convert array to string
// //           trackTitle: error.trackTitle || '',
// //           upc: error.upc?.toString() || '',
// //           isrc: error.isrc || '',
// //           trackLink: error.trackLink || '',
// //           genre: error.genre || '',
// //           subGenre: error.subGenre || '',
// //           claimBasis: error.claimBasis || '',
// //           role: error.role || '',
// //           percentClaim:
// //             typeof error.percentClaim === 'number'
// //               ? error.percentClaim.toString()
// //               : error.percentClaim || '',
// //           recordingVersion: error.recordingVersion || '',
// //           featuredInstrument: arrayToString(error.featuredInstrument),
// //           producers: arrayToString(error.producers),
// //           recordingDate: error.recordingDate || '',
// //           countryOfRecording: error.countryOfRecording || '',
// //           writers: arrayToString(error.writers),
// //           composers: arrayToString(error.composers),
// //           publishers: arrayToString(error.publishers),
// //           copyrightName: error.copyrightName || '',
// //           copyrightYear:
// //             typeof error.copyrightYear === 'number'
// //               ? error.copyrightYear.toString()
// //               : error.copyrightYear || '',
// //           releaseDate: error.releaseDate || '',
// //           countryOfRelease: error.countryOfRelease || '',
// //           mood: arrayToString(error.mood),
// //           tag: arrayToString(error.tag),
// //           lyrics: error.lyrics || '',
// //           audioLang: error.audioLang || '',
// //           releaseLabel: error.releaseLabel || '',
// //           releaseDesc: error.releaseDesc || '',
// //           message: error.message,
// //           err_type: error.err_type,
// //           user: error.user || '',
// //           trackOwner: error.trackOwner || '',
// //         })
// //       );
// //       return (
// //         <ResolveError
// //           data={{
// //             bulkError_id: bulkErrorData._id,
// //             associatedErrors,
// //           }}
// //           source="error_list"
// //         />
// //       );
// //     } else if (!loading) {
// //       // Only navigate away if we've finished loading and still can't find the data
// //       navigate('/dashboard/tracks', { replace: true });
// //       return null;
// //     }
// //     return <LoadingAnimation />; // Show loading while we're still looking for data
// //   }

// //   // If coming from a bulk upload, use the Upload context (source: "upload")
// //   if (uploadStats?.errors) {
// //     const associatedErrors: TrackData[] = [
// //       ...uploadStats.errors.duplicates,
// //       ...(uploadStats.errors.duplicateTrackByAnother || []),
// //       ...uploadStats.errors.invalidSpotifyLink,
// //     ].map((track) => ({
// //       _id: track._id,
// //       releaseType: track.releaseType || '',
// //       releaseTitle: track.releaseTitle || '',
// //       mainArtist: track.mainArtist || '',
// //       featuredArtist: arrayToString(track.featuredArtist),
// //       trackTitle: track.trackTitle || '',
// //       upc: track.upc?.toString() || '',
// //       isrc: track.isrc || '',
// //       trackLink: track.trackLink || '',
// //       genre: track.genre || '',
// //       subGenre: track.subGenre || '',
// //       claimBasis: track.claimBasis || '',
// //       role: track.role || '',
// //       percentClaim:
// //         typeof track.percentClaim === 'number'
// //           ? track.percentClaim.toString()
// //           : track.percentClaim || '',
// //       recordingVersion: track.recordingVersion || '',
// //       featuredInstrument: arrayToString(track.featuredInstrument),
// //       producers: arrayToString(track.producers),
// //       recordingDate: track.recordingDate || '',
// //       countryOfRecording: track.countryOfRecording || '',
// //       writers: arrayToString(track.writers),
// //       composers: arrayToString(track.composers),
// //       publishers: arrayToString(track.publishers),
// //       copyrightName: track.copyrightName || '',
// //       copyrightYear:
// //         typeof track.copyrightYear === 'number'
// //           ? track.copyrightYear.toString()
// //           : track.copyrightYear || '',
// //       releaseDate: track.releaseDate || '',
// //       countryOfRelease: track.countryOfRelease || '',
// //       mood: arrayToString(track.mood),
// //       tag: arrayToString(track.tag),
// //       lyrics: track.lyrics || '',
// //       audioLang: track.audioLang || '',
// //       releaseLabel: track.releaseLabel || '',
// //       releaseDesc: track.releaseDesc || '',
// //       message: track.message,
// //       err_type: track.err_type,
// //       user: track.user || '',
// //       trackOwner: track.trackOwner || '',
// //     }));
// //     return (
// //       <ResolveError
// //         data={{
// //           bulkError_id: uploadStats.bulkError_id,
// //           associatedErrors,
// //         }}
// //         source="upload"
// //       />
// //     );
// //   }

// //   // Fallback: if no error data is available, navigate to the dashboard.
// //   navigate('/dashboard/tracks', { replace: true });
// //   return null;
// // };

// const ResolveErrorWrapper: React.FC = () => {
//   const { uploadStats } = useUpload();
//   const { errorTracks, loading, getUploadHistory } = useUploadHistory();
//   const location = useLocation();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [hasFetched, setHasFetched] = useState(false);
//   const [bulkErrorId, setBulkErrorId] = useState<string | null>(null);

//    function arrayToString(arr: string[] | string | undefined): string {
//     if (!arr) return '';
//     if (typeof arr === 'string') return arr;
//     return arr.join(', '); // Convert array to comma-separated string
//   }

//   // Determine if we're coming from a fresh upload
//   const isFromFreshUpload =
//     location.state?.freshUpload ||
//     (!bulkErrorId &&
//       uploadStats?.errors &&
//       ((uploadStats.errors.duplicates &&
//         uploadStats.errors.duplicates.length > 0) ||
//         (uploadStats.errors.invalidSpotifyLink &&
//           uploadStats.errors.invalidSpotifyLink.length > 0) ||
//         (uploadStats.errors.duplicateTrackByAnother &&
//           uploadStats.errors.duplicateTrackByAnother.length > 0)));

//   // Extract and manage the bulkErrorId
//   useEffect(() => {
//     // Clear old bulkErrorId from localStorage when coming from a fresh upload
//     if (location.state?.freshUpload) {
//       localStorage.removeItem('bulkErrorId');
//     }

//     // Prioritize query params and location state over localStorage
//     const bulkErrorIdFromQuery = searchParams.get('bulkErrorId');
//     const bulkErrorIdFromState = location.state?.errorData?.bulkError_id;

//     // Only use localStorage as fallback if we don't have fresher sources
//     const bulkErrorIdFromStorage =
//       !bulkErrorIdFromQuery &&
//       !bulkErrorIdFromState &&
//       !location.state?.freshUpload
//         ? localStorage.getItem('bulkErrorId')
//         : null;

//     const newBulkErrorId =
//       bulkErrorIdFromQuery || bulkErrorIdFromState || bulkErrorIdFromStorage;

//     // Store bulkErrorId in state for component use
//     setBulkErrorId(newBulkErrorId);

//     // Store in localStorage if it's from query or state (not for fresh uploads)
//     if (
//       newBulkErrorId &&
//       (bulkErrorIdFromQuery || bulkErrorIdFromState) &&
//       !location.state?.freshUpload
//     ) {
//       localStorage.setItem('bulkErrorId', newBulkErrorId);
//     }
//   }, [location.state, searchParams]);

//   // Fetch history only once and only if needed
//   useEffect(() => {
//     // Skip fetch if we're coming from a fresh upload
//     if (isFromFreshUpload) {
//       return;
//     }

//     // Only fetch if:
//     // 1. We haven't fetched yet
//     // 2. We have a bulkErrorId
//     // 3. The errorTracks don't already contain our bulkErrorId
//     const needsFetch =
//       !hasFetched &&
//       bulkErrorId &&
//       !errorTracks.some((track) => track._id === bulkErrorId);

//     if (needsFetch) {
//       setHasFetched(true);
//       getUploadHistory();
//     }
//   }, [
//     bulkErrorId,
//     errorTracks,
//     getUploadHistory,
//     hasFetched,
//     isFromFreshUpload,
//   ]);

//   // Don't make decisions until initial loading is complete
//   if (loading && !hasFetched && !isFromFreshUpload) {
//     return <LoadingAnimation />;
//   }

//   // CASE 1: If coming from a fresh upload, prioritize uploadStats regardless of bulkErrorId
//   if (isFromFreshUpload && uploadStats?.errors) {
//     // Map errors from uploadStats
//     const associatedErrors: TrackData[] = [
//       ...(uploadStats.errors.duplicates || []),
//       ...(uploadStats.errors.duplicateTrackByAnother || []),
//       ...(uploadStats.errors.invalidSpotifyLink || []),
//     ].map((track) => ({
//       _id: track._id,
//       releaseType: track.releaseType || '',
//       releaseTitle: track.releaseTitle || '',
//       mainArtist: track.mainArtist || '',
//       featuredArtist: arrayToString(track.featuredArtist),
//       trackTitle: track.trackTitle || '',
//       upc: track.upc?.toString() || '',
//       isrc: track.isrc || '',
//       trackLink: track.trackLink || '',
//       genre: track.genre || '',
//       subGenre: track.subGenre || '',
//       claimBasis: track.claimBasis || '',
//       role: track.role || '',
//       percentClaim:
//         typeof track.percentClaim === 'number'
//           ? track.percentClaim.toString()
//           : track.percentClaim || '',
//       recordingVersion: track.recordingVersion || '',
//       featuredInstrument: arrayToString(track.featuredInstrument),
//       producers: arrayToString(track.producers),
//       recordingDate: track.recordingDate || '',
//       countryOfRecording: track.countryOfRecording || '',
//       writers: arrayToString(track.writers),
//       composers: arrayToString(track.composers),
//       publishers: arrayToString(track.publishers),
//       copyrightName: track.copyrightName || '',
//       copyrightYear:
//         typeof track.copyrightYear === 'number'
//           ? track.copyrightYear.toString()
//           : track.copyrightYear || '',
//       releaseDate: track.releaseDate || '',
//       countryOfRelease: track.countryOfRelease || '',
//       mood: arrayToString(track.mood),
//       tag: arrayToString(track.tag),
//       lyrics: track.lyrics || '',
//       audioLang: track.audioLang || '',
//       releaseLabel: track.releaseLabel || '',
//       releaseDesc: track.releaseDesc || '',
//       message: track.message,
//       err_type: track.err_type,
//       user: track.user || '',
//       trackOwner: track.trackOwner || '',
//     }));

//     // If we have errors to show, render the ResolveError component
//     if (associatedErrors.length > 0) {
//       return (
//         <ResolveError
//           data={{
//             bulkError_id: uploadStats.bulkError_id,
//             associatedErrors,
//           }}
//           source="upload"
//         />
//       );
//     }
//   }

//   // CASE 2: If we have a bulkErrorId, try to find it in errorTracks
//   if (bulkErrorId) {
//     const bulkErrorData = errorTracks.find((doc) => doc._id === bulkErrorId);
//     if (bulkErrorData) {
//       const associatedErrors: TrackData[] = bulkErrorData.associatedErrors.map(
//         (error) => ({
//           _id: error._id,
//           releaseType: error.releaseType || '',
//           releaseTitle: error.releaseTitle || '',
//           mainArtist: error.mainArtist || '',
//           featuredArtist: arrayToString(error.featuredArtist),
//           trackTitle: error.trackTitle || '',
//           upc: error.upc?.toString() || '',
//           isrc: error.isrc || '',
//           trackLink: error.trackLink || '',
//           genre: error.genre || '',
//           subGenre: error.subGenre || '',
//           claimBasis: error.claimBasis || '',
//           role: error.role || '',
//           percentClaim:
//             typeof error.percentClaim === 'number'
//               ? error.percentClaim.toString()
//               : error.percentClaim || '',
//           recordingVersion: error.recordingVersion || '',
//           featuredInstrument: arrayToString(error.featuredInstrument),
//           producers: arrayToString(error.producers),
//           recordingDate: error.recordingDate || '',
//           countryOfRecording: error.countryOfRecording || '',
//           writers: arrayToString(error.writers),
//           composers: arrayToString(error.composers),
//           publishers: arrayToString(error.publishers),
//           copyrightName: error.copyrightName || '',
//           copyrightYear:
//             typeof error.copyrightYear === 'number'
//               ? error.copyrightYear.toString()
//               : error.copyrightYear || '',
//           releaseDate: error.releaseDate || '',
//           countryOfRelease: error.countryOfRelease || '',
//           mood: arrayToString(error.mood),
//           tag: arrayToString(error.tag),
//           lyrics: error.lyrics || '',
//           audioLang: error.audioLang || '',
//           releaseLabel: error.releaseLabel || '',
//           releaseDesc: error.releaseDesc || '',
//           message: error.message,
//           err_type: error.err_type,
//           user: error.user || '',
//           trackOwner: error.trackOwner || '',
//         })
//       );

//       return (
//         <ResolveError
//           data={{
//             bulkError_id: bulkErrorData._id,
//             associatedErrors,
//           }}
//           source="error_list"
//         />
//       );
//     } else if (!loading && hasFetched) {
//       // Only navigate away if we've finished loading and still can't find the data
//       navigate('/dashboard/tracks', { replace: true });
//       return null;
//     }

//     return <LoadingAnimation />; // Show loading while we're still looking for data
//   }

//   // CASE 3: Fallback for case where we don't have fresh upload or valid bulkErrorId
//   navigate('/dashboard/tracks', { replace: true });
//   return null;
// };

// export default ResolveErrorWrapper;
