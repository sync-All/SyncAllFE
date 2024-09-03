import axios from 'axios';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

 export interface TracklistDetails {
    _id: string;
    trackTitle: string;
    mainArtist: string;
    genre: string;
    mood: string[];
    releaseDate: string;
    countryOfRecording: string;
    countryOfRelease: string;
    lyrics: string;
    trackLink: string;
    artWork: string;
    audioLang: string;
    claimBasis: string;
    claimingUser: string;
    composers: string[];
    copyrightName: string;
    copyrightYear: number;
    createdAt: string;
    earnings: number;
    explicitCont: boolean;
    featuredArtist: string[];
    featuredInstrument: string[];
    isrc: string;
    percentClaim: number;
    producers: string[];
    publishers: string[];
    recordingDate: string;
    recordingVersion: string;
    releaseDesc: string;
    releaseLabel: string;
    releaseTitle: string;
    releaseType: string;
    role: string;
    tag: string[];
    upc: number;
    updatedAt: string;
    uploadStatus: string;
    user: string;
    writers: string[];
    duration: string;
    date: Date;
    status: string;
    amount: number;
  }

  


type UserDetails = {
  _id: string;
  email: string;
  name: string;
  role: string;
  userType: string;
  emailConfirmedStatus: boolean;
  authSource: string;
  phoneNumber: string;
  img: string;
  totalLicensedTracks: TracklistDetails[];
  billing: {
    plan: string;
    amount: number;
  };
  recentActivity: string[];
  tracklist: TracklistDetails[];
  upcomingRenewals: number;
  __v: number;
};

type User = {
  user: UserDetails; 
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchSyncData: () => void;
};

const SyncUserContext = createContext<UserContextType | undefined>(undefined);

export const SyncUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchSyncData = useCallback(async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/getsyncuserinfo`;

    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };

    try {
      const response = await axios.get(apiUrl, config);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching sync data:', error);
    }
  }, []);

  useEffect(() => {
    fetchSyncData();
  }, [fetchSyncData]);

  const contextValue = useMemo(
    () => ({ fetchSyncData, user, setUser }),
    [fetchSyncData, user]
  );

  return (
    <SyncUserContext.Provider value={contextValue}>
      {children}
    </SyncUserContext.Provider>
  );
};

export const useSyncUser = () => {
  const context = useContext(SyncUserContext);
  if (context === undefined) {
    throw new Error('useSyncUser must be used within a SyncUserProvider');
  }
  return context;
};
