import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Landing from './Pages/Landing';
import Registration from './Pages/Registration';
import SignIn from './Pages/Sign-in';
import ConfirmEmail from './Pages/ConfirmEmail';
import RegisterUserRole from './Pages/RegisterUserRole';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
