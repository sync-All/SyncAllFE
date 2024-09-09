import VerifyId from '../../../constants/verifyId';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import InputField from '../../InputField';
import { useState } from 'react';
import Attach from '../../../assets/images/attachimage.svg';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';
import LoadingAnimation from '../../../constants/loading-animation';

const Interpolation = () => {
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

  const validationSchema = Yup.object().shape({
    project_title: Yup.string().required('Project title is required'),
    genre: Yup.array()
      .of(Yup.string().required('Genre is required'))
      .required('At least one genre or group is required')
      .min(1, 'At least one genre or group is required'),
    artists_or_group: Yup.array()
      .of(Yup.string().required('Artist or group is required'))
      .required('At least one artist or group is required')
      .min(1, 'At least one artist or group is required'),
    release_date: Yup.string()
      .required('Release date is required')
      .matches(
        /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
        'Date must be in DD/MM/YYYY format'
      ),
    distribution_channels: Yup.array()
      .of(Yup.string().required('Distribution channel is required'))
      .required('At least one distribution channel is required')
      .min(1, 'At least one distribution channel or group is required'),
    original_song: Yup.string().required('Original song title is required'),
    artist_name: Yup.string().required('Artist name is required'),
    portion_to_be_sampled: Yup.string().required(
      'Portion to be sampled is required'
    ),
    intended_usage: Yup.array()
      .of(Yup.string().required('Intended usage is required'))
      .required('At least one intended usage is required')
      .min(1, 'At least one intended usage or group is required'),
    territories: Yup.array()
      .of(Yup.string().required('Territory is required'))
      .required('At least one territory is required')
      .min(1, 'At least one territory or more is required'),
    license_duration: Yup.string().required('License duration is required'),
    media_formats: Yup.array()
      .of(Yup.string().required('Media format is required'))
      .required('At least one media format is required')
      .min(1, 'At least one media or more is required'),
    samples_of_other_songs: Yup.string().required(
      'Samples of other songs is required'
    ),
    additional_info: Yup.string(),
    attachments: Yup.mixed().nullable(),
    role_type: Yup.string().required('Role type is required'),
    track_info: Yup.string().required('Track info is required'),
  });

  const initialValues: FormData = {
    project_title: '',
    genre: [],
    artists_or_group: [],
    release_date: new Date(),
    distribution_channels: [],
    original_song: '',
    artist_name: '',
    portion_to_be_sampled: '',
    intended_usage: [],
    territories: [],
    license_duration: 'Yearly',
    media_formats: [],
    samples_of_other_songs: '',
    additional_info: '',
    attachments: null as File[] | null,
    role_type: 'Interpolation',
    track_info: id || '',
  };

  interface FormData {
    project_title: string;
    genre: string[];
    artists_or_group: string[];
    release_date: Date;
    distribution_channels: string[];
    original_song: string;
    artist_name: string;
    portion_to_be_sampled: string;
    intended_usage: string[];
    territories: string[];
    license_duration: string;
    media_formats: string[];
    samples_of_other_songs: string;
    additional_info?: string;
    attachments: File[] | null;
    role_type: string;
    track_info: string;
  }

  interface ResponseData {
    message?: string;
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
    const apiUrl = `${urlVar}/quote-request/interpolation`;

    const config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      await delay(2000);
      await axios.post(apiUrl, formData, config);
      toast.success('Interpolation quote sent successfully');
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
                Interpolation
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
                      {' '}
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Artist or Group:"
                          name="artists_or_group"
                          placeholder="Name of the Artist or Group"
                        />

                        <ErrorMessage
                          name="artists_or_group"
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
                      {' '}
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="artist_name"
                          className={applyLabelStyles}
                        >
                          Artist Name:
                        </label>
                        <Field
                          className={applyInputStyles}
                          name="artist_name"
                          type="text"
                          placeholder="Artist name of the Original Song"
                        />

                        <ErrorMessage
                          name="artist_name"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <label
                          htmlFor="original_song"
                          className={applyLabelStyles}
                        >
                          Original Song:
                        </label>
                        <Field
                          name="original_song"
                          type="text"
                          placeholder="Title of the Original Song"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="original_song"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="portion_to_be_sampled"
                        className={applyLabelStyles}
                      >
                        Portion to Be Sampled:
                      </label>
                      <Field
                        name="portion_to_be_sampled"
                        as="textarea"
                        className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] h-[134px]"
                        placeholder="Brief description of original work within the new work, giving time stamps of where the use first appears in each"
                      />
                      <ErrorMessage
                        name="portion_to_be_sampled"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </div>
                    <span className={applyFormDiv}>
                      {' '}
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Intended Usage:"
                          name="intended_usage"
                          placeholder="e.g., Hook, Verse, Bridge"
                        />

                        <ErrorMessage
                          name="intended_usage"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Territories: "
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
                        <label
                          htmlFor="license_duration"
                          className={applyLabelStyles}
                        >
                          License Duration:
                        </label>
                        <Field
                          name="license_duration"
                          type="text"
                          disabled
                          placeholder="e.g., One-time, Perpetual"
                          className={applyInputStyles}
                        />
                        <ErrorMessage
                          name="license_duration"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Media Formats:"
                          name="media_formats"
                          placeholder="e.g., Digital, Physical"
                        />

                        <ErrorMessage
                          name="media_formats"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 mb-4">
                      <label
                        htmlFor="samples_of_other_songs"
                        className={applyLabelStyles}
                      >
                        Does this contain any other uses or samples of songs?
                      </label>
                      <Field
                        name="samples_of_other_songs"
                        as="textarea"
                        className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px] h-[134px]"
                        placeholder="If yes, please provide details; if not, please answer ‘NO’."
                      />
                      <ErrorMessage
                        name="samples_of_other_songs"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
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
                    <span className={applyFormDiv}>
                      {' '}
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Distribution Channels: "
                          name="distribution_channels"
                          placeholder="e.g., Streaming Services, Physical Copies"
                        />

                        <ErrorMessage
                          name="distribution_channels"
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

export default Interpolation;
