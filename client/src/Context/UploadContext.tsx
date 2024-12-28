// UploadContext.tsx
import { createContext, useContext, useState } from 'react';

export interface TrackData {
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
}

interface UploadStats {
  fileName: string;
  fileSize: string;
  totalTracks: number;
  failedUploads: number;
  successfulUploads: number;
  errors: {
    duplicates: TrackData[];
    invalidLinks: TrackData[];
  };
}

interface UploadContextType {
  uploadStats: UploadStats | null;
  setUploadStats: (stats: UploadStats | null) => void;
}

const UploadContext = createContext<UploadContextType | null>(null);

export const useUpload = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
};

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uploadStats, setUploadStats] = useState<UploadStats | null>(null);

  return (
    <UploadContext.Provider value={{ uploadStats, setUploadStats }}>
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContext;
