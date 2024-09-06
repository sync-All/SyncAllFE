import VerifyId from '../../../constants/verifyId';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import InputField from '../../InputField';

import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';
import LoadingAnimation from '../../../constants/loading-animation';

const SocialMediaContent = () => {
  const { id } = useParams<{ id: string }>();
  const idValid = id ? VerifyId(id) : false;
    const { loading, setLoading } = useLoading();
    const navigate = useNavigate();
  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] ';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
  const applyErrorStyles = 'italic text-red-600';

  const validationSchema = Yup.object().shape({
    platform: Yup.array()
      .of(Yup.string().required('Platform is required'))
      .min(1, 'At least one platform is required')
      .required('Platforms are required'),
    content_type: Yup.array()
      .of(Yup.string().required('Content type is required'))
      .min(1, 'At least one content type is required')
      .required('Content types are required'),
    theme: Yup.string().required('Theme is required'),
    distribution: Yup.array()
      .of(Yup.string().required('Distribution channel is required'))
      .min(1, 'At least one distribution channel is required')
      .required('Distribution channels are required'),
    length: Yup.string().required('Length is required'),
    territories: Yup.array()
      .of(Yup.string().required('Territory is required'))
      .min(1, 'At least one territory is required')
      .required('Territories are required'),
    license_duration: Yup.string().required('License duration is required'),
    media: Yup.string().required('Media file is required'),
    additional_info: Yup.string(),
    role_type: Yup.string().required('Role type is required'),
    track_info: Yup.string().required('Track info is required'),
  });

  const initialValues: FormData = {
    platform: [],
    content_type: [],
    theme: '',
    distribution: [],
    length: '',
    territories: [],
    license_duration: 'Yearly',
    media: '',
    additional_info: '',
    role_type: 'Social Media Content',
    track_info: id || '',
  };

  interface FormData {
    platform: string[];
    content_type: string[];
    theme: string;
    distribution: string[];
    length: string;
    territories: string[];
    license_duration: string;
    media: string;
    additional_info: string;
    role_type: string;
    track_info: string;
  }

    interface ResponseData {
      message?: string;
    }

    const handleNavigateBack = () => {
      navigate(-1);
    };

    function delay(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const handleSubmission = async (
      value: FormData,
      { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
      setLoading(true);
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/quote-request/smc`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };
      try {
        await delay(2000);
        await axios.post(apiUrl, value, config);
        toast.success('Social media content quote sent successfully');
        await delay(5000);
        handleNavigateBack();
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    };

  return (
    <>
      {idValid ? (
        <div className="flex items-center justify-center flex-col mt-[80px] mb-[130px]">
          <div>
            {' '}
            <div className="flex gap-[17px] flex-col">
              {' '}
              <h2 className="text-black2 font-formular-bold text-[56px] tracking-[-2.24px] leading-[100%] ">
                Social Media Content
              </h2>
              <p className="text-[#667185] text-[24px] font-Utile-regular tracking-[-0.96px] leading-[100%] ">
                Fill in the forms below to get your quotes
              </p>
            </div>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={handleSubmission}
            >
              <Form className="mt-[60px]">
                <div className="flex flex-col">
                  <span className={applyFormDiv}>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Platform::"
                          name="platform"
                          placeholder="e.g., TikTok, Instagram, YouTube"
                        />

                        <ErrorMessage
                          name="platform"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Content Type:"
                          name="content_type"
                          placeholder="e.g., Video, Reel, Post"
                        />

                        <ErrorMessage
                          name="content_type"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                  </span>
                  <span className={applyFormDiv}>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <label htmlFor="theme" className={applyLabelStyles}>
                        Theme or Concept:
                      </label>
                      <Field
                        name="theme"
                        type="text"
                        placeholder="Theme or Concept of the Content"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="theme"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Distribution: "
                          name="distribution"
                          placeholder="e.g., Streaming Services"
                        />

                        <ErrorMessage
                          name="distribution"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                  </span>

                  <span className={applyFormDiv}>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <label htmlFor="length" className={applyLabelStyles}>
                        Length:
                      </label>
                      <Field
                        name="length"
                        type="text"
                        placeholder="Duration of Music Usage with timestamps"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="length"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Territories:"
                          name="territories"
                          placeholder="Where the Project Will Be Distributed
"
                        />

                        <ErrorMessage
                          name="territories"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                  </span>
                  <span className={applyFormDiv}>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="license_duration"
                        className={applyLabelStyles}
                      >
                        Duration:
                      </label>
                      <Field
                        name="license_duration"
                        type="text"
                        placeholder="e.g., One-time, Perpetual"
                        disabled
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="license_duration"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <label htmlFor="media" className={applyLabelStyles}>
                        Media:
                      </label>
                      <Field
                        name="media"
                        type="text"
                        placeholder="e.g., Mobile, Digital"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="media"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                  </span>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-col gap-2 mb-16 w-[376px] mx-2.5 lg:mx-0 lg:w-full">
                      <label
                        htmlFor="additional_info"
                        className={applyLabelStyles}
                      >
                        Additional Information:
                      </label>
                      <Field
                        name="additional_info"
                        as="textarea"
                        className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] h-[134px]"
                        placeholder="If any..."
                      />
                      <ErrorMessage
                        name="additional_info"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </div>
                  </div>
                </div>{' '}
                <div className="flex gap-6 lg:justify-end mx-auto items-center mt-12 lg:w-full w-[367px] lg:mx-0">
                  <div
                    className="w-[176px] px-4 py-2.5 border border-black2 rounded-[8px] text-black2 font-formular-medium text-[14px] leading-5 text-center"
                    onClick={handleNavigateBack}
                  >
                    Back
                  </div>
                  <button
                    type="submit"
                    className="w-[176px] px-4 py-2.5 border border-yellow rounded-[8px] text-black2 font-formular-medium text-[14px] leading-5 bg-yellow"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Proceed'}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default SocialMediaContent;
