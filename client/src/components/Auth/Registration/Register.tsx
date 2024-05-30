import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import axios from 'axios';
import { toast } from 'react-toastify';

const SignupSchema = Yup.object().shape({
  userType: Yup.string()
    .oneOf(['individual', 'company'], 'Invalid user type')
    .required('User type is required'),
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

interface RegisterProps {
  selectedRole: string | null;
}
interface FormValues {
  userType: string;
  name: string;
  password: string;
  email: string;
}

const Register: React.FC<RegisterProps> = ({ selectedRole }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleRedirectionToEmailConfirmation = () => {
    navigate('/email-confirmation');
  };

  const handleFormSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://syncallfe.onrender.com/api/v1/signup',
        values
      );
      console.log(response.data);
      toast.success('Account created successfully');
      handleRedirectionToEmailConfirmation();
    } catch (error) {
      toast.error('Account created unsuccessfully');
    } finally {
      setIsLoading(false);
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
          <div className="mt-[56px]">
            <Formik
              initialValues={{
                userType: '',
                name: '',
                email: '',
                password: '',
                role: selectedRole,
              }}
              validationSchema={SignupSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleSubmit }) => (
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
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
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

                  <div className="mt-[51px] ">
                    <button
                      className="w-full bg-black bg-opacity-80 text-white rounded-[4px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] disabled:blur-sm  disabled:cursor-not-allowed"
                      type="submit"
                      disabled={isLoading}
                    >
                      Sign Up
                    </button>
                    <p className="poppins-regular text-[16px] leading-[24px] text-center mt-[32px] ">
                      OR
                    </p>
                    <button
                      className="mt-[32px] flex justify-center items-center gap-[25px] mx-auto border border-[#CCCCCC] py-[11px] px-[33px] rounded-[10px] "
                      disabled={isLoading}
                    >
                      <img src={Google} alt="google icon" />
                      <span className="text-[16px] poppins-medium leading-[24px] text-black ">
                        Continue with Google
                      </span>
                    </button>
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
