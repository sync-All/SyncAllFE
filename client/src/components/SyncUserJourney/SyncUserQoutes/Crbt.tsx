import VerifyId from '../../../constants/verifyId';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import InputField from '../../InputField';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';
import LoadingAnimation from '../../../constants/loading-animation';
const Crbt = () => {
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
    carrier: Yup.string().required('Carrier is required'),
    target_audience: Yup.string().required('Target audience is required'),
    theme: Yup.string().required('Theme is required'),
    duration: Yup.string().required('Duration is required'),
    distribution: Yup.array()
      .of(Yup.string().required('Distribution channel is required'))
      .min(1, 'At least one distribution channel is required')
      .required('Distribution channels are required'),
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
    carrier: '',
    target_audience: '',
    theme: '',
    duration: '',
    distribution: [],
    territories: [],
    license_duration: '',
    media: '',
    additional_info: '',
    role_type: 'CRBT',
    track_info: id || '', // Assuming this will be populated based on some existing track
  };

  interface ResponseData {
    message?: string;
  }

  interface FormData {
    carrier: string;
    target_audience: string;
    theme: string;
    duration: string;
    distribution: string[];
    territories: string[];
    license_duration: string;
    media: string;
    additional_info: string;
    role_type: string;
    track_info: string;
  }

  const handleNavigateBack = () => {
    navigate(-1);
  };

    const navigateToPendingLicense = () => {
      navigate('/myAccount?section=Pending%20License');
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
    const apiUrl = `${urlVar}/quote-request/crbt`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };
    try {
      await delay(2000);
      await axios.post(apiUrl, value, config);
      toast.success('CRBT quote sent successfully');
      await delay(5000);
      navigateToPendingLicense();
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
                CRBT
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
                      <label htmlFor="carrier" className={applyLabelStyles}>
                        Carrier:
                      </label>
                      <Field
                        name="carrier"
                        type="text"
                        placeholder="Name of the Mobile Carrier Network"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="carrier"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
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
                        placeholder="Target Demographic for the CRBT"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="target_audience"
                        component="span"
                        className={applyErrorStyles}
                      />
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
                        placeholder="Theme or Concept for the CRBT"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="theme"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <label htmlFor="duration" className={applyLabelStyles}>
                        Duration:
                      </label>
                      <Field
                        name="duration"
                        type="text"
                        placeholder="e.g., 30 seconds"
                        className={applyInputStyles}
                      />
                      <ErrorMessage
                        name="duration"
                        component="span"
                        className={applyErrorStyles}
                      />
                    </span>
                  </span>

                  <span className={applyFormDiv}>
                    <span className="w-[367px] flex flex-col gap-2 mb-4">
                      <span className="w-[367px] flex flex-col gap-2 mb-4">
                        <InputField
                          label="Distribution: "
                          name="distribution"
                          placeholder="e.g., Mobile Carrier’s Network Website, App"
                        />

                        <ErrorMessage
                          name="distribution"
                          component="span"
                          className={applyErrorStyles}
                        />
                      </span>
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

export default Crbt;
