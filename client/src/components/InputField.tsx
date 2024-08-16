import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import InputTextTag from './InputTextTag';
import AddCircle from '../assets/images/AddCircle.svg'

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string
}

const InputField: React.FC<InputFieldProps> = ({ label, name, placeholder }) => {
  const [showSecondaryInput, setShowSecondaryInput] = useState(false);
  const [secondaryInputValue, setSecondaryInputValue] = useState('');
  const { setFieldValue } = useFormikContext<InputFieldProps>();
  const [field, meta] = useField(name);

  const handleAddClick = () => {
    setShowSecondaryInput(true);
  };

  const handleSecondaryInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondaryInputValue(e.target.value);
  };

  const handleSecondaryInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter' && secondaryInputValue.trim() !== '') {
      const newValue = [...(field.value || []), secondaryInputValue.trim()];
      setFieldValue(name, newValue);
      setSecondaryInputValue('');
      setShowSecondaryInput(false);
    }
  };

  const handleRemoveTag = (index: number) => {
    const newValue = [...(field.value || [])];
    newValue.splice(index, 1);
    setFieldValue(name, newValue);
  };

  return (
    <div className="w-full lg:w-[367px] gap-2">
      <label
        className="font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative min-h-12 mt-2 ">
        <div className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-1.5 px-3 text-[#98A2B3] leading-4 focus:outline-none focus:shadow-outline flex flex-wrap gap-2 justify-between font-inter font-normal tracking-[0.4px] text-[16px] overflow-y-scroll">
          <div className="flex gap-2 flex-wrap">
            {(field.value || []).length > 0 ? (
              (field.value || []).map((item: string, index: number) => (
                <InputTextTag
                  key={index}
                  text={item}
                  onRemove={() => handleRemoveTag(index)}
                />
              ))
            ) : (
              <div className='mt-1'>{placeholder}</div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={handleAddClick}
              className=" text-gray-500 ml-2"
            >
              <img src={AddCircle} alt="" />
            </button>
          </div>
        </div>
      </div>
      {showSecondaryInput && (
        <input
          type="text"
          value={secondaryInputValue}
          onChange={handleSecondaryInputChange}
          onKeyPress={handleSecondaryInputKeyPress}
          className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline"
        />
      )}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
