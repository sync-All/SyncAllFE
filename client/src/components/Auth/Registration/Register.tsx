import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGooglePopup } from '../../../../firebase';
import * as Yup from 'yup';
import syncLogo from '../../../assets/logo-black.png';
import Google from '../../../assets/images/google.svg';
import AuthSliderImage1 from '../../../assets/images/auth-img-1.png';
import AuthSliderImage2 from '../../../assets/images/auth-img-2.png';
import AuthSliderImage3 from '../../../assets/images/auth-img-3.png';
import AuthSliderImage4 from '../../../assets/images/auth-img-4.png';
import AuthSliderImage5 from '../../../assets/images/auth-img-5.png';
import AuthSliderImage6 from '../../../assets/images/auth-img-6.png';
import AuthSliderImage7 from '../../../assets/images/auth-img-7.png';
import AuthSliderImage8 from '../../../assets/images/auth-img-8.png';
import AuthImageSlider from '../../../constants/auth-image-slider';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { getAdditionalUserInfo } from 'firebase/auth';
import { UserContext } from '../../../Context/UserRole';
import useLoading from '../../../constants/loading';

const SignupSchema = Yup.object().shape({
  userType: Yup.string()
    .oneOf(['Individual', 'Company'], 'Invalid user type')
    .required('User type is required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  terms: Yup.boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
});

interface ResponseData {
  message?: string;
  role?: { userType: string };
}

interface RegisterProps {
  selectedRole: string | null;
  setGoogleAuthData: React.Dispatch<React.SetStateAction<object | null>>;
}
interface FormValues {
  userType: string;
  name: string;
  password: string;
  email: string;
  role: string | null;
  terms: boolean;
}
interface ResponseData {
  message?: string;
  user?: object;
}

const Register: React.FC<RegisterProps> = ({
  selectedRole,
  setGoogleAuthData,
}) => {
  const navigate = useNavigate();
  const handleRedirectionToEmailConfirmation = (emailDomain: string) => {
    navigate('/email-confirmation', { state: { emailDomain } });
  };
  const handleNavigationTODashboard = (spotifyLink: string) => {
    if (!spotifyLink) {
      navigate('/onboarding-details');
    } else {
      navigate('/dashboard');
    }
  };

  const handleSpecificActionForCompany = (phoneNumber: string) => {
    if (!phoneNumber) {
      navigate('/onboarding-companies');
    } else {
      navigate('/dashboard');
    }
  };

  const { setUserRole } = useContext(UserContext);
  const { loading, setLoading } = useLoading();

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const logGoogleUser = async () => {
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/googleauth`;

    const response = await signInWithGooglePopup();
    // get concise information about logged in user
    const userInfo = getAdditionalUserInfo(response);
    // COlate values and assign to their proper fields
    const values = {
      name: userInfo?.profile?.name,
      email: userInfo?.profile?.email,
      img: userInfo?.profile?.picture,
      emailConfirmedStatus: userInfo?.profile?.verified_email,
      newUser: userInfo?.isNewUser,
    };
    // POst request to server to validate user
    await axios
      .post(apiUrl, values)
      .then((response) => {
        const spotifyLink = response.data.user.spotifyLink;
        setUserRole(response.data.user.role); // Set the user type here
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        localStorage.setItem('userId', response.data.user._id);
        toast.success('Login successful');
        if (
          response.data.user.role === 'Music Uploader' &&
          response.data.user.userType === 'Company'
        ) {
          handleSpecificActionForCompany(response.data.user.phoneNumber);
        } else if (
          response.data.user.role === 'Music Uploader' &&
          response.data.user.userType === 'Individual'
        ) {
          handleNavigationTODashboard(spotifyLink);
        } else {
          navigate('/home');
        }
      })
      .catch((err) => {
        if (err.response.status == 302) {
          setGoogleAuthData({ ...values });
          return navigate('/selectRole');
        }
        const axiosError = err as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      });
  };

  const handleFormSubmit = async (values: FormValues) => {
    setLoading(true);
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/signup`;

    try {
      await delay(2000);
      const response = await axios.post(apiUrl, values);
      toast.success('Account created successfully');
      handleRedirectionToEmailConfirmation(response.data.emailDomain);
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

  const images = [
    AuthSliderImage1,
    AuthSliderImage2,
    AuthSliderImage3,
    AuthSliderImage4,
    AuthSliderImage5,
    AuthSliderImage6,
    AuthSliderImage7,
    AuthSliderImage8,
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="hidden order-2 w-full lg:order-1 lg:w-[60%] h-full overflow-hidden lg:block">
        <AuthImageSlider images={images} interval={3000} />
      </div>
      <div className="order-1 w-full lg:order-2 lg:w-[40%] overflow-auto p-4 lg:p-8">
        <div className="flex flex-col justify-center items-center mx-[30px] md:mx-[67px]">
          <span className="mt-[98px] mb-[71px]">
            <img src={syncLogo} alt="Sync Logo" />
          </span>
          <div className="text-center">
            <h2 className="text-[32px] leading-[18.5px] font-formular-regular">
              Sign-Up on Syncall
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] font-formular-light">
              Get onboarded to fully enjoy every single one of our services at
              your fingertips.
            </p>
          </div>
          <div className="mt-[56px] w-[80%]">
            <Formik
              initialValues={{
                userType: '',
                name: '',
                email: '',
                password: '',
                role: selectedRole,
                terms: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-[32px]"
                >
                  <div className="items-start flex flex-col justify-center gap-[8px] ">
                    <label
                      htmlFor=""
                      className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px] "
                    >
                      Are you an individual or company?*
                    </label>
                    <div className="custom-select">
                      <Field
                        as="select"
                        name="userType"
                        id="userType"
                        required
                        className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 "
                      >
                        <option value="select">Select from here</option>
                        <option value="Individual">Individual</option>
                        <option value="Company">Company</option>
                      </Field>
                      <ErrorMessage
                        name="userType"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>
                  </div>
                  <div className="items-start flex flex-col justify-center gap-[8px]">
                    <label
                      htmlFor="name"
                      className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px]"
                    >
                      Name*
                    </label>
                    <Field
                      name="name"
                      id="user-name"
                      placeholder="Enter your name"
                      className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-400 italic text-sm py-[4px]"
                    />
                  </div>

                  <div className="items-start flex flex-col justify-center gap-[8px]">
                    <label
                      htmlFor="user-email"
                      className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px]"
                    >
                      Email*
                    </label>
                    <Field
                      name="email"
                      id="user-email"
                      placeholder="Enter your email"
                      className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-400 italic text-sm py-[4px]"
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
                      id="user-password"
                      placeholder="Enter your password"
                      className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-400 italic text-sm py-[4px]"
                    />
                  </div>

                  <div className="">
                    <div className="flex items-center gap-[8px] mb-[16px]">
                      <input
                        type="checkbox"
                        name="terms"
                        id=""
                        onChange={(e) => {
                          setFieldValue('terms', e.currentTarget.checked);
                        }}
                      />
                      <label
                        htmlFor="terms"
                        className="font-inter text-[#344051] font-light text-[14px] leading-[18px]"
                      >
                        By creating an account you agree with our{' '}
                        <a href="/termsOfService" className="underline">
                          Terms of Service
                        </a>{' '}
                        , and{' '}
                        <a href="/privacyPolicy" className="underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-400 italic text-sm py-[4px] mb-2"
                    />
                    <button
                      className="w-full bg-black bg-opacity-80 text-white rounded-[4px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] disabled:cursor-not-allowed"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                    <p className="poppins-regular text-[16px] leading-[24px] text-center mt-[32px]">
                      OR
                    </p>
                    <div
                      onClick={logGoogleUser}
                      className="mt-[32px] flex justify-center items-center gap-[25px] mx-auto border border-[#CCCCCC] py-[11px] px-[33px] rounded-[10px] cursor-pointer hover:bg-[#CCCCCC]"
                    >
                      <img src={Google} alt="google icon" />
                      <span className="text-[16px] poppins-medium leading-[24px] text-black">
                        Continue with Google
                      </span>
                    </div>
                  </div>

                  <div className="my-[26px]  ">
                    <p className="poppins-medium text-[16px] leading-[24px] ">
                      Already have an account?{' '}
                      <a href="/login" className="poppins-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
