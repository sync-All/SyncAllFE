import React from 'react';
import UserRole from "../components/Auth/Registration/UserRole";

interface RegisterUserRoleProps {
  setSelectedRole: (role: string | null) => void;
}

const RegisterUserRole: React.FC<RegisterUserRoleProps> = ({
  setSelectedRole,
}) => {
  return (
    <div>
      <UserRole setSelectedRole={setSelectedRole} />
    </div>
  );
};

export default RegisterUserRole;