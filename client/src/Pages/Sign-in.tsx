import { useState, useEffect } from "react";
import Login from "../components/Auth/Login";

interface LoginProps {
  setGoogleAuthData: React.Dispatch<React.SetStateAction<object | null>>;
}

const SignIn: React.FC<LoginProps> = ({ setGoogleAuthData }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div>
      <Login setToken={setToken} setGoogleAuthData={setGoogleAuthData}/>
    </div>
  );
}

export default SignIn;