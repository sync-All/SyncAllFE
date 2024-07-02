// SyncUserLayout.tsx
import React from 'react';
import SyncUserNavbar from '../components/SyncUserJourney/SyncUserNavbar';
import { Footer } from '../components';

const SyncUserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <SyncUserNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default SyncUserLayout;
