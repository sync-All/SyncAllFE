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
import ProtectedRoute from './components/ProtectedRoute';
import DashboardDataProvider from './Context/DashboardDataProvider';
import SyncUserHome from './components/SyncUserJourney/SyncUserHome';
import SyncUserLayout from './Pages/SyncUserLayout';
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
import FilmMoviesTv from './components/SyncUserJourney/SyncUserQoutes/Film_Movies_Tv';
import TvCommercialAds from './components/SyncUserJourney/SyncUserQoutes/Tv_Commercial&Ads';
import ScrollToTop from './constants/scroll-to-top';
import VideoGames from './components/SyncUserJourney/SyncUserQoutes/Video_Games';
import Sampling from './components/SyncUserJourney/SyncUserQoutes/Sampling';
import Interpolation from './components/SyncUserJourney/SyncUserQoutes/Interpolation';
import Crbt from './components/SyncUserJourney/SyncUserQoutes/Crbt';
import SocialMediaContent from './components/SyncUserJourney/SyncUserQoutes/Social_Media_Content';
import PaymentStatus from './Pages/PaymentStatus';
import MusicUploaderCompanyAuthProfileSetup from './components/MusicUploaderJourney/MusicUploaderCompanyAuthProfileSetup';
import DashboardLayout from './Pages/Dashboard';
import ExplorePage from './components/LandingPageComponents/ExplorePage';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import PricingLoggedIn from './components/SyncUserJourney/Pricing-LoggedIn';
import PricingLoggedOut from './components/SyncUserJourney/Pricing-LoggedOut';

function PricingWrapper() {
  const token = localStorage.getItem('token');

  if (token) {
    return (
      <SyncUserProvider>
        <SyncUserLayout>
          <PricingLoggedIn />
        </SyncUserLayout>
      </SyncUserProvider>
    );
  } else {
    return <PricingLoggedOut />;
  }
}

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [googleAuthData, setGoogleAuthData] = useState<object | null>(null);

  return (
    <>
      <UserContext.Provider
        value={{ userRole, setUserRole, googleAuthData, setGoogleAuthData }}
      >
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore-sounds" element={<ExplorePage />}></Route>
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

          <Route path="/termsOfService" element={<TermsOfService />}></Route>
          <Route path="/privacyPolicy" element={<PrivacyPolicy />}></Route>

          <Route path="/email-confirmation" element={<ConfirmEmail />} />
          <Route
            path="/onboarding-details"
            element={
              <ProtectedRoute
                path="/onboarding-details"
                element={<MusicUploaderAuthProfileSetup />}
              />
            }
          />

          <Route
            path="/onboarding-companies"
            element={
              <ProtectedRoute
                path="/onboarding-companies"
                element={<MusicUploaderCompanyAuthProfileSetup />}
              />
            }
          />

          <Route path="/forgotpassword" element={<ForgetPassword />} />

          <Route path="/requestforgotpw" element={<SetNewPassword />} />

          <Route path="/:username" element={<MusicUploaderPublicProfile />} />

          {/* Wrap the DashboardDataProvider around the routes that require it */}
          <Route
            path="/dashboard/*"
            element={
              <DashboardDataProvider>
                <ProtectedRoute
                  path="/dashboard/*"
                  element={<DashboardLayout />}
                />
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

          <Route path="/pricing" element={<PricingWrapper />} />

          <Route
            path="/metadata/:id"
            element={
              <ProtectedRoute
                path="/metadata/:id"
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
            path="/quote/:id"
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

          <Route
            path="/quote/filmMovieTVSeries/:id"
            element={
              <ProtectedRoute
                path="/quote/filmMovieTVSeries/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <FilmMoviesTv />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/tvCommercialAds/:id"
            element={
              <ProtectedRoute
                path="/quote/tvCommercialAds/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <TvCommercialAds />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/videoGames/:id"
            element={
              <ProtectedRoute
                path="/quote/videoGames/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <VideoGames />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/sampling/:id"
            element={
              <ProtectedRoute
                path="/quote/sampling/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <Sampling />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/interpolation/:id"
            element={
              <ProtectedRoute
                path="/quote/interpolation/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <Interpolation />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/crbt/:id"
            element={
              <ProtectedRoute
                path="/quote/crbt/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <Crbt />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/quote/smc/:id"
            element={
              <ProtectedRoute
                path="/quote/smc/:id"
                element={
                  <SyncUserProvider>
                    <SyncUserLayout>
                      <SocialMediaContent />
                    </SyncUserLayout>
                  </SyncUserProvider>
                }
              />
            }
          />

          <Route
            path="/payment/status/"
            element={
              <ProtectedRoute
                path="/payment/status/"
                element={
                  <SyncUserProvider>
                    <PaymentStatus />
                  </SyncUserProvider>
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
