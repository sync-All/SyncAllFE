import axios, { AxiosError } from 'axios';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import InputField from '../../InputField';
import * as Yup from 'yup';
import Attach from '../../../assets/images/attachimage.svg';
import { toast } from 'react-toastify';
import VerifyId from '../../../constants/verifyId';
import useLoading from '../../../constants/loading';
import InputField from '../../InputField';
import LoadingAnimation from '../../../constants/loading-animation';

const TvCommercialAds = () => {
  const { id } = useParams<{ id: string }>();
  const idValid = id ? VerifyId(id) : false;
  const [fileName, setFileName] = useState('Click to upload jpeg or png');
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_attachments, setAttachments] = useState<File[]>([]);

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] ';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
  const applyErrorStyles = 'italic text-red-600';

  const validationSchema = Yup.object({
    product: Yup.string().required('Product is required'),
    theme: Yup.string().required('Theme is required'),
    length: Yup.string().required('Length is required'),
    production_budget: Yup.string().required('Production budget is required'),
    air_date: Yup.string()
      .required('Air date is required')
      .matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Date must be in DD/MM/YYYY format'
      ),
    networks: Yup.array()
      .of(Yup.string().required('Network is required'))
      .required('At least one network is required')
      .min(1, 'At least one network or more is required'),
    duration_of_music_usage: Yup.string().required(
      'Duration of music usage is required'
    ),
    intended_usage: Yup.array()
      .of(Yup.string().required('Intended usage is required'))
      .required('At least one intended usage is required')
      .min(1, 'At least one intended usage or more is required'),
    territories: Yup.array()
      .of(Yup.string().required('Territory is required'))
      .required('At least one territory is required')
      .min(1, 'At least one territory or more is required'),
    license_duration: Yup.string().required('License duration is required'),
    media: Yup.string().required('Media format is required'),
    attachments: Yup.mixed().nullable(),
    additional_info: Yup.string(),
    role_type: Yup.string().required('Role type is required'),
    track_info: Yup.string().required('Track information is required'),
  });

  interface ResponseData {
    message?: string;
  }

  const initialValues: FormData = {
    product: '',
    theme: '',
    length: '',
    production_budget: '',
    air_date: null,
    networks: [],
    duration_of_music_usage: '',
    intended_usage: [],
    territories: [],
    license_duration: 'Yearly',
    media: '',
    attachments: null as FileList | null,
    additional_info: '',
    role_type: 'TV Commercial/Ads',
    track_info: id || '',
  };

  interface FormData {
    product: string;
    theme: string;
    length: string;
    production_budget: string;
    air_date: Date | null;
    networks: string[];
    duration_of_music_usage: string;
    intended_usage: string[];
    territories: string[];
    license_duration: string;
    media: string;
    attachments: FileList | null;
    additional_info: string;
    role_type: string;
    track_info: string;
  }

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File[] | null) => void
  ) => {
    const files = event.currentTarget.files;
    if (files) {
      const fileArray = Array.from(files);
      setFileName(fileArray.map((file) => file.name).join(', '));
      setAttachments(fileArray);
      setFieldValue('attachments', fileArray);
    } else {
      setFileName('Click to upload jpeg or png');
      setAttachments([]);
      setFieldValue('attachments', null);
    }
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const handleSubmission = async (
    values: FormData,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    setLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, val]) => {
      if (val !== null) {
        if (key === 'attachments' && Array.isArray(val)) {
          val.forEach((file) => formData.append('attachments', file));
        } else {
          formData.append(
            key,
            typeof val === 'object' ? JSON.stringify(val) : (val as string)
          );
        }
      }
    });

    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/quote-request/tva`;

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await delay(2000);
      await axios.post(apiUrl, formData, config);
      toast.success('Tv commercial/ Ads quote sent successfully');
      await delay(5000);
      handleNavigateBack();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      const errorMessage = (
        axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
      ).toString();

      toast.error(errorMessage);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      {idValid ? (
        <div className="flex items-center justify-center flex-col mt-[80px] mb-[130px]">
          <div>
            <div className="flex gap-[17px] flex-col">
              {' '}
              <h2 className="text-black2 font-formular-bold text-[56px] tracking-[-2.24px] leading-[100%] ">
                TV Commercial <span className="font-Utile-bold">/</span>Ads
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
              {({ setFieldValue }) => (
                <Form className="mt-[60px]">
                  <div className="flex flex-col">
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="product" className={applyLabelStyles}>
                          Product or Service:
                        </label>
                        <Field
                          name="product"
                          type="text"
                          placeholder="Description of the Product or Service"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="product"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="theme" className={applyLabelStyles}>
                          Message or Theme
                        </label>
                        <Field
                          name="theme"
                          type="text"
                          placeholder="Key Message or Theme of the Commercial"
                          className={applyInputStyles}
                        />

                        <ErrorMessage
                          name="theme"
                          component="span"
                          className={applyErrorStyles}
                        />
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
                          placeholder="e.g 10 seconds, 1minute, 3 miuntes"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="length"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="production_budget"
                          className={applyLabelStyles}
                        >
                          Production Budget:
                        </label>
                        <Field
                          name="production_budget"
                          type="text"
                          placeholder="What’s your estimated budget in $"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="production_budget"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="air_date" className={applyLabelStyles}>
                          Air Date:{' '}
                        </label>
                        <Field
                          name="air_date"
                          type="date"
                          placeholder="Planned air date"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="air_date"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label=" Networks:"
                          name="networks"
                          placeholder="Targeted Networks or Channels"
                        />
                        <ErrorMessage
                          name="networks"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="duration_of_music_usage"
                          className={applyLabelStyles}
                        >
                          Duration of Music Usage:
                        </label>
                        <Field
                          name="duration_of_music_usage"
                          type="text"
                          placeholder="Duration of Music Usage with timestamps"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="duration_of_music_usage"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Intended Usage:"
                          name="intended_usage"
                          placeholder="e.g., Background Music, Jingle"
                        />

                        <ErrorMessage
                          name="intended_usage"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label=" Territories:"
                          name="territories"
                          placeholder="Where will the Commercial Will Be Aired"
                        />

                        <ErrorMessage
                          name="territories"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="license_duration"
                          className={applyLabelStyles}
                        >
                          Duration:
                        </label>
                        <Field
                          name="license_duration"
                          disabled
                          type="text"
                          placeholder="e.g., One-time, Perpetual"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="license_duration"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="media" className={applyLabelStyles}>
                          Media:
                        </label>
                        <Field
                          name="media"
                          type="text"
                          placeholder="e.g., Film, TV, Digital"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="media"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <div className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="attachments"
                          className={applyLabelStyles}
                        >
                          Attachments
                        </label>
                        <div className="relative">
                          <label
                            htmlFor="attachments"
                            className="cursor-pointer shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 text-[#98A2B3] leading-4 focus:outline-none focus:shadow-outline font-inter flex justify-between items-center"
                          >
                            <span>{fileName}</span>
                            <img src={Attach} alt="Upload Icon" />
                            <input
                              type="file"
                              id="attachments"
                              name="attachments"
                              className="hidden"
                              multiple
                              onChange={(event) =>
                                handleFileChange(event, setFieldValue)
                              }
                            />
                          </label>
                        </div>
                        <ErrorMessage
                          name="attachments"
                          component="div"
                          className={applyErrorStyles}
                        />
                      </div>
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
                  </div>
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
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <LoadingAnimation />
      )}
    </>
  );
};

export default TvCommercialAds;
