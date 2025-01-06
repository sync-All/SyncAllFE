import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Content {
  _id: string;
  duration: string;
  mainArtist: string;
  featuredArtist: string[];
  releaseType: string;
  releaseTitle: string;
  trackTitle: string;
  trackLink: string;
  upc: string;
  uploadStatus: string;
  earnings: number;
  isrc: string;
  genre: string;
  artWork: string;
  recordingVersion: string;
  featuredInstrument: string[];
  producers: string[];
  recordingDate: string;
  countryOfRecording: string;
  writers: string[];
  composers: string[];
  publishers: string[];
  claimBasis: string;
  claimingUser: string;
  role: string;
  percentClaim: number;
  copyrightName: string;
  copyrightYear: number | null;
  releaseDate: string;
  countryOfRelease: string;
  mood: string[];
  tag: string[];
  lyrics: string;
  audioLang: string;
  explicitCont: string;
  releaseLabel: string;
  releaseDesc: string;
  spotifyLink: string;
  user: User;
}

interface ContentContextProps {
  content: Content[];
  loading: boolean;
  fetchContent: () => Promise<void>;
}

interface ResponseData {
  message: string;
}

const ContentContext = createContext<ContentContextProps | undefined>(
  undefined
);

// Custom hook to access the context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContent = useCallback(async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/all_content`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      setLoading(true);
      const res = await axios.get(apiUrl, config);
      setContent(res.data);
      console.log(res.data);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <ContentContext.Provider value={{ content, loading, fetchContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
