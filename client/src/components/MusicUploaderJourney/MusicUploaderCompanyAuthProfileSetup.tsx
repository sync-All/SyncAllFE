import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import Logo from '../../assets/logo-black.png';
import BadgeCheck from '../../assets/images/badge-check.svg';
import BadgeUncheck from '../../assets/images/unnamed.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useLoading from '../../constants/loading';

const validationSchema = Yup.object({
  address: Yup.string().required('Address is required'),
  representative: Yup.string().required('Representative is required'),
  phoneNumber: Yup.string()
    .matches(
      /^\+?[0-9]{10,15}$/,
      "Phone number must be between 10 and 15 digits, with an optional '+' for international numbers"
    )
    .required('Phone number is required'),
});

interface ResponseData {
  message?: string;
}

const MusicUploaderCompanyAuthProfileSetup = () => {
  const { loading, setLoading } = useLoading();

  const navigate = useNavigate();
  const handleNavigationTODashboard = () => {
    navigate('/dashboard');
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="bg-[#013131]">
      <div className="min-h-screen  pb-24 flex items-center justify-center bg-onboardingBg">
        <div className="flex flex-col items-start justify-center bg-white lg:w-[619px] py-[56px] px-[31px] lg:px-[77px] border rounded-[20px] gap-[54px] mt-[56px] ">
          <img src={Logo} alt="" />
          <h2 className="font-formular-regular text-[32px] text-black leading-[18.5px]">
            Complete your profile ✨
          </h2>
          <div className="flex gap-[32px] items-center">
            <span className="flex gap-[8px]">
              <img src={BadgeCheck} alt=""></img>
              <p className="font-formular-regular text-[16px] leading-[19.6px] tracking-[0.024px] ">
                Sign Up
              </p>
            </span>
            <span className="flex gap-[8px] items-center">
              <img
                src={BadgeUncheck}
                alt=""
                className="p-1 bg-[#25A35A] rounded-full"
              ></img>
              <p className="font-formular-regular text-[16px] leading-[19.6px] tracking-[0.024px] ">
                Profile Setup
              </p>
            </span>
          </div>
          <Formik
            initialValues={{ address: '', representative: '', phoneNumber: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const token = localStorage.getItem('token');
              const urlVar = import.meta.env.VITE_APP_API_URL;
              const apiUrl = `${urlVar}/profilesetup/`;

              const config = {
                headers: {
                  Authorization: `${token}`,
                },
              };
              try {
                await delay(2000);
                await axios.post(apiUrl, values, config);
                toast.success('Profile Saved');
                handleNavigationTODashboard();
              } catch (error: unknown) {
                const axiosError = error as AxiosError<ResponseData>;

                toast.error(
                  (axiosError.response && axiosError.response.data
                    ? axiosError.response.data.message ||
                      axiosError.response.data
                    : axiosError.message || 'An error occurred'
                  ).toString()
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <Form className="flex flex-col gap-[32px] w-full">
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] poppins-medium leading-[16px] tracking-[0.4px] ">
                  Company’s Address
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Enter your company address"
                  className="border border-[#D7DCE0] rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-400 italic text-sm py-[4px]"
                />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="flex gap-[4px] text-[16px] poppins-medium leading-[16px] tracking-[0.4px] items-center ">
                  Company’s Representative
                </label>

                <Field
                  name="representative"
                  placeholder="Name of individual registering this company "
                  className=" border border-[#D7DCE0] border-collapse rounded-bl-none rounded-tl-none rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185] w-full"
                />

                <ErrorMessage
                  name="representative"
                  component="div"
                  className="text-red-400 italic text-sm py-[4px]"
                />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="text-[16px] poppins-medium leading-[16px] tracking-[0.4px] ">
                  Company's Phone Number{' '}
                </label>
                <Field
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  className="border border-[#D7DCE0] rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185]"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-400 italic text-sm py-[4px]"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="py-4 px-5 w-full rounded-[8px] poppins-medium text-base bg-[#14181F] text-white"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default MusicUploaderCompanyAuthProfileSetup;
