import React, { createContext, useState, useContext, useEffect } from 'react';

type User = {
  _id: string;
  email: string;
  name: string;
  role: string;
  userType: string;
  emailConfirmedStatus: boolean;
  authSource: string;
  phoneNumber: string;
  img: string;
  totalLicensedTracks: string[];
  billing: {
    plan: string;
    amount: number;
  };
  recentActivity: string[]; 
  tracklist: string[]; 
  upcomingRenewals: number;
  __v: number;
};


type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const SyncUserContext = createContext<UserContextType | undefined>(undefined);

export const SyncUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const userFromStorage = localStorage.getItem('syncUserInfo');
    return userFromStorage ? JSON.parse(userFromStorage) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('syncUserInfo', JSON.stringify(user));
    } else {
      localStorage.removeItem('syncUserInfo');
    }
  }, [user]);

  return (
    <SyncUserContext.Provider value={{ user, setUser }}>
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