import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import syncLogo from '../../assets/images/logo-black.png';
// import LoginImg from '../../assets/images/email-confirmation-img.png';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import useLoading from '../../constants/loading';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface ResponseData {
  message?: string;
  role?: { userType: string };
}

const Login = () => {
  const { loading, setLoading } = useLoading();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/admin_signin`;
    try {
      await delay(2000);
      const response = await axios.post(
        apiUrl,
        {
          email: values['email'],
          password: values['password'],
        },
        {
          withCredentials: true,
        }
      );
      if (response && response.data) {
        localStorage.clear();
        sessionStorage.clear();

        const { token, user } = response.data;

        setToken(token);

        localStorage.setItem('token', token);
        localStorage.setItem('adminData', JSON.stringify(user));
        toast.success('Login successful');
     
        
          navigate('/admin/dashboard');

       

      } else {
        throw new Error('Response or response data is undefined');
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full   overflow-auto p-4 lg:p-8">
        <div className="flex flex-col justify-center items-center mx-[30px] md:mx-[67px]">
          <span className="mt-[98px] mb-[71px]">
            <img src={syncLogo} alt="Sync Logo" />
          </span>

          <div className="text-center">
            <h2 className="text-[32px] leading-[18.5px] font-formular-regular">
              Sign-In to Syncall
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] font-formular-light">
              Provide your credentials to access your account
            </p>
            <div className="mt-[56px]">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={SigninSchema}
                onSubmit={handleLogin}
              >
                {({ handleSubmit }) => (
                  <Form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[32px]"
                  >
                    <div className="items-start flex flex-col justify-center gap-[8px]">
                      <label
                        htmlFor="email"
                        className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px]"
                      >
                        Email*
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        required
                        className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 placeholder-black placeholder-opacity-70"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>
                    <div className="items-start flex flex-col justify-center gap-[8px]">
                      <label
                        htmlFor="password"
                        className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px]"
                      >
                        Password*
                      </label>
                      <div className="relative w-full">
                        <Field
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          id="password"
                          placeholder="Enter password"
                          required
                          className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 placeholder-black placeholder-opacity-70"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-black"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>

                    <div className="mt-[51px]">
                      <button
                        type="submit"
                        className="w-full bg-black bg-opacity-80 text-white rounded-[8px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Sign In'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
