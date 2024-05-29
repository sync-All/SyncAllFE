import { useState, useEffect } from "react";
import Login from "../components/Auth/Login";

const SignIn: React.FC = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div>
      <Login setToken={setToken} />
    </div>
  );
}

export default SignIn;