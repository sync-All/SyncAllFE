import Attach from '../../../assets/images/attachimage.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';
import { useState } from 'react';
import { useSyncUser } from '../../../Context/syncUserData';

const AccountSetting = () => {
  const { user } = useSyncUser()
  const [fileName, setFileName] = useState('');
    const { loading, setLoading } = useLoading();

    const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email address'),
    phoneNumber: Yup.string(),
  });

 function delay(ms: number) {
   return new Promise((resolve) => setTimeout(resolve, ms));
 }

  interface ResponseData {
    message?: string;
  }

  const initialValues = {
    firstName: user?.name,
    lastName: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    img: user?.img,
  };
  return (
    <div className="mt-[49px]">
      <Formik
        initialValues={initialValues}
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
            await axios.postForm(apiUrl, values, config);
            toast.success('Profile Information Updated successful');
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
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="firstName" className={applyLabelStyles}>
                  First Name
                </label>
                <Field
                  type="text"
                  name="firstName"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className={input}>
                <label htmlFor="lastName" className={applyLabelStyles}>
                  Last Name
                </label>
                <Field
                  type="text"
                  name="lastName"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className={applyFormDiv}>
              {' '}
              <div className={input}>
                <label htmlFor="phoneNumber" className={applyLabelStyles}>
                  Phone Number
                </label>
                <Field
                  type="number"
                  name="phoneNumber"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className={input}>
                <label htmlFor="email" className={applyLabelStyles}>
                  Email Address
                </label>
                <Field type="email" name="email" className={applyInputStyles} />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className={applyFormDiv}>
              <div className={`${input} relative `}>
                <label className={applyLabelStyles}>
                  Change your profile photo
                </label>
                <label
                  htmlFor="img"
                  className={`${applyInputStyles} h-[147px] border-dashed border-spacing-10 border-[2px] flex flex-col items-center px-7 py-6`}
                >
                  {fileName ? (
                    <>
                      <span>
                        <img src={Attach} alt="" className="" />
                      </span>
                      <span className="text-[#292D32] mt-5 font-inter text-[16px] font-medium">
                        {fileName}
                      </span>
                      <p className="font-Utile-regular text-[16px] leading-normal text-[#A9ACB4] mt-3">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </>
                  ) : (
                    <>
                      <span>
                        <img src={Attach} alt="" className="" />
                      </span>
                      <p className="text-yellow font-inter text-[16px] font-medium mt-5">
                        Click to upload{' '}
                        <span className="text-[#292D32]">
                          or drag & drop it here
                        </span>
                      </p>
                      <p className="font-Utile-regular text-[16px] leading-normal text-[#A9ACB4] mt-3">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="img"
                  accept="image/svg+xml, image/png, image/jpeg, image/gif"
                  name="img"
                  className="opacity-0 w-0.1 h-0.1 absolute z-[-1]"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      setFileName(file.name);
                      setFieldValue('img', file);
                    }
                  }}
                />
                <ErrorMessage component="span" name="img" />
              </div>
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 bg-yellow border border-yellow rounded-[8px] font-formular-medium text-[14px] leading-[20px] mt-[40px] mb-[97px] disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AccountSetting;
