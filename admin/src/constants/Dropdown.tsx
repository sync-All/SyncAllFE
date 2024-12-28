import { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

export interface Option {
  value: string;
  label: string | ReactNode;
}

interface DropdownProps {
  options: Option[];
  defaultValue?: Option;
  onChange?: (option: Option) => void;
  placeholder?: string | ReactNode;
  className?: string;
  disabled?: boolean;
}

const Dropdown = ({
  options,
  defaultValue,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | undefined>(defaultValue);

  const handleSelect = (option: Option) => {
    setSelected(option);
    onChange?.(option);
    setIsOpen(false);
  };

  const renderContent = (content: string | ReactNode) => {
    if (typeof content === 'string') {
      return <span>{content}</span>;
    }
    return content;
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between px-4 py-2 
          text-left bg-white border rounded-md shadow-sm gap-2
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'}
          focus:outline-none focus:ring-2 focus:ring-grey-300
        `}
      >
        <div className={!selected ? 'text-gray-400' : ''}>
          {selected
            ? renderContent(selected.label)
            : renderContent(placeholder)}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full px-4 py-2 text-left 
                ${
                  selected?.value === option.value
                    ? 'bg-[#e0b078]'
                    : 'hover:bg-gray-100'
                }
                first:rounded-t-md last:rounded-b-md
              `}
            >
              {renderContent(option.label)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
