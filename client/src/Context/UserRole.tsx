// UserContext.tsx
import React from 'react';

interface UserContextProps {
  userRole: string | null;
  setUserRole: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = React.createContext<UserContextProps>({
  userRole: null,
  setUserRole: () => {},
});
