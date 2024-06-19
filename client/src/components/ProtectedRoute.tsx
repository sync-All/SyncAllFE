import React from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProp {
element: React.ReactElement
path: string
}
const ProtectedRoute: React.FC<ProtectedRouteProp > = ({element}) => {
  const token = localStorage.getItem('token')

  console.log(token)
  return token ? element : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
