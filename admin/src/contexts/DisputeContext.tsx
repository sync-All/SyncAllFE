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

export interface Dispute {
  _id: string;
  tickId: string;
  associatedDisputes: AssociatedDispute[];
  status: string;
  user: User;
  userDetails: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SupportingDoc {
  type: string;
  data: number[]; // Since the data array appears empty, we'll use `number[]` assuming it's meant to hold numeric data.
}

interface Activity {
  activityDate: string;
  action_taken: string;
  performedBy: string;
}

interface Assign {
  email: string;
  name: string;
  role: string;
}

export interface AssociatedDispute {
  _id: string;
  activityLog: Activity[];
  assignedTo: Assign;
  nameOfTrack: string;
  issueType: string;
  desc: string;
  supportingDoc: SupportingDoc;
  status: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  supportingDocType: string;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
}

interface DisputeContextProps {
  dispute: Dispute[];
  loading: boolean;
  fetchContent: () => Promise<void>;
}

interface ResponseData {
  message: string;
}

const DisputeContext = createContext<DisputeContextProps | undefined>(
  undefined
);

export const useDispute = () => {
  const context = useContext(DisputeContext);
  if (!context) {
    throw new Error('useDispute must be used within a DisputeProvider');
  }
  return context;
};

export const DisputeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [dispute, setDispute] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchContent = useCallback(async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/ticket/all_tickets`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      setLoading(true);
      const res = await axios.get(apiUrl, config);
      setDispute(res.data);
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
    <DisputeContext.Provider value={{ dispute, loading, fetchContent }}>
      {children}
    </DisputeContext.Provider>
  );
};

export default DisputeContext;
