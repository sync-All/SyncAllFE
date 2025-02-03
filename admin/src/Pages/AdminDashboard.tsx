import AdminDashboardSidebar from '../components/AdminSidebarDashboard';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import ManageUsers from '../components/ManageUsers';
import ManageContent from '../components/ManageContent';
// import Quotes from '../components/Quotes';
import Dashboard from '../components/Dashboard';
import AdminDashboardNavbar from '../components/AdminDashboardNavbar';
import { ContentProvider } from '../contexts/ContentContext';
import ContentReview from '../components/ContentReview';
import { useState } from 'react';
import SingleUserPage from '../components/SingleUserPage';
import { UserProvider } from '../contexts/UserContext';
import DisputeTicket from '../components/Dispute/DisputeTicket';
import { DisputeProvider } from '../contexts/DisputeContext';
import TicketDIsputes from '../components/Dispute/TicketDIsputes';
import DisputeDetails from '../components/Dispute/DisputeDetails';

const AdminDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        <UserProvider>
          <Routes>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute path="dashboard" element={<Dashboard />} />
              }
            />
            <Route
              path="manage-users"
              element={
                <ProtectedRoute path="manage-users" element={<ManageUsers />} />
              }
            />

            <Route
              path="manage-users/:id"
              element={
                <ProtectedRoute
                  path="manage-users/:id"
                  element={
                    <ContentProvider>
                      <SingleUserPage />
                    </ContentProvider>
                  }
                />
              }
            />

            <Route
              path="manage-contents"
              element={
                <ProtectedRoute
                  path="manage-contents"
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
                  path="manage-contents/:id"
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
                  path="tickets"
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
                  path="dispute-tick/:id"
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
                  path="dispute-tick/details/:id"
                  element={
                    <DisputeProvider>
                      <DisputeDetails />
                    </DisputeProvider>
                  }
                />
              }
            />

            {/* <Route
                path="music-quotes"
                element={
                  <ProtectedRoute path="music-quotes" element={<Quotes />} />
                }
              /> */}
          </Routes>
        </UserProvider>
      </div>
    </div>
  );
};

export default AdminDashboard;
