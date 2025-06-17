import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './Pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import ResetPassword from './components/Auth/ResetPassword';
import ForgetPassword from './components/Auth/ForgetPassword';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/" element={<Login />} />

        <Route
          path="/*"
          element={
            <AuthProvider>
              <Routes>
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </AuthProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
