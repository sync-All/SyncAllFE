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
    <AuthProvider>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
      
    </AuthProvider>
  );
}

export default App;
