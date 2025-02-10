import React, { useState } from 'react';
import { useField, useFormikContext } from 'formik';
import InputTextTag from './InputTextTag';
import { Plus } from 'lucide-react';

interface InputFieldProps {
  label: string;
  name: string;
  placeholder: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  placeholder,
}) => {
  const [showSecondaryInput, setShowSecondaryInput] = useState(false);
  const [secondaryInputValue, setSecondaryInputValue] = useState('');
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

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
    if (e.key === 'Enter') {
      const trimmedValue = secondaryInputValue.trim();
      if (trimmedValue !== '') {
        const currentValues = Array.isArray(field.value) ? field.value : [];
        const newValue = [...currentValues, trimmedValue];
        setFieldValue(name, newValue);
        setSecondaryInputValue('');
        setShowSecondaryInput(false);
      }
    } else if (e.key === 'Escape') {
      setSecondaryInputValue('');
      setShowSecondaryInput(false);
    }
  };

  const handleRemoveTag = (index: number) => {
    const currentValues = Array.isArray(field.value) ? field.value : [];
    const newValue = [...currentValues];
    newValue.splice(index, 1);
    setFieldValue(name, newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div  className="shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-1.5 px-3 text-[#98A2B3] leading-4 focus:outline-none focus:shadow-outline flex flex-wrap gap-2 justify-between font-inter font-normal tracking-[0.4px] text-[16px] overflow-y-scroll">
        
        {Array.isArray(field.value) && field.value.length > 0 ? (
          field.value.map((item: string, index: number) => (
            <InputTextTag
              key={`${item}-${index}`}
              text={item}
              onRemove={() => handleRemoveTag(index)}
            />
          ))
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}

        {!showSecondaryInput && (
          <button
            type="button"
            onClick={handleAddClick}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {showSecondaryInput && (
        <input
          type="text"
          value={secondaryInputValue}
          onChange={handleSecondaryInputChange}
          onKeyDown={handleSecondaryInputKeyPress}
          className="mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
          placeholder="Type and press Enter to add"
          autoFocus
        />
      )}
    </div>
  );
};

export default InputField;
