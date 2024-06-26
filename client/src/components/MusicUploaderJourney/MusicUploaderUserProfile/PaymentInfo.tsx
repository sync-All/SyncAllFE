import { Formik, Form, ErrorMessage, Field } from 'formik';
import { COUNTRIES } from '../../../constants/countries';
import * as yup from 'yup';

interface FormData {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankAddress: string;
  country: string;
  code: string;
  sortCode: number;
}

const initialValues: FormData = {
  accountName: '',
  accountNumber: '',
  bankName: '',
  bankAddress: '',
  country: '',
  code: '',
  sortCode: 0,
};

const validateForm = yup.object().shape({
  accountName: yup.string().required('Account name is required'),
  accountNumber: yup.string().required('Account number is required'),
  bankName: yup.string().required('Bank name is required'),
  bankAddress: yup.string().required('Bank address is required'),
  country: yup.string().required('Country is required'),
  code: yup.string().required('Swift/BIC code is required'),
  sortCode: yup.number().required('Sort code is required'),
});

const PaymentInfo = () => {
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
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="accountName" className={applyLabelStyles}>
                  Account Name
                </label>
                <Field
                  type="text"
                  className={applyInputStyles}
                  name="accountName"
                />
                <ErrorMessage
                  name="accountName"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
              <div className={input}>
                <label htmlFor="accountNumber" className={applyLabelStyles}>
                  Account Number
                </label>
                <Field
                  type="text"
                  name="accountNumber"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="accountNumber"
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
                <label htmlFor="code" className={applyLabelStyles}>
                  Swift/BIC Code
                </label>
                <Field type="text" name="code" className={applyInputStyles} />
                <ErrorMessage
                  name="code"
                  component="span"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <div className={input}>
              <label htmlFor="sortCode" className={applyLabelStyles}>
                Sort Code
              </label>
              <Field
                type="number"
                name="sortCode"
                className={applyInputStyles}
              />
              <ErrorMessage
                name="sortCode"
                component="span"
                className={applyErrorStyles}
              />
            </div>
            <div>
              <button
                type="submit"
                className="py-2.5 px-4 bg-yellow border border-yellow rounded-[8px] font-formular-medium text-[14px] leading-[20px] mt-[40px] mb-[97px]"
              >
                Update Payment Information
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaymentInfo;