import React from 'react';
import ReactModal from 'react-modal';
import { Formik, Form, Field } from 'formik';
import MoneyWallet from '../../assets/images/money-wallet.svg';

interface FormValues {
  amount: string;
  paymentMethod: string;
}

interface WithdrawalModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const initialValues = {
    amount: '',
    paymentMethod: '',
  };

  const onSubmit = (values: FormValues) => {
    console.log(values);
    onRequestClose();
  };

  // const mediaMatch = window.matchMedia('(min-width: 1024px)');
  ReactModal.setAppElement('#root');

  return (
    <div>
      {' '}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            width: '40%',
            maxWidth: '515px',
            padding: '39px 0 39px ',
            marginTop: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 'auto',
            height: 'fit-content',
            borderRadius: '24px',
            backgroundColor: '#FFF',
            zIndex: 300,
          },
          overlay: {
            zIndex: 300,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <div className="pl-[30px]">
          <h2 className="font-Utile-bold text-[40px] text-[#344054] leading-[46px] tracking-[0.497px] ">
            Withdrawal <br /> Method & Details
          </h2>
        </div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="flex mt-[40px] gap-[30px] flex-col">
            <div className="flex flex-col gap-2.5 px-[30px]">
              <label
                htmlFor="amount"
                className=" font-inter text-[17.4px] leading-[19px] tracking-[0.49px]"
              >
                Amount to Withdraw{' '}
              </label>
              <Field
                type="number"
                name="amount"
                id=""
                placeholder="Enter amount to withdraw"
                className="border py-5 pl-5 font-inter text-[19.4px] leading-[19px] tracking-[-0.062px]"
              />
            </div>
            <span className="w-full bg-[#E4E7EC] pl-[42.27px] uppercase py-2 text-[#667185]">
              Payment Method{' '}
            </span>
            <div className="flex flex-col gap-2.5 px-[30px]">
              <label
                htmlFor="paymentMethod"
                className=" font-inter text-[17.4px] leading-[19px] tracking-[0.49px]"
              >
                Select Payment Method
              </label>
              <Field
                as="select"
                name="paymentMethod"
                className="border py-5 pl-5 font-inter text-[19.4px] leading-[19px] tracking-[-0.062px]"
              >
                <option value="">Select</option>
                <option value="bank">Bank Transfer</option>
                <option value="paypal">Paypal</option>
                <option value="flutterwave">Flutterwave</option>
                <option value="paystack">Paystack</option>
              </Field>
            </div>
            <span className="w-full bg-[#E4E7EC] pl-[42.27px] uppercase py-2 text-[#667185]">
              Recipient's bank details
            </span>
            <div className="flex items-center px-[30px] justify-between">
              <span className="flex gap-[18px]">
                <img
                  src={MoneyWallet}
                  alt=""
                  className="p-[9px] rounded-full border"
                />
                <span className="flex flex-col gap-[5px]">
                  <p className="font-formular-regular capitalize text-[17px] text-[#1D2739] leading-[19px] tracking-[0.497px] ">
                    Fidelity Bank Nigeria
                  </p>
                  <p className="font-Utile-regular leading-[19px] tracking-[0.497px] text-[#667185] text-[14px] ">
                    Account ****9876
                  </p>
                </span>
              </span>

              <p className="text-[#335CFF] font-formular-regular text-[17px] leading-[19px] tracking-[0.497px] ">
                Edit
              </p>
            </div>
            <hr />
            <div className="flex px-[30px] gap-[19px]">
              <button
                onClick={onRequestClose}
                className="flex-1 border rounded-[24px] py-[13px] text-[#344054] text-[17px] font-formular-medium leading-[24px] "
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 border rounded-[24px] py-[13px] text-[#344054] text-[17px] font-formular-medium leading-[24px] bg-[#EFA705]"
              >
                Withdraw
              </button>
            </div>
          </Form>
        </Formik>
      </ReactModal>
    </div>
  );
};

export default WithdrawalModal;
