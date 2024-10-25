import { useState } from 'react';
import AdminDashboardSidebar from '../components/AdminSidebarDashboard';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import ManageUsers from '../components/ManageUsers';
import ManageContent from '../components/ManageContent';
import Quotes from '../components/Quotes';
import Dashboard from '../components/Dashboard';
import AdminDashboardNavbar from '../components/AdminDashboardNavbar';
import { ContentProvider } from '../contexts/ContentContext';
import ContentReview from '../components/ContentReview';

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
    <div className="flex">
      <div
        className={`fixed inset-0 z-50 bg-white  lg:bg-transparent lg:w-1/6 lg:h-screen lg:fixed lg:top-0 lg:left-0 ${
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
            path="music-quotes"
            element={
              <ProtectedRoute path="music-quotes" element={<Quotes />} />
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
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
