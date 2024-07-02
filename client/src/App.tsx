import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Pages/Landing';
import Registration from './Pages/Registration';
import SignIn from './Pages/Sign-in';
import ConfirmEmail from './Pages/ConfirmEmail';
import RegisterUserRole from './Pages/RegisterUserRole';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './Context/UserRole';
import UserTypeOnboardingPage from './Pages/UserTypeOnboardingPage';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardDataProvider from './Context/DashboardDataProvider';
import SyncUserHome from './components/SyncUserJourney/SyncUserHome';
import SyncUserLayout from './Pages/SyncUserLayout';
import Pricing from './components/SyncUserJourney/Pricing';

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <>
      <UserContext.Provider value={{ userRole, setUserRole }}>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register1"
            element={<RegisterUserRole setSelectedRole={setSelectedRole} />}
          />
          <Route
            path="/register2"
            element={<Registration selectedRole={selectedRole} />}
          />
          <Route
            path="/login"
            element={
              <DashboardDataProvider>{<SignIn />}</DashboardDataProvider>
            }
          />
          <Route path="/email-confirmation" element={<ConfirmEmail />} />
          <Route
            path="/onboarding-details"
            element={
              <ProtectedRoute
                path="/onboarding-details"
                element={<UserTypeOnboardingPage />}
              />
            }
          ></Route>

          {/* Wrap the DashboardDataProvider around the routes that require it */}
          <Route
            path="/dashboard"
            element={
              <DashboardDataProvider>
                <ProtectedRoute path="/dashboard" element={<Dashboard />} />
              </DashboardDataProvider>
            }
          />

          <Route
            path="/home"
            element={
              <ProtectedRoute
                path="/home"
                element={
                  <SyncUserLayout>
                    <SyncUserHome />
                  </SyncUserLayout>
                }
              />
            }
          />

          <Route
            path="/pricing"
            element={
              <ProtectedRoute
                path="/pricing"
                element={
                  <SyncUserLayout>
                    <Pricing />
                  </SyncUserLayout>
                }
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
