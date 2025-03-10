import { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import MusicUploaderDashboardSidebar from '../components/MusicUploaderJourney/MusicUploaderDashboardSidebar';
import MusicUploaderDashboard from '../components/MusicUploaderJourney/MusicUploaderDashboard';
import MusicUploaderNavbar from '../components/MusicUploaderJourney/MusicUploaderNavbar';
import UploadTrackMultiForm from '../components/MusicUploaderJourney/MusicUploaderTrackUpload/UploadTrackMultiForm';
import MusicUploaderTracks from '../components/MusicUploaderJourney/MusicUploaderTracks';
import MusicUploaderEarnings from '../components/MusicUploaderJourney/MusicUploaderEarnings';
import ProfileMultiStep from '../components/MusicUploaderJourney/MusicUploaderUserProfile/ProfileMultiStep';
import MusicUploaderDispute from '../components/MusicUploaderJourney/Dispute/MusicUploaderDispute';
import BulkUpload from '../components/MusicUploaderJourney/MusicUploaderTrackUpload/Bulk Upload/BulkUpload';
import { UploadProvider } from '../Context/UploadContext';
import ResolveErrorWrapper from '../components/MusicUploaderJourney/MusicUploaderTrackUpload/Bulk Upload/ResolveError';
// import DashboardDataProvider from '../Context/DashboardDataProvider';
import UploadHistoryProvider from '../Context/UploadHistoryContext';

const DashboardLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the active tab from the current path
  const getActiveTab = (path: string) => {
    if (path === '/dashboard' || path === '/dashboard/') return 'Dashboard';
    const tabPath = path.split('/dashboard/')[1];
    const routes: { [key: string]: string } = {
      upload: 'Upload Track',
      bulkupload: 'Upload Track',
      tracks: 'My Tracks',
      earnings: 'Earnings',
      profile: 'User Profile',
      dispute: 'Dispute',
    };
    return routes[tabPath] || 'Dashboard';
  };

  const activeTab = getActiveTab(location.pathname);

  const handleTabChange = (tab: string) => {
    const routes: { [key: string]: string } = {
      Dashboard: '/dashboard',
      'Upload Track': '/dashboard/upload',
      'My Tracks': '/dashboard/tracks',
      Earnings: '/dashboard/earnings',
      'User Profile': '/dashboard/profile',
      Dispute: '/dashboard/dispute',
    };
    navigate(routes[tab]);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex">
      <div
        className={`fixed inset-0 bg-white lg:bg-transparent lg:w-1/6 lg:h-screen lg:fixed lg:top-0 lg:left-0 ${
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
        <Routes>
          <Route index element={<MusicUploaderDashboard />} />
          <Route path="upload" element={<UploadTrackMultiForm />} />{' '}
          <Route
            path="bulkupload"
            element={
              <UploadProvider>
                <BulkUpload />
              </UploadProvider>
            }
          />
          <Route
            path="/bulk-upload/resolve-errors"
            element={
              <UploadHistoryProvider>
                <UploadProvider>
                  <ResolveErrorWrapper />
                </UploadProvider>
              </UploadHistoryProvider>
            }
          />
          <Route
            path="tracks"
            element={
              <UploadHistoryProvider>
                <MusicUploaderTracks onTabChange={handleTabChange} />
              </UploadHistoryProvider>
            }
          />
          <Route path="earnings" element={<MusicUploaderEarnings />} />
          <Route path="profile" element={<ProfileMultiStep />} />
          <Route path="dispute" element={<MusicUploaderDispute />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
