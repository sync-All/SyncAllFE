import React from 'react';
import Register from '../components/Auth/Registration/Register.tsx';

interface RegistrationProps {
  selectedRole: string | null;
}

const Registration: React.FC<RegistrationProps> = ({ selectedRole }) => {
  return (
    <div>
      <Register selectedRole={selectedRole} />
    </div>
  );
};

export default Registration;