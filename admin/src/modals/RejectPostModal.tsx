import React from 'react';
import axios, { AxiosError } from 'axios';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

Modal.setAppElement('#root');

interface RejectPostModal {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

interface ResponseData {
  message?: string;
}

const RejectPostModal: React.FC<RejectPostModal> = ({
  isOpen,
  onClose,
  contentId,
}) => {
  const validationSchema = Yup.object({
    reason: Yup.string().required('Reason is required'),
  });

  const handleContentReview = async (
    contentId: string,
    action: 'Approved' | 'Rejected',
    reason: string
  ) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/manage_content/review?contentId=${contentId}&actionTaken=${action}&reason=${encodeURIComponent(
      reason
    )}`;
    const config = {
      headers: {
        Authorization: token || '',
      },
      withCredentials: true,
    };

    try {
      await axios.get(apiUrl, config);
      toast.success(`Post ${action} successfully`);
      onClose();
      window.location.reload();
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="border rounded-lg bg-white shadow-xl max-w-[600px] mx-auto mt-20 p-8"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <button
        onClick={onClose}
        className="text-black font-bold w-full text-[24px] hover:text-[32px] transition-all ease-out text-right"
      >
        ×
      </button>
      <div className="rounded-t-lg">
        <h2 className="text-[32px] font-inter font-semibold leading-[120%] tracking-[-0.32px] mt-[7px]">
          Reject Post
        </h2>
        <p className="mt-6 text-base font-inter tracking-[-0.4px] text-[#3A434B]">
          Enter the reason for rejecting this post
        </p>
      </div>
      <Formik
        initialValues={{ reason: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          await handleContentReview(contentId, 'Rejected', values.reason);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-4">
              <Field
                as="textarea"
                name="reason"
                placeholder="Enter reason..."
                className="bg-[#F4F5F6] w-full h-[232px] border border-[#D7DCE0] p-2"
              />
              <ErrorMessage
                name="reason"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
              <div className="flex justify-end mt-[36px]">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-fit bg-[#DE1212] py-[9px] px-[28px] text-white text-[14px] rounded-[4px] font-inter font-medium tracking-[-0.14px]"
                >
                  Reject Post
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RejectPostModal;
