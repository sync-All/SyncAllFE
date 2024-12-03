import { Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import AdminDashboard from './Pages/AdminDashboard';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
