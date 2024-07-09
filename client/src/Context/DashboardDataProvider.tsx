import axios from 'axios';
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from 'react';

// Interfaces
interface Activity {
  title: string;
  description: string;
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
  fullName: string;
  spotifyLink: string;
  img: string;
  createdAt: string;
  phoneNumber: number;
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
}

// Create Context
const DashboardDataContext = createContext<DataContextType | undefined>(
  undefined
);

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Dashboard Data Provider
const DashboardDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const fetchDashboardData = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/dashboardhome/${userId}`;
    

    const config = {
      headers: {
        Authorization: ` ${token}`,
      },
    };

    // Attempt to retrieve cached data from sessionStorage
    const cachedData = sessionStorage.getItem(`dashboardData_${userId}`);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        setDashboardData(data);
        return;
      }
    }

    try {
      const response = await axios.get(apiUrl, config);
      // Cache the new data with a timestamp
      const dataToCache = {
        data: response.data,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(
        `dashboardData_${userId}`,
        JSON.stringify(dataToCache)
      );
      setDashboardData(response.data);
    } catch (error) {
      
      // Implement retry logic or error handling as needed
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const contextValue = useMemo(
    () => ({ fetchDashboardData, dashboardData }),
    [fetchDashboardData, dashboardData]
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
