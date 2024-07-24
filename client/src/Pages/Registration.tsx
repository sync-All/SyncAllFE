import React from 'react';
import Register from '../components/Auth/Registration/Register.tsx';

interface RegistrationProps {
  selectedRole: string | null;
  setGoogleAuthData: React.Dispatch<React.SetStateAction<object | null>>;
}

const Registration: React.FC<RegistrationProps> = ({ selectedRole, setGoogleAuthData }) => {
  return (
    <div>
      <Register selectedRole={selectedRole} setGoogleAuthData={setGoogleAuthData} />
    </div>
  );
};

export default Registration;