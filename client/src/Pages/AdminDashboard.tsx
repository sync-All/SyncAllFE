import { useState } from 'react';
import AdminDashboardSidebar from '../components/Admin/AdminSidebarDashboard';
import Dashboard from '../components/Admin/Dashboard';
import AdminNavbar from '../components/Admin/AdminDashboardNavbar';
import ManageUsers from '../components/Admin/ManageUsers';
import SingleUserPage from '../components/Admin/SingleUserPage';

 interface User {
  _id: string;
  fullName: string;
  name: string;
  email: string;
  status: string;
  role: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [selectedUser, setSelectedUser] = useState<User | null>(null); // Track the selected user

const handleTabChange = (tab: string, user?: User) => {
  // Updated signature
  setActiveTab(tab);
  if (user) {
    setSelectedUser(user); // Store the selected user if provided
  }
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
        <AdminDashboardSidebar
          activeItem={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className="flex-grow lg:ml-[16.67%] lg:h-screen lg:overflow-auto">
        <AdminNavbar activeItem={activeTab} toggleMenu={toggleMenu} />
        {activeTab === 'Dashboard' && <Dashboard />}
        {activeTab === 'Manage Users' && (
          <ManageUsers onTabChange={handleTabChange} />
        )}
        {activeTab === 'Manage User' && selectedUser && (
          <SingleUserPage user={selectedUser} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
