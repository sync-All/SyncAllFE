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

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  return (
    <>
      <DashboardDataProvider>
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
            <Route path="/login" element={<SignIn />} />
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

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute path="/dashboard" element={<Dashboard />} />
              }
            />
          </Routes>
        </UserContext.Provider>
      </DashboardDataProvider>
    </>
  );
}

export default App;
