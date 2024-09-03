// SyncUserLayout.tsx
import React, { useEffect } from 'react';
import SyncUserNavbar from '../components/SyncUserJourney/SyncUserNavbar';
import { Footer } from '../components';
import { useLocation } from 'react-router-dom';

const SyncUserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {pathname} = useLocation()
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[pathname])
  return (
    <>
      <SyncUserNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default SyncUserLayout;
