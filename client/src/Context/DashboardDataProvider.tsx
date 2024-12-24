import axios, { AxiosError } from 'axios';
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';

// Interfaces
interface Activity {
  title: string;
  description: string;
}

export interface Track {
  _id: string;
  audioLang: string;
  claimBasis: string;
  composers: string[];
  copyrightName: string;
  copyrightYear: number;
  countryOfRecording: string;
  countryOfRelease: string;
  createdAt: string;
  earnings: number;
  err_type: string;
  featuredArtist: string[];
  featuredInstrument: string[];
  genre: string;
  isrc: string;
  likes: string[];
  lyrics: string;
  mainArtist: string;
  message: string;
  mood: string[];
  percentClaim: number;
  producers: string[];
  publishers: string[];
  recordingDate: string;
  recordingVersion: string;
  releaseDate: string;
  releaseDesc: string;
  releaseLabel: string;
  releaseTitle: string;
  releaseType: string;
  role: string;
  spotifyArtistIds: string[];
  tag: string[];
  trackLink: string;
  trackTitle: string;
  upc: number;
  updatedAt: string;
  uploadStatus: string;
  user: string;
  writers: string[];
  __v: number;
}

interface Earnings {
  _id: string;
  accName: string;
  accNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  code: string;
  bicCode: string;
  totalEarnings: number;
  totalWithdrawals: number;
  averageMonthlyEarnings: number;
  availableBal: number;
}

interface DashboardDetails {
  _id: string;
  totalTracks: [];
  earnings: Earnings;
  totalEarnings: number;
  countryReached: number;
  totalPlays: string;
  activities: Activity[];
  user: string;
  __v: number;
}

interface ProfileInfo {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  userType: string;
  emailConfirmedStatus: boolean;
  __v: number;
  bio: string;
  username: string;
  spotifyLink: string;
  img: string;
  createdAt: string;
  phoneNumber: number;
  representative: string;
  address: string;
  uploadErrors: Track[];
}

interface transactions {
  _id: string;
  transactionId: string;
  transactionType: string;
  transactionStatus: string;
  amount: string;
  date: Date;
}

interface DashboardData {
  success: boolean;
  dashboardDetails: DashboardDetails;
  profileInfo: ProfileInfo;
  transactions: transactions[];
}

interface DataContextType {
  fetchDashboardData: () => void;
  dashboardData: DashboardData | null;
  setToken: (token: string) => void;
  loading: boolean;
}

interface ResponseData {
  message?: string;
}

// Create Context
const DashboardDataContext = createContext<DataContextType | undefined>(
  undefined
);

// const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Dashboard Data Provider
const DashboardDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_token, setToken] = useState(localStorage.getItem('token'));

  const fetchDashboardData = useCallback(async () => {
    // const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/dashboardhome`;

    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get(apiUrl, config);
      setDashboardData(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        toast.error('Unauthorized access - redirecting to login.');
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
    fetchDashboardData();
  }, [fetchDashboardData]);

  const contextValue = useMemo(
    () => ({ fetchDashboardData, dashboardData, setToken, loading }),
    [fetchDashboardData, dashboardData, setToken, loading]
  );

  return (
    <DashboardDataContext.Provider value={contextValue}>
      {children}
    </DashboardDataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DashboardDataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export default DashboardDataProvider;
