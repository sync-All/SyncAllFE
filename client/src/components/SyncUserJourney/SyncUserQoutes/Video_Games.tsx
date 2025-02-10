import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { ErrorMessage, Form, Field, Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Attach from '../../../assets/images/attachimage.svg';
import InputField from '../../InputField';
import VerifyId from '../../../constants/verifyId';
import useLoading from '../../../constants/loading';
import LoadingAnimation from '../../../constants/loading-animation';

const VideoGames = () => {
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
    game_title: Yup.string().required('Game title is required'),
    genre: Yup.array()
      .of(Yup.string())
      .required('Genre is required')
      .min(1, 'At least one genre is required'),
    platform: Yup.string().required('Platform is required'),
    release_date: Yup.string()
      .required('Release date is required')
      .matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Date must be in DD/MM/YYYY format'
      ),
    target_audience: Yup.string().required('Target audience is required'),
    length: Yup.string().required('Length is required'),
    development_stage: Yup.string().required('Development stage is required'),
    territories: Yup.array()
      .of(Yup.string())
      .required('Territory is required')
      .min(1, 'At least one territory is required'),
    usage: Yup.array()
      .of(Yup.string())
      .required('Usage is required')
      .min(1, 'At least one usage is required'),
    media_format: Yup.string().required('Media format is required'),
    license_duration: Yup.string().required('License duration is required'),
    attachments: Yup.mixed().nullable(),
    additional_info: Yup.string(),
    role_type: Yup.string().required('Role type is required'),
    track_info: Yup.string().required('Track information is required'),
    budget: Yup.string().required('License budget is required'),
  });

  interface ResponseData {
    message?: string;
  }

  const initialValues: FormData = {
    game_title: '',
    genre: [],
    platform: '',
    release_date: null,
    target_audience: '',
    length: '',
    development_stage: '',
    territories: [],
    usage: [],
    media_format: '',
    license_duration: '',
    attachments: null,
    additional_info: '',
    role_type: 'Video Games',
    track_info: id || '',
    budget: '',
  };

  interface FormData {
    game_title: string;
    genre: string[];
    platform: string;
    release_date: Date | null;
    target_audience: string;
    length: string;
    development_stage: string;
    territories: string[];
    usage: string[];
    media_format: string;
    license_duration: string;
    attachments: File | null;
    additional_info: string;
    role_type: string;
    track_info: string;
    budget: string;
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

  const navigateToPendingLicense = () => {
    navigate('/myAccount?section=Pending%20License');
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
    const apiUrl = `${urlVar}/quote-request/video_game`;

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await delay(2000);
      await axios.post(apiUrl, formData, config);
      toast.success('Video game quote sent successfully');
      await delay(5000);
      navigateToPendingLicense();
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
                Video Games
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
                        <label
                          htmlFor="game_title"
                          className={applyLabelStyles}
                        >
                          Game Title:
                        </label>
                        <Field
                          name="game_title"
                          type="text"
                          placeholder="Title of the game"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="game_title"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Genre:"
                          name="genre"
                          placeholder="e.g., RPG, Action, Adventure"
                        />

                        <ErrorMessage
                          name="genre"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="platform" className={applyLabelStyles}>
                          Platform:
                        </label>
                        <Field
                          name="platform"
                          type="text"
                          placeholder="E.g Pc, Console, Mobile"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="platform"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="release_date"
                          className={applyLabelStyles}
                        >
                          Release Date:
                        </label>
                        <Field
                          name="release_date"
                          type="date"
                          placeholder="Planned Release Date"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="release_date"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="target_audience"
                          className={applyLabelStyles}
                        >
                          Target Audience:
                        </label>
                        <Field
                          name="target_audience"
                          type="text"
                          placeholder="Target Age Group, Demographics"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="target_audience"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
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
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="development_stage"
                          className={applyLabelStyles}
                        >
                          Development Stage:{' '}
                        </label>
                        <Field
                          name="development_stage"
                          type="text"
                          placeholder="e.g., Pre-production, Development, Testing)"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="development_stage"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Territories:"
                          name="territories"
                          placeholder="Where the Project Will Be Distributed"
                        />

                        <ErrorMessage
                          name="territories"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          name="usage"
                          label="Usage:"
                          placeholder="Main Theme, Background Music"
                        />
                        <ErrorMessage
                          name="usage"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="media_format"
                          className={applyLabelStyles}
                        >
                          Media Formats:
                        </label>
                        <Field
                          name="media_format"
                          type="text"
                          placeholder="e.g., Video Game, Digital"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="media_format"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="license_duration"
                          className={applyLabelStyles}
                        >
                          License Duration:
                        </label>
                        <Field
                          name="license_duration"
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
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label htmlFor="budget" className={applyLabelStyles}>
                          License Budget:
                        </label>
                        <Field
                          name="budget"
                          type="number"
                          placeholder="What's your license budget in $"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="budget"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 mb-16">
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

export default VideoGames;
