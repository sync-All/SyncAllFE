
export interface User {
  _id: string;
  name: string;
  email: string;
  accountStatus: string;
  address: string;
  authSource: string;
  bio: string;
  createdAt: string;
  emailConfirmedStatus: boolean;
  img: string;
  password: string;
  phoneNumber: string;
  representative: string;
  role: string;
  updatedAt: string;
  userType: string;
  fullName: string;
  spotifyLink: string;
}


// UserContext.tsx
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface UserContextProps {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
}

interface ResponseData {
  message: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Custom hook to access the context
export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/allusers`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      setLoading(true);
      const res = await axios.get(apiUrl, config);
      setUsers(res.data.message);
      console.log(res.data.message);
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
    fetchUsers();
  }, [fetchUsers]);

  return (
    <UserContext.Provider value={{ users, loading, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;