import { Formik, Field, ErrorMessage, Form } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import syncLogo from '../../assets/logo-black.png';
import LoginImg from '../../assets/images/email-confirmation-img.png';
import Google from '../../assets/images/google.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserRole';
import { getAdditionalUserInfo } from 'firebase/auth';
import { signInWithGooglePopup } from '../../../firebase';
import useLoading from '../../constants/loading';

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface LoginProps {
  setToken: (token: string) => void;
  setGoogleAuthData: React.Dispatch<React.SetStateAction<object | null>>
}

interface ResponseData {
  message?: string;
  role?: { userType: string };
}

const Login: React.FC<LoginProps> = ({ setToken, setGoogleAuthData }) => {
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  const handleNavigationTODashboard = (spotifyLink:string) => {
    if(!spotifyLink){
      navigate('/onboarding-details');
    }else{
      navigate('/dashboard');
    }
};

  const { setUserRole } = useContext(UserContext);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/signin`;
    try {
      await delay(2000);
      const response = await axios.post(apiUrl, {
        email: values['email'],
        password: values['password'],
      });
      if (response && response.data) {
        // Clear existing session data
        localStorage.clear();
        sessionStorage.clear()
        const spotifyLink = response.data.user.spotifyLink
        setToken(response.data.token);
        // setUserRole(response.data.user.role);
        const user = response.data.user;
        localStorage.setItem('token', response.data.token);
        // localStorage.setItem('userRole', response.data.user.role);
        // localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('syncUserInfo', JSON.stringify(user));
        console.log(response);
        toast.success('Login successful');
        if (response.data.user.role == 'Music Uploader') {
          handleNavigationTODashboard(spotifyLink);
        } else {
          navigate('/home');
        }
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

  const logGoogleUser = async () => {
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/googleauth`;
    // Authenticate user
    const response = await signInWithGooglePopup();
    // get concise information about logged in user
    const userInfo = getAdditionalUserInfo(response);
    // COlate values and assign to their proper fields
    const values = {
      name: userInfo?.profile?.name,
        email: userInfo?.profile?.email,
        img: userInfo?.profile?.picture,
        emailConfirmedStatus: userInfo?.profile?.verified_email,
        userType: 'individual',
        newUser: userInfo?.isNewUser,
    };
    // POst request to server to validate user
    await axios
      .post(apiUrl, values)
      .then((response) => {
        const spotifyLink = response.data.user.spotifyLink
        setUserRole(response.data.user.role); // Set the user type here
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('userId', response.data.user._id);
        toast.success('Login successful');
        if (response.data.user.role == 'Music Uploader') {
          handleNavigationTODashboard(spotifyLink);
        } else {
          navigate('/home');
        }
      })
      .catch((err) => {
        const axiosError = err as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
        setTimeout(()=>{
          if(err.response.status == 302){
            setGoogleAuthData(values)
            return navigate('/selectRole')
          }
        }, 1500)
      });
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="w-[60%]">
        <div
          className="hidden lg:block h-screen bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(${LoginImg})`,
          }}
        />
      </div>

      <div className="w-full lg:order-2 lg:w-[40%] overflow-auto p-4 lg:p-8">
        <div className="flex flex-col justify-center items-center mx-[30px] md:mx-[67px]">
          <span className="mt-[98px] mb-[71px]">
            <img src={syncLogo} alt="Sync Logo" />
          </span>

          <div className="text-center">
            <h2 className="text-[32px] leading-[18.5px] font-formular-regular">
              Sign-In to Syncall
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] font-formular-light">
              Get onboarded to fully enjoy every single one of our services at
              your fingertips
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
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        required
                        className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 placeholder-black placeholder-opacity-70"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>

                    <div className="mt-[51px]">
                      <button
                        type="submit"
                        className="w-full bg-black bg-opacity-80 text-white rounded-[4px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Sign In'}
                      </button>
                      <p className="poppins-regular text-[16px] leading-[24px] text-center mt-[32px]">
                        OR
                      </p>
                      <div
                        onClick={logGoogleUser}
                        className="mt-[32px] flex justify-center items-center gap-[25px] mx-auto border border-[#CCCCCC] py-[11px] px-[33px] rounded-[10px] cursor-pointer hover:bg-[#CCCCCC] "
                      >
                        <img src={Google} alt="google icon" />
                        <span className="text-[16px] poppins-medium leading-[24px] text-black ">
                          Continue with Google
                        </span>
                      </div>
                    </div>
                    <div className="my-[26px]">
                      <p className="poppins-medium text-[16px] leading-[24px]">
                        Don’t have an account?{' '}
                        <a href="/register1" className="poppins-bold">
                          Sign-Up
                        </a>
                      </p>

                      <p className="poppins-medium text-[16px] leading-[24px]">
                        <a href="/forgotpassword">Forgot Password</a>
                      </p>
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
