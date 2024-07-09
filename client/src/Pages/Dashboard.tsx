import { useState } from 'react';
import MusicUploaderDashboardSidebar from '../components/MusicUploaderJourney/MusicUploaderDashboardSidebar';
import MusicUploaderDashboard from '../components/MusicUploaderJourney/MusicUploaderDashboard';
import MusicUploaderNavbar from '../components/MusicUploaderJourney/MusicUploaderNavbar';
import UploadTrackMultiForm from '../components/MusicUploaderJourney/MusicUploaderTrackUpload/UploadTrackMultiForm';
import MusicUploaderTracks from '../components/MusicUploaderJourney/MusicUploaderTracks';
import MusicUploaderEarnings from '../components/MusicUploaderJourney/MusicUploaderEarnings';
import ProfileMultiStep from '../components/MusicUploaderJourney/MusicUploaderUserProfile/ProfileMultiStep';
import MusicUploaderDispute from '../components/MusicUploaderJourney/Dispute/MusicUploaderDispute';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 bg-white  lg:bg-transparent lg:w-1/6 lg:h-screen lg:fixed lg:top-0 lg:left-0 ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <MusicUploaderDashboardSidebar
          activeItem={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className="flex-grow lg:ml-[16.67%] lg:h-screen lg:overflow-auto">
        <MusicUploaderNavbar activeItem={activeTab} toggleMenu={toggleMenu} />
        {activeTab === 'Dashboard' && <MusicUploaderDashboard />}
        {activeTab === 'Upload Track' && <UploadTrackMultiForm />}
        {activeTab === 'My Tracks' && <MusicUploaderTracks />}
        {activeTab === 'Earnings' && <MusicUploaderEarnings />}
        {activeTab === 'User Profile' && <ProfileMultiStep />}
        {activeTab === 'Dispute' && <MusicUploaderDispute />}
      </div>
    </div>
  );
};

export default Dashboard;
