import axios, { AxiosError } from 'axios';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ResponseData {
  message: string;
}

const initialFormData: FormValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Your current password is needed to change password'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword')],
    'Passwords must match'
  ),
});

const applyInputStyles =
  'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
const applyLabelStyles =
  'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
const applyErrorStyles = 'italic text-red-600';
const input = 'w-[367px] flex flex-col gap-2 mb-4';

const PasswordSetting = () => {
const { loading, setLoading } = useLoading();
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

  const handlePasswordChange = async (values: FormValues) => {
    setLoading(true)
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/passwordreset/`;

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      await delay(2000)
      await axios.post(apiUrl, values, config);
      toast.success('Password Updated Successfully');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;

      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="lg:mx-8 ml-5 mt-[26px]">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="poppins-semibold text-[24px] text-[#1d2739]">
          Change Password
        </h2>
        <p className="text-[#98A2B3] font-Utile-regular text-[14px]">
          Please enter your current password to change your password
        </p>
      </div>

      <Formik
        initialValues={initialFormData}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handlePasswordChange(values);
        }}
      >
        <Form>
          <div className={input}>
            <label htmlFor="oldPassword" className={applyLabelStyles}>
              Current password
            </label>
            <Field
              type="password"
              name="oldPassword"
              className={applyInputStyles}
            />
            <ErrorMessage
              name="oldPassword"
              component="span"
              className={applyErrorStyles}
            ></ErrorMessage>
          </div>
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
            <label htmlFor="confirmPassword" className={applyLabelStyles}>
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
  );
};

export default PasswordSetting;
