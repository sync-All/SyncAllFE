// UserContext.tsx
import React from 'react';

interface UserContextProps {
  userRole: string | null;
  googleAuthData: object | null,
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
  setGoogleAuthData: React.Dispatch<React.SetStateAction<object | null>>
}

export const UserContext = React.createContext<UserContextProps>({
  userRole: null,
  googleAuthData: null, 
  setUserRole: () => {},
  setGoogleAuthData: () => {},
});
