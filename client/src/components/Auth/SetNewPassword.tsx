import forgotPasswordImg from '../../assets/images/email-confirmation-img.png';
import syncLogo from '../../assets/logo-black.png';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import useLoading from '../../constants/loading';
import { useLocation } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Passwords must match'
  ),
});

interface FormValues {
  newPassword: string;
  confirmPassword: string;
}

const initialFormData: FormValues = {
  newPassword: '',
  confirmPassword: '',
};

interface ResponseData {
  message?: string;
}

const SetNewPassword = () => {
 const location = useLocation();
 const queryParams = new URLSearchParams(location.search);
 const token = queryParams.get('token');

//  console.log(token);
// console.log(token);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const { loading, setLoading } = useLoading();

  const handlePasswordChange = async (values: FormValues) => {
    setLoading(true);
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/changePassword`;
     const config = {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     };

     console.log(config);
    try {
      await delay(2000);
      const response = await axios.post(apiUrl, values, config);
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

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyErrorStyles = 'italic text-red-600';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';


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
                initialValues={initialFormData}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  handlePasswordChange(values);
                }}
              >
                <Form>
                  <div className={input}>
                    <label htmlFor="newPassword" className={applyLabelStyles}>
                      New password
                    </label>
                    <Field
                      type="password"
                      name="newPassword"
                      className={applyInputStyles}
                    />
                    <ErrorMessage
                      name="newPassword"
                      component="span"
                      className={applyErrorStyles}
                    ></ErrorMessage>
                  </div>
                  <div className={input}>
                    <label
                      htmlFor="confirmPassword"
                      className={applyLabelStyles}
                    >
                      Confirm new password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className={applyInputStyles}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="span"
                      className={applyErrorStyles}
                    ></ErrorMessage>
                  </div>
                  <button
                    type="submit"
                    className="py-2.5 px-4 bg-yellow border border-yellow rounded-[8px] font-formular-medium text-[14px] leading-[20px] mt-[66px] mb-[26px]"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;

