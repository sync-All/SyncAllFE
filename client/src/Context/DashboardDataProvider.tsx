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

interface DashboardDetails {
  _id: string;
  totalTracks: [];
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
}

interface DashboardData {
  success: boolean;
  dashboardDetails: DashboardDetails;
  profileInfo: ProfileInfo;
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
    if (!userId || !token) {
      console.error('User ID or token is null or undefined');
      return;
    }

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
      const response = await axios.get(
        `https://syncallfe.onrender.com/api/v1/dashboardhome/${userId}`,
        config
      );
      // Cache the new data with a timestamp
      const dataToCache = {
        data: response.data,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(`dashboardData_${userId}`, JSON.stringify(dataToCache));
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
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