// import { createContext, useContext, useState } from 'react';
// import { Track } from './DashboardDataProvider';



// interface UploadStats {
//   fileName: string;
//   fileSize: string;
//   totalTracks: number;
//   failedUploads: number;
//   successfulUploads: number;
//   bulkError_id: string;
//   errors: {
//     duplicates: Track[];
//     duplicateTrackByAnother: Track[];
//     invalidSpotifyLink: Track[];
//   };
// }

// interface UploadContextType {
//   uploadStats: UploadStats | null;
//   setUploadStats: (stats: UploadStats | null) => void;
//   clearStoredErrorId: () => void;
// }

// const UploadContext = createContext<UploadContextType | null>(null);

// export const useUpload = () => {
//   const context = useContext(UploadContext);
//   if (!context) {
//     throw new Error('useUpload must be used within an UploadProvider');
//   }
//   return context;
// };

// export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);

//   // Add a function to clear stored error ID
//   const clearStoredErrorId = () => {
//     localStorage.removeItem('bulkErrorId');
//   };

//   // Don't automatically set bulkErrorId in localStorage here
//   // This prevents old IDs from persisting when not needed

//   console.log(`uploadStats from context: ${JSON.stringify(uploadStats)}`);

//   return (
//     <UploadContext.Provider
//       value={{
//         uploadStats,
//         setUploadStats,
//         clearStoredErrorId,
//       }}
//     >
//       {children}
//     </UploadContext.Provider>
//   );
// };

// export default UploadContext;

// // // UploadContext.tsx
// // import { createContext, useContext, useEffect, useState } from 'react';
// // import { Track } from './DashboardDataProvider';

// // export interface TrackData {
// //   _id: string;
// //   releaseType: string;
// //   releaseTitle: string;
// //   mainArtist: string;
// //   featuredArtist: string;
// //   trackTitle: string;
// //   upc: string;
// //   isrc: string;
// //   trackLink: string;
// //   genre: string;
// //   subGenre: string;
// //   claimBasis: string;
// //   role: string;
// //   percentClaim: string;
// //   recordingVersion: string;
// //   featuredInstrument: string;
// //   producers: string;
// //   recordingDate: string;
// //   countryOfRecording: string;
// //   writers: string;
// //   composers: string;
// //   publishers: string;
// //   copyrightName: string;
// //   copyrightYear: string;
// //   releaseDate: string;
// //   countryOfRelease: string;
// //   mood: string;
// //   tag: string;
// //   lyrics: string;
// //   audioLang: string;
// //   releaseLabel: string;
// //   releaseDesc: string;
// //   message?: string;
// //   err_type?: string;
// //   user: string;
// //   trackOwner: string;
// // }

// // interface UploadStats {
// //   fileName: string;
// //   fileSize: string;
// //   totalTracks: number;
// //   failedUploads: number;
// //   successfulUploads: number;
// //   bulkError_id: string;
// //   errors: {
// //     duplicates: Track[];
// //     duplicateTrackByAnother: Track[];
// //     invalidSpotifyLink: Track[];
// //   };
// // }

// // interface UploadContextType {
// //   uploadStats: UploadStats | null;
// //   setUploadStats: (stats: UploadStats | null) => void;
// // }

// // const UploadContext = createContext<UploadContextType | null>(null);

// // export const useUpload = () => {
// //   const context = useContext(UploadContext);
// //   if (!context) {
// //     throw new Error('useUpload must be used within an UploadProvider');
// //   }
// //   return context;
// // };

// // export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
// //   children,
// // }) => {
// //   const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);
// //   useEffect(() => {
// //     if (uploadStats && uploadStats.bulkError_id) {
// //       localStorage.setItem('bulkErrorId', uploadStats.bulkError_id);
// //     }
// //   }, [uploadStats]);

// // console.log(`uploadStats from context: ${JSON.stringify(uploadStats)}`);

// //   return (
// //     <UploadContext.Provider value={{ uploadStats, setUploadStats }}>
// //       {children}
// //     </UploadContext.Provider>
// //   );
// // };

// // export default UploadContext;
