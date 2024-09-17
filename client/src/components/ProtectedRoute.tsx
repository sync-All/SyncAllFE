// client/src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

interface ProtectedRouteProp {
  element: React.ReactElement;
  path: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProp> = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
