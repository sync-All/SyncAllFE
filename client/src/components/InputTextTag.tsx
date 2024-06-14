import React from 'react';

interface InputTextTagProps {
  text: string;
  onRemove: () => void;
}

const InputTextTag: React.FC<InputTextTagProps> = ({ text, onRemove }) => {
  return (
    <div className="inline-flex items-center text-[#3A434B] bg-[#FFF6E1] font-medium px-2.5 py-0.5 rounded-[20px]">
      {text}
      <button
        type="button"
        className="ml-2 text-blue-800 hover:text-blue-900"
        onClick={onRemove}
      >
        &times;
      </button>
    </div>
  );
};

export default InputTextTag;
