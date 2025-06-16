// UploadHistoryContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Track } from '../declaration';



interface UploadHistoryContextType {
  errorTracks: Track[];
  loading: boolean;
  getUploadHistory: () => Promise<void>;
}

const UploadHistoryContext = createContext<
  UploadHistoryContextType | undefined
>(undefined);

export const UploadHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [errorTracks, setErrorTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUploadHistory = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const baseUrl = import.meta.env.VITE_APP_API_URL;

    const config = {
      headers: {
        Authorization: token || '',
      
      },  
      withCredentials: true,
    };

    try {
      const res = await axios.get(
        `${baseUrl}/get-upload-error-history?limit=30`,
        config
      );
      setErrorTracks(res.data.errorHistory);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUploadHistory();
  }, []);

  return (
    <UploadHistoryContext.Provider
      value={{ errorTracks, loading, getUploadHistory }}
    >
      {children}
    </UploadHistoryContext.Provider>
  );
};

export const useUploadHistory = () => {
  const context = useContext(UploadHistoryContext);
  if (context === undefined) {
    throw new Error(
      'useUploadHistory must be used within an UploadHistoryProvider'
    );
  }
  return context;
};

export default UploadHistoryProvider;
