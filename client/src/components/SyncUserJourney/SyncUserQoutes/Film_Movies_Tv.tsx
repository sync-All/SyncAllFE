import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../InputField';
import { useState } from 'react';
import Attach from '../../../assets/images/attachimage.svg';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import VerifyId from '../../../constants/verifyId';
import useLoading from '../../../constants/loading';
import LoadingAnimation from '../../../constants/loading-animation';

const FilmMoviesTv = () => {
  const [fileName, setFileName] = useState('Click to upload jpeg or png');
  const { id } = useParams<{ id: string }>();
  const idValid = id ? VerifyId(id) : false;
  const { loading, setLoading } = useLoading();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_attachments, setAttachments] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleBackBtn = () => {
    navigate(-1);
  };

   const navigateToPendingLicense = () => {
     navigate('/myAccount?section=Pending%20License');
   };

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] ';
  const applyFormDiv = 'flex flex-col lg:flex-row items-center mb-4 gap-8';
  const applyErrorStyles = 'italic text-red-600';

  interface ResponseData {
    message?: string;
  }

  const validationSchema = Yup.object({
    project_title: Yup.string().required('Project title is required'),
    genre: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one genre is required'),
    project_director: Yup.string().required('Project director is required'),
    project_producer: Yup.string().required('Project producer is required'),
    project_cast: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one cast member is required'),
    production_budget: Yup.string().required('Production budget is required'),
    production_synopsis: Yup.string().required(
      'Production synopsis is required'
    ),
    scene_synopsis: Yup.string().required('Scene synopsis is required'),
    distributor: Yup.string().required('Distributor is required'),
    distribution: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one distribution channel is required'),

    usage: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one usage of the music is required'),
    length: Yup.string().required('Length of the project is required'),
    territories: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one territory is required'),

    media: Yup.array()
      .of(Yup.string())
      .min(1, 'At least one media medium is required'),
    license_duration: Yup.string().required('License duration is required'),
    attachments: Yup.mixed().nullable(),
    additional_info: Yup.string(),
    role_type: Yup.string().required('Role type is required'),
    track_info: Yup.string().required('Track info is required'),
  });

  const initialValues: FormData = {
    project_title: '',
    genre: [],
    project_director: '',
    project_producer: '',
    project_cast: [],
    production_budget: '',
    production_synopsis: '',
    scene_synopsis: '',
    distributor: '',
    distribution: [],
    usage: [],
    length: '',
    territories: [],
    media: [],
    license_duration: '',
    attachments: null as FileList | null,
    additional_info: '',
    role_type: 'Film/Movie/TV Series',
    track_info: id || '',
  };

  interface FormData {
    project_title: string;
    genre: string[];
    project_director: string;
    project_producer: string;
    project_cast: string[];
    production_budget: string;
    production_synopsis: string;
    scene_synopsis: string;
    distributor: string;
    distribution: string[];
    usage: string[];
    length: string;
    territories: string[];
    media: string[];
    license_duration: string;
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
    const apiUrl = `${urlVar}/quote-request/fmt`;

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await delay(2000);
      await axios.post(apiUrl, formData, config);
      toast.success('Sampling quote sent successfully');
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
        <div className="flex items-center justify-center flex-col mx-2.5 mt-[80px] mb-[130px]">
          <div>
            <div className="flex gap-[17px] flex-col">
              {' '}
              <h2 className="text-black2 font-formular-bold text-[56px] tracking-[-2.24px] leading-[100%] ">
                Film <span className="font-Utile-bold">/</span>Movie
                <span className="font-Utile-bold">/</span>TV Series{' '}
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
                          htmlFor="project_title"
                          className={applyLabelStyles}
                        >
                          Project Title:
                        </label>
                        <Field
                          name="project_title"
                          type="text"
                          placeholder="Title of the Film/Movie/TV Series"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="project_title"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Genre:"
                          name="genre"
                          placeholder="e.g., Drama, Comedy, Action"
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
                        <label
                          htmlFor="project_director"
                          className={applyLabelStyles}
                        >
                          Project Director:
                        </label>
                        <Field
                          name="project_director"
                          type="text"
                          placeholder="Director of the Film/Movie/TV Series"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="project_director"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="project_producer"
                          className={applyLabelStyles}
                        >
                          Project Producer:
                        </label>
                        <Field
                          name="project_producer"
                          type="text"
                          placeholder="Name of the producer of your Production"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="project_producer"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label=" Project Cast:"
                          name="project_cast"
                          placeholder="Featured actors in the movie"
                        />

                        <ErrorMessage
                          name="project_cast"
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
                          type="number"
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
                    <div className="flex flex-col justify-center items-center">
                      {' '}
                      <div className="flex flex-col gap-2 mb-8 w-[376px] mx-2.5 lg:mx-0 lg:w-full">
                        <label
                          htmlFor="production_synopsis"
                          className={applyLabelStyles}
                        >
                          Production Synopsis:
                        </label>
                        <Field
                          name="production_synopsis"
                          as="textarea"
                          className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] h-[134px]"
                          placeholder="ie. Brief synopsis of the production."
                        />
                        <ErrorMessage
                          name="production_synopsis"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </div>
                      <div className="flex flex-col gap-2 mb-8 w-[376px] mx-2.5 lg:mx-0 lg:w-full">
                        <label
                          htmlFor="scene_synopsis"
                          className={applyLabelStyles}
                        >
                          Scene Synopsis:
                        </label>
                        <Field
                          name="scene_synopsis"
                          as="textarea"
                          className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] h-[134px]"
                          placeholder="I.e Brief synopsis of the scene that the Master Recording will be used in. Ensure any references to drugs & alcohol are also listed here."
                        />
                        <ErrorMessage
                          name="scene_synopsis"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </div>
                    </div>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="distributor"
                          className={applyLabelStyles}
                        >
                          Distributor:
                        </label>
                        <Field
                          name="distributor"
                          type="text"
                          placeholder="Distributor of the Film/Movie/TV Series"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="distributor"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          name="distribution"
                          label="Distribution:"
                          placeholder="e.g., Theaters, Streaming Services"
                        />

                        <ErrorMessage
                          name="distribution"
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
                        <label htmlFor="length" className={applyLabelStyles}>
                          Length:
                        </label>
                        <Field
                          name="length"
                          type="text"
                          placeholder="e.g 10 seconds, 1 minute, 3 minutes"
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
                        <InputField
                          name="territories"
                          placeholder="Where will the project be distributed?"
                          label="Territories:"
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
                          Duration of the License:
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
                    </span>
                    <span className={applyFormDiv}>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          name="media"
                          placeholder="e.g., Film, TV, Digital"
                          label="Media"
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
                      onClick={handleBackBtn}
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

export default FilmMoviesTv;
