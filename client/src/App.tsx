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
// import UserTypeOnboardingPage from './Pages/UserTypeOnboardingPage';
import Dashboard from './Pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardDataProvider from './Context/DashboardDataProvider';
import SyncUserHome from './components/SyncUserJourney/SyncUserHome';
import SyncUserLayout from './Pages/SyncUserLayout';
import Pricing from './components/SyncUserJourney/Pricing';
import TrackMetadata from './components/SyncUserJourney/TrackMetadata';
import SyncUserLibrary from './components/SyncUserJourney/SyncUserLibrary';
import ProfilePage from './components/SyncUserJourney/SyncUserProfile/ProfilePage';
import { SyncUserProvider } from './Context/syncUserData';
import ForgetPassword from './components/Auth/ForgetPassword';
import SetNewPassword from './components/Auth/SetNewPassword';
import MusicUploaderAuthProfileSetup from './components/MusicUploaderJourney/MusicUploaderAuthProfileSetup';
import GoogleAuthUserRole from './components/Auth/Registration/GoogleAuthUserRole';
import MusicUploaderPublicProfile from './components/MusicUploaderJourney/MusicUploaderPublicProfile';
import QouteType from './components/SyncUserJourney/SyncUserQoutes/QouteType';
// import SyncLicense from './components/SyncUserJourney/SyncUserQoutes/SyncLicense';

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [googleAuthData, setGoogleAuthData] = useState<object | null>(null);

  return (
    <>
      <UserContext.Provider
        value={{ userRole, setUserRole, googleAuthData, setGoogleAuthData }}
      >
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register1"
            element={<RegisterUserRole setSelectedRole={setSelectedRole} />}
          />
          <Route
            path="/selectRole"
            element={<GoogleAuthUserRole googleAuthData={googleAuthData} />}
          />
          <Route
            path="/register2"
            element={
              <Registration
                selectedRole={selectedRole}
                setGoogleAuthData={setGoogleAuthData}
              />
            }
          />
          <Route
            path="/login"
            element={<SignIn setGoogleAuthData={setGoogleAuthData} />}
          />
          <Route path="/email-confirmation" element={<ConfirmEmail />} />
          <Route
            path="/onboarding-details"
            element={
              <ProtectedRoute
                path="/onboarding-details"
                element={<MusicUploaderAuthProfileSetup />}
              />
            }
          ></Route>

          <Route path="/forgotpassword" element={<ForgetPassword />} />

          <Route path="/requestforgotpw" element={<SetNewPassword />} />

          <Route path="/:username" element={<MusicUploaderPublicProfile />} />

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
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <SyncUserHome />
                    </SyncUserLayout>
                  </SyncUserProvider>
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
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <Pricing />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="home/metadata/:id"
            element={
              <ProtectedRoute
                path="home/metadata/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <TrackMetadata />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/mylibrary"
            element={
              <SyncUserProvider>
                {' '}
                <SyncUserLayout>
                  <SyncUserLibrary />
                </SyncUserLayout>
              </SyncUserProvider>
            }
          />

          <Route
            path="/myAccount"
            element={
              <SyncUserProvider>
                {' '}
                <SyncUserLayout>
                  <ProfilePage />
                </SyncUserLayout>
              </SyncUserProvider>
            }
          />

          <Route
            path="home/quote/:id"
            element={
              <ProtectedRoute
                path="home/quote/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <QouteType />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          {/* <Route
            path="home/quote/synclicense"
            element={
              <ProtectedRoute
                path="home/quote/synclicense"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <SyncLicense />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          /> */}
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
