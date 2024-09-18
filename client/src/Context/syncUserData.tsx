import axios, { AxiosError } from 'axios';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';

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

export interface PendingTracks {
  _id: string;
  track_name: string;
  license_status: string;
  amount: string;
  trackLink: string;
  quote_id: string;
  quote_type: string;
  sync_user_info: string;
  music_uploader_info: string;
  createdAt: string;
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
  pendingLicensedTracks: PendingTracks[];
  billing: {
    plan: string;
    amount: number;

    frequency : string;
    sub_status : string;
    next_billing_date : string;
    last4card_digits : string ;
    prod_id : string,
    sub_id : string
    card_brand : string;

  };
  recentActivity: string[];
  tracklist: TracklistDetails[];
  upcomingRenewals: number;
  __v: number;
};

interface ResponseData {
  message?: string;
}

type User = {
  user: UserDetails;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchSyncData: () => void;
  loading: boolean;
};

const SyncUserContext = createContext<UserContextType | undefined>(undefined);

export const SyncUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Unauthorized access - redirecting to login.');
        delay(5000)
        window.location.href = '/login';
      } else {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSyncData();
  }, [fetchSyncData]);

  const contextValue = useMemo(
    () => ({ fetchSyncData, user, setUser, loading }),
    [fetchSyncData, user, loading]
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
