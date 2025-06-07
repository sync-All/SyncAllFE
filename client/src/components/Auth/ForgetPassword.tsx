import forgotPasswordImg from '../../assets/images/email-confirmation-img.png';
import syncLogo from '../../assets/logo-black.png';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import useLoading from '../../constants/loading';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

interface ResponseData {
  message?: string;
}

const ForgetPassword = () => {
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { loading, setLoading } = useLoading();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/request/forgotPassword`;
    try {
      await delay(2000);
      const response = await axios.post(apiUrl, {
        email: values['email'],
      });
      toast.success(response.data.message);
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
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="w-[60%]">
        <div
          className="hidden lg:block h-screen bg-center bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(${forgotPasswordImg})`,
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
              Forgot password
            </h2>
            <p className="mt-[16px] text-[16px] leading-[24px] font-formular-light">
              Input your email to recieve a link
            </p>
            <div className="mt-[56px]">
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={ValidationSchema}
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
                    <div className="mt-[51px]">
                      <button
                        type="submit"
                        className="w-full bg-black bg-opacity-80 text-white rounded-[4px] py-[16px] poppins-medium text-[16px] leading-[18.5px] tracking-[0.4px] disabled:cursor-not-allowed"
                        disabled={loading}
                      >
                        {loading ? 'Loading...' : 'Submit'}
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

export default ForgetPassword;
