import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Logo from '../../assets/logo-black.png';
import BackgroundPattern from '../../assets/images/user-role-pattern.svg';
import BadgeCheck from '../../assets/images/badge-check.svg';
import BadgeUncheck from '../../assets/images/unnamed.png';
import InfoIcon from '../../assets/images/info-fill.svg';
import axios, { AxiosError } from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useLoading from '../../constants/loading';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  spotifyLink: Yup.string().url('Invalid url').required('Required'),
  bio: Yup.string().required('Required'),
});

interface ResponseData {
  message?: string;
}

const SyncUserAuthProfileSetup = () => {
    const { loading, setLoading } = useLoading();


const navigate = useNavigate()
const handleNavigationToHome = () => {
  navigate('/home')
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

  return (
    <div className="bg-[#013131]">
      <div
        className="h-screen flex items-center justify-center"
        style={{ background: `url(${BackgroundPattern})` }}
      >
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
            initialValues={{ name: '', spotifyLink: '', bio: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              setLoading(true);
              const token = localStorage.getItem('token');
              const urlVar = import.meta.env.VITE_APP_API_URL;
              const apiUrl = `${urlVar}/profileUpdate/`;

              const config = {
                headers: {
                  Authorization: `${token}`,
                },
              };
              try {
                await delay(2000);
                await axios.post(apiUrl, values, config);
                toast.success('Profile Saved');
                handleNavigationToHome();
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
                  What’s your name?
                </label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="border border-[#D7DCE0] rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185]"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-400 italic text-sm py-[4px]"
                />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="flex gap-[4px] text-[16px] poppins-medium leading-[16px] tracking-[0.4px] items-center ">
                  Your Spotify Link{' '}
                  <span>
                    <img src={InfoIcon} alt="" />
                  </span>
                </label>
                <span className="flex w-full">
                  <span className="px-3 py-auto text-base font-normal font-inter text-[#637083] bg-[#F9FAFB] border border-[#E4E7EC] whitespace-nowrap align-middle flex items-center rounded-tl-[4px] rounded-bl-[4px]">
                    https://
                  </span>
                  <Field
                    type="url"
                    name="spotifyLink"
                    placeholder="Paste Link"
                    className="border-l-0 border border-[#D7DCE0] border-collapse rounded-bl-none rounded-tl-none rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185] w-full"
                  />
                </span>
                <ErrorMessage
                  name="spotifyLink"
                  component="div"
                  className="text-red-400 italic text-sm py-[4px]"
                />
              </div>
              <div className="flex flex-col gap-[8px] w-full">
                <label className="text-[16px] poppins-medium leading-[16px] tracking-[0.4px] ">
                  Your Bio
                </label>
                <Field
                  as="textarea"
                  name="bio"
                  placeholder="Tell us about yourself "
                  className="border border-[#D7DCE0] rounded-[4px] py-[16px] pl-[16px] placeholder:poppins-light placeholder:leading-4 placeholder:text-4 text-[#667185]"
                />
                <ErrorMessage
                  name="bio"
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

export default SyncUserAuthProfileSetup;
