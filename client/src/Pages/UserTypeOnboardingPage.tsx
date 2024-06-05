import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserRole';
import MusicUploaderAuthProfileSetup from '../components/MusicUploaderJourney/MusicUploaderAuthProfileSetup';
import SyncUserAuthProfileSetup from '../components/SyncUserJourney/SyncUserAuthProfileSetup';

const UserTypeOnboardingPage: React.FC = () => {
  const { userRole: contextUserRole } = useContext(UserContext);
  const [userRole, setUserRole] = useState<string | null>(contextUserRole)

  useEffect(() => {
    if(!userRole) {
      const role = localStorage.getItem('userRole')
      setUserRole(role)
    }
  },[userRole])

  if (userRole === 'Music Uploader') {
    return <MusicUploaderAuthProfileSetup />;
  } else if (userRole === 'Sync User') {
    return <SyncUserAuthProfileSetup />;
  }
};

export default UserTypeOnboardingPage;
