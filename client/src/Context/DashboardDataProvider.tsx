import axios from 'axios';
import React, { useEffect, useState, useContext, createContext } from 'react';

interface Activity {
  title: string;
  description: string;
}

interface DashboardDetails {
  _id: string;
  totalEarnings: number;
  countryReached: number;
  totalPlays: string;
  activities: Activity[]; // If you know the structure of activities, you can further define the type
  user: string;
  __v: number;
}

interface DashboardData {
  success: boolean;
  dashboardDetails: DashboardDetails;
}

interface DataContextType {
  fetchDashboardData: () => void;
  dashboardData: DashboardData | null;
}

const DashboardDataContext = createContext<DataContextType | undefined>(
  undefined
);

const DashboardDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(userId);
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      const response = await axios.get(
        `https://syncallfe.onrender.com/api/v1/dashboardhome/${userId}`,
        config
      );
      setDashboardData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <div>
      <DashboardDataContext.Provider
        value={{ fetchDashboardData, dashboardData }}
      >
        {children}
      </DashboardDataContext.Provider>
    </div>
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
