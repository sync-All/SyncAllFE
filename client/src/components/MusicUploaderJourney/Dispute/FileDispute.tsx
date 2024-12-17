import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Attach from '../../../assets/images/attachimage.svg';
import DisputeSuccess from './DisputeSuccess';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import useLoading from '../../../constants/loading';

interface FormData {
  nameOfTrack: string;
  issueType: string;
  desc: string;
  supportingDoc: File | null;
}

interface ResponseData {
  message: string;
}

const initialValues: FormData = {
  nameOfTrack: '',
  issueType: '',
  desc: '',
  supportingDoc: null,
};

const FileDispute: React.FC = () => {
  const [isDisputeSuccessModal, setIsDisputeSuccessModal] = useState(false);
  const closeIsDisputeSuccessModal = () => setIsDisputeSuccessModal(false);
  const [fileName, setFileName] = useState('');
  const { loading, setLoading } = useLoading();


  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';

  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';

  const applyFormDiv = 'flex flex-col lg:flex-row mb-4 gap-8';
  const input = 'w-[367px] flex flex-col gap-2 mb-4';
  const applyErrorStyles = 'italic text-red-600';

  // Validation Schema
  const validationSchema = Yup.object().shape({
    nameOfTrack: Yup.string().required('Track name is required'),
    issueType: Yup.string().required('Issue type is required'),
    desc: Yup.string().required('Description is required'),
    supportingDoc: Yup.mixed().required('A document is required'),
  });

   function delay(ms: number) {
     return new Promise((resolve) => setTimeout(resolve, ms));
   }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);

          const token = localStorage.getItem('token');
          const urlVar = import.meta.env.VITE_APP_API_URL;
          const apiUrl = `${urlVar}/dispute/`;
          const config = {
            headers: {
              Authorization: `${token}`,
            },
          };
          try {
            await delay(2000);
            await axios.postForm(apiUrl, values, config);
            toast.success('Dispute filled successfully');
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
          setIsDisputeSuccessModal(true);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="mt-5">
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="nameOfTrack" className={applyLabelStyles}>
                  Name of Track
                </label>
                <Field
                  type="text"
                  name="nameOfTrack"
                  className={applyInputStyles}
                />
                <ErrorMessage
                  name="nameOfTrack"
                  component="div"
                  className={applyErrorStyles}
                />
              </div>
              <div className={input}>
                <label htmlFor="issueType" className={applyLabelStyles}>
                  Issue Type
                </label>
                <Field
                  as="select"
                  name="issueType"
                  className={applyInputStyles}
                >
                  <option value="">Select</option>
                  <option value="Licensing">Licensing</option>
                </Field>
                <ErrorMessage
                  name="issueType"
                  component="div"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <div className={applyFormDiv}>
              <div className={input}>
                <label htmlFor="desc" className={applyLabelStyles}>
                  Description
                </label>
                <Field
                  as="textarea"
                  name="desc"
                  className={`${applyInputStyles} h-[147px]`}
                  placeholder="Describe what the issue is"
                />
                <ErrorMessage
                  name="desc"
                  component="div"
                  className={applyErrorStyles}
                />
              </div>
              <div className={`${input} relative `}>
                <label className={applyLabelStyles}>
                  Upload Supporting Documents{' '}
                </label>
                <label
                  htmlFor="supportingDoc"
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
                        PNG or PDF (max. 5mb)
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
                        PNG or PDF (max. 5mb)
                      </p>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="supportingDoc"
                  accept="image/png, image/gif, application/pdf"
                  name="supportingDoc"
                  required
                  className="opacity-0 w-0.1 h-0.1 absolute z-[-1]"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const file = e.target.files[0];
                      setFileName(file.name);
                      setFieldValue('supportingDoc', file);
                    }
                  }}
                />
                <ErrorMessage
                  component="span"
                  name="supportingDoc"
                  className={applyErrorStyles}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-yellow py-2.5 px-4 border border-yellow rounded-[8px] font-formular-medium text-[14px] leading-5 text-black2"
              disabled={loading}
            >
              {loading ? 'Filing a dispute...' : 'File Dispute'}
            </button>
          </Form>
        )}
      </Formik>
      <DisputeSuccess
        isOpen={isDisputeSuccessModal}
        onClose={closeIsDisputeSuccessModal}
      />
    </div>
  );
};

export default FileDispute;
