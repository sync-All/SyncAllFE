import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import syncLogo from '../../assets/logo-black.png';
import LoginImg from '../../assets/images/email-confirmation-img.png';
import Google from '../../assets/images/google.svg';

const SigninSchema = Yup.object().shape({
  'user-email': Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  'user-password': Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Login = () => {
  return (
    <div className="flex flex-col lg:flex-row  h-screen overflow-hidden ">
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
          <span className="mt-[98px] mb-[71px] ">
            <img src={syncLogo} alt="" />
          </span>

          <div className="text-center">
            <h2 className="text-[32px] leading-[18.5px] font-formular-regular ">
              Sign-In to Syncall
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] font-formular-light ">
              Get onboarded to fully enjoy every single one of our services at
              your fingertips
            </p>
            <div className="mt-[56px]">
              <Formik
                initialValues={{
                  'user-role': '',
                  'user-name': '',
                  'user-email': '',
                  'user-password': '',
                }}
                validationSchema={SigninSchema}
                onSubmit={(values) => {
                  // handle form submission
                  console.log(values)
                }}
              >
                {({ handleSubmit }) => (
                  <Form
                    action=""
                    onSubmit={handleSubmit}
                    className=" flex flex-col gap-[32px]  "
                  >
                    <div className="items-start flex flex-col justify-center gap-[8px] ">
                      <label
                        htmlFor="email"
                        className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px] "
                      >
                        Email*
                      </label>
                      <Field
                        type="email"
                        name="user-email"
                        id=""
                        placeholder="Enter email address"
                        required
                        className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 placeholder-black placeholder-opacity-70"
                      />
                      <ErrorMessage
                        name="user-email"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>
                    <div className="items-start flex flex-col justify-center gap-[8px] ">
                      <label
                        htmlFor="password"
                        className="poppins-medium text-[16px] leading-[16px] tracking-[0.4px] "
                      >
                        {' '}
                        Password*
                      </label>
                      <Field
                        type="password"
                        name="user-password"
                        id=""
                        placeholder="Enter password"
                        required
                        className="w-full border rounded-[4px] py-[16px] px-[16px] poppins-light text-black text-opacity-70 placeholder-black placeholder-opacity-70"
                      />
                      <ErrorMessage
                        name="user-password"
                        component="div"
                        className="text-red-400 italic text-sm py-3"
                      />
                    </div>

                    <div className="mt-[51px] ">
                      <button className="w-full bg-black bg-opacity-80 text-white rounded-[4px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] ">
                        Sign Up
                      </button>
                      <p className="poppins-regular text-[16px] leading-[24px] text-center mt-[32px] ">
                        OR
                      </p>
                      <button className="mt-[32px] flex justify-center items-center gap-[25px] mx-auto border border-[#CCCCCC] py-[11px] px-[33px] rounded-[10px] ">
                        <img src={Google} alt="google icon" />
                        <span className="text-[16px] poppins-medium leading-[24px] text-black ">
                          Continue with Google
                        </span>
                      </button>
                    </div>
                    <div className="my-[26px]  ">
                      <p className="poppins-medium text-[16px] leading-[24px] ">
                        Don’t have an account?{' '}
                        <a href="/register" className="poppins-bold">
                          Sign-Up
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
    </div>
  );
};

export default Login;
