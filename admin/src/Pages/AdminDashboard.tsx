import AdminDashboardSidebar from '../components/AdminSidebarDashboard';
import { Route, Routes } from 'react-router-dom';
import ManageUsers from '../components/ManageUsers';
import ManageContent from '../components/ManageContent';
// import Quotes from '../components/Quotes';
import AdminDashboardNavbar from '../components/AdminDashboardNavbar';
import { ContentProvider } from '../contexts/ContentContext';
import ContentReview from '../components/ContentReview';
import { useEffect, useState } from 'react';
import SingleUserPage from '../components/SingleUserPage';
import { UserProvider } from '../contexts/UserContext';
import DisputeTicket from '../components/Dispute/DisputeTicket';
import { DisputeProvider } from '../contexts/DisputeContext';
import TicketDIsputes from '../components/Dispute/TicketDIsputes';
import DisputeDetails from '../components/Dispute/DisputeDetails';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminDashboardHome from '../components/AdminDashboardHome';
import { useAuth } from '../contexts/AuthContext';
import UploadTrackMultiForm from '../components/Upload Track/UploadTrackMultiForm';
import { useLocation } from 'react-router-dom';
import BulkUpload from '../components/Upload Track/Bulk Upload/BulkUpload';
import ResolveErrorWrapper from '../components/Upload Track/Bulk Upload/ResolveError';
import Transfer from '../components/Ownership Transfer/Transfer';
import UserTransferrableTracks from '../components/Ownership Transfer/UserTransferrableTracks';
import UploadedTracks from '../components/UploadedTracks';
import UploadHistoryProvider from '../contexts/UploadHistoryContext';

const tabByPath: { [key: string]: string } = {
  '/admin/dashboard': 'Dashboard',
  '/admin/manage-users': 'Manage Users',
  '/admin/manage-contents': 'Manage Content',
  '/admin/upload-contents': 'Upload Content',
  '/admin/tickets': 'Manage Tickets',
  '/admin/transfer': 'Ownership Transfer',
  '/admin/tracks': 'Tracks',
};

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const role = user?.role;
  const [activeTab, setActiveTab] = useState<string>(''); // empty at first

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // 1. Sync with current route
    const matchedTab = Object.keys(tabByPath).find((path) =>
      currentPath.startsWith(path)
    );

    // 2. Set tab from URL or default based on role
    if (matchedTab) {
      setActiveTab(tabByPath[matchedTab]);
    } else if (role) {
      setActiveTab(role === 'ContentAdmin' ? 'Manage Content' : 'Dashboard');
    }
  }, [location.pathname, role]);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed inset-0 z-50 bg-white lg:bg-transparent lg:w-1/6 lg:h-screen lg:fixed lg:top-0 lg:left-0 ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <AdminDashboardSidebar
          activeItem={activeTab}
          onTabChange={handleTabChange}
          toggleMenu={toggleMenu}
        />
      </div>
      <div className="flex-grow lg:ml-[16.67%] lg:h-screen lg:overflow-auto">
        <AdminDashboardNavbar activeItem={activeTab} toggleMenu={toggleMenu} />
        <Routes>
          <Route
            path="dashboard"
            element={
              <ProtectedRoute
                allowedRoles={['Admin', 'ContentAdmin']}
                element={<AdminDashboardHome />}
              />
            }
          />
          <Route
            path="manage-users"
            element={
              <ProtectedRoute
                allowedRoles={['Admin']}
                element={
                  <UserProvider>
                    <ManageUsers />{' '}
                  </UserProvider>
                }
              />
            }
          />
          <Route
            path="manage-users/:id"
            element={
              <ProtectedRoute
                allowedRoles={['Admin']}
                element={
                  <UserProvider>
                    <ContentProvider>
                      <SingleUserPage />
                    </ContentProvider>
                  </UserProvider>
                }
              />
            }
          />
          <Route
            path="manage-contents"
            element={
              <ProtectedRoute
                allowedRoles={['Admin', 'ContentAdmin']}
                element={
                  <ContentProvider>
                    <ManageContent />
                  </ContentProvider>
                }
              />
            }
          />
          <Route
            path="manage-contents/:id"
            element={
              <ProtectedRoute
                allowedRoles={['Admin', 'ContentAdmin']}
                element={
                  <ContentProvider>
                    <ContentReview />
                  </ContentProvider>
                }
              />
            }
          />
          <Route
            path="tickets"
            element={
              <ProtectedRoute
                allowedRoles={['Admin']}
                element={
                  <DisputeProvider>
                    <DisputeTicket />
                  </DisputeProvider>
                }
              />
            }
          />
          <Route
            path="dispute-tick/:id"
            element={
              <ProtectedRoute
                allowedRoles={['Admin']}
                element={
                  <DisputeProvider>
                    <TicketDIsputes />
                  </DisputeProvider>
                }
              />
            }
          />

          <Route
            path="dispute-tick/details/:id"
            element={
              <ProtectedRoute
                allowedRoles={['Admin']}
                element={
                  <DisputeProvider>
                    <DisputeDetails />
                  </DisputeProvider>
                }
              />
            }
          />

          <Route
            path="upload-contents"
            element={
              <ProtectedRoute
                allowedRoles={['Admin', 'ContentAdmin']}
                element={<UploadTrackMultiForm />}
              />
            }
          />
          <Route
            path="tracks"
            element={
              <ProtectedRoute
                allowedRoles={['Admin', 'ContentAdmin']}
                element={
                  <UploadHistoryProvider>
                    <UploadedTracks />
                  </UploadHistoryProvider>
                }
              />
            }
          />

          <Route
            path="bulkupload"
            element={
              <ProtectedRoute
                allowedRoles={['ContentAdmin']}
                element={<BulkUpload />}
              />
            }
          />

          <Route
            path="/bulk-upload/resolve-errors/:id"
            element={
              <ProtectedRoute
                allowedRoles={['ContentAdmin']}
                element={<ResolveErrorWrapper />}
              />
            }
          />

          <Route
            path="/transfer"
            element={
              <ProtectedRoute
                allowedRoles={['ContentAdmin']}
                element={
                  <UserProvider>
                    <ContentProvider>
                      <UserTransferrableTracks />
                    </ContentProvider>
                  </UserProvider>
                }
              />
            }
          />

          <Route
            path="/transfer/:id"
            element={
              <ProtectedRoute
                allowedRoles={['ContentAdmin']}
                element={
                  <UserProvider>
                    <ContentProvider>
                      <Transfer />
                    </ContentProvider>
                  </UserProvider>
                }
              />
            }
          />

          {/* <Route
                path="music-quotes"
                element={<Quotes />}
              /> */}
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
