import { useState } from 'react';
import MusicUploaderDashboardSidebar from '../components/MusicUploaderJourney/MusicUploaderDashboardSidebar';
import MusicUploaderDashboard from '../components/MusicUploaderJourney/MusicUploaderDashboard';
import MusicUploaderNavbar from '../components/MusicUploaderJourney/MusicUploaderNavbar';
import UploadTrackMultiForm from '../components/MusicUploaderJourney/MusicUploaderTrackUpload/UploadTrackMultiForm';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMenuOpen(false); // close the menu when a tab is clicked
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 bg-white lg:static lg:bg-transparent lg:w-1/6 lg:h-auto ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <MusicUploaderDashboardSidebar
          activeItem={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className="flex-grow">
        <MusicUploaderNavbar activeItem={activeTab} toggleMenu={toggleMenu} />
        {activeTab === 'Dashboard' && <MusicUploaderDashboard />}
        {activeTab === 'Upload Track' && <UploadTrackMultiForm />}
        {/* {activeTab === 'My Tracks' && <MyTracksContent />}
        {activeTab === 'Earnings' && <EarningsContent />}
        {activeTab === 'User Profile' && <UserProfileContent />} */}
      </div>
    </div>
  );
};

export default Dashboard;
