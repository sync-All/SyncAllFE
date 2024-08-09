import { Formik, Form, ErrorMessage, Field } from 'formik';
import { COUNTRIES } from '../../../constants/countries';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useDataContext } from '../../../Context/DashboardDataProvider';
import useLoading from '../../../constants/loading';

interface FormData {
  accName: string;
  accNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  code: string;
  bicCode: string;
}

interface ResponseData {
  message?: string;
}

const PaymentInfo = () => {
  const paymentInfo = useDataContext();
  const { loading, setLoading } = useLoading();
  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const refreshPage = () => {
    window.location.reload();
  };

  const paymentDetails = Array.isArray(
    paymentInfo.dashboardData?.dashboardDetails?.earnings
  )
    ? paymentInfo.dashboardData.dashboardDetails.earnings[0]
    : {};

  const initialValues: FormData = {
    accName: paymentDetails?.accName ?? '',
    accNumber: paymentDetails?.accNumber ?? '',
    bankName: paymentDetails?.bankName ?? '',
    bankAddress: paymentDetails?.bankAddress ?? '',
    country: paymentDetails?.country ?? '',
    code: paymentDetails?.sortCode ?? '',
    bicCode: paymentDetails?.bicCode ?? '',
  };

  const validateForm = yup.object().shape({
    accName: yup.string().required('Account name is required'),
    accNumber: yup.string().required('Account number is required'),
    bankName: yup.string().required('Bank name is required'),
    bankAddress: yup.string().required('Bank address is required'),
    country: yup.string().required('Country is required'),
    bicCode: yup.string().required('Swift/BIC code is required'),
    code: yup.number().required('Sort code is required'),
  });

  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';
  const applyErrorStyles = 'italic text-red-600';

  return (
    <div className="lg:mx-8 ml-5 mt-[26px]">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="poppins-semibold text-[24px] text-[#1d2739]">
          Payment Information
        </h2>
        <p className="text-[#98A2B3] font-Utile-regular text-[14px]">
          Please provide the correct account you’d like to receive payment
        </p>
      </div>
      <Formik
        validationSchema={validateForm}
        initialValues={initialValues || ''}
        onSubmit={async (values) => {
          setLoading(true);
          const token = localStorage.getItem('token');
          const urlVar = import.meta.env.VITE_APP_API_URL;
          const apiUrl = `${urlVar}/updatepaymentinfo/`;
          const config = {
            headers: {
              Authorization: `${token}`,
            },
          };

          try {
            await delay(2000);
            await axios.post(apiUrl, values, config);
            toast.success('Payment Information Updated successful');
            refreshPage();
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
        {() => (
          <Form>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="accName" className={applyLabelStyles}>
                  Account Name
                </label>
                <Field
                  type="text"
                  className={applyInputStyles}
                  name="accName"
                />
                <ErrorMessage
                  name="accName"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
              <div className={input}>
                <label htmlFor="accNumber" className={applyLabelStyles}>
                  Account Number
                </label>
                <Field
                  type="text"
                  name="accNumber"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="accNumber"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="bankName" className={applyLabelStyles}>
                  Bank Name
                </label>
                <Field
                  type="text"
                  name="bankName"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="bankName"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
              <div className={input}>
                <label htmlFor="bankAddress" className={applyLabelStyles}>
                  Bank Address
                </label>
                <Field
                  type="text"
                  name="bankAddress"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="bankAddress"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="country" className={applyLabelStyles}>
                  Country
                </label>
                <Field name="country" as="select" className={applyInputStyles}>
                  <option value="">Select country</option>
                  {COUNTRIES.map((country) => (
                    <option value={country} key={country}>
                      {country}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="country"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
              <div className={input}>
                <label htmlFor="bicCode" className={applyLabelStyles}>
                  Swift/BIC Code
                </label>
                <Field
                  type="text"
                  name="bicCode"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="bicCode"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <div className={input}>
              <label htmlFor="code" className={applyLabelStyles}>
                Sort Code
              </label>
              <Field type="number" name="code" className={applyInputStyles} />
              <ErrorMessage
                name="code"
                component="span"
                className={applyErrorStyles}
              />
            </div>
            <div>
              <button
                type="submit"
                className="py-2.5 px-4 bg-yellow border border-yellow rounded-[8px] font-formular-medium text-[14px] leading-[20px] mt-[40px] mb-[97px]"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Payment Information'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentInfo;
