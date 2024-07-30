// import  { useState } from 'react';
// import ArrowDown from '../assets/images/arrow-down.svg';

// const Instrument = () => {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const instruments = [
//     'Accordian',
//     'Cello',
//     'Electric Guitar',
//     'Iya-Ilu',
//     'Organ',
//     'Sanxian',
//     'Acoustic Guitar',
//     'Clarinet',
//     'Flute',
//     'Mandolin',
//     'Oud',
//     'Sarod',
//     'Banjo',
//     'Congas',
//     'Gangan',
//     'Mbira',
//     'Pedal Steel Guitar',
//     'Saxophone',
//     'Bass Guitar',
//     'Djembe',
//     'Harmonica',
//     'Oboe',
//     'Percussion',
//     'Sitar',
//     'Bata',
//     'Drum Kit',
//     'Harp',
//     'Omele',
//     'Piano',
//     'Steel Drum',
//     'Synthesizer',
//   ];

//   return (
//     <div
//       className="relative inline-block"
//       onMouseEnter={() => setIsDropdownOpen(true)}
//       onMouseLeave={() => setIsDropdownOpen(false)}
//     >
//       <div className="flex gap-[7px] items-center uppercase font-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer group">
//         Instrument <img src={ArrowDown} alt="Arrow down" />
//         {isDropdownOpen && (
//           <div className="fixed bottom-0 lg:top-[210px] left-0 w-screen h-[75vh]  lg:h-[80vh] z-50 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap px-[44px] lg:px-0 lg:mx-20 bg-white">
//             <div className="flex justify-between lg:hidden">
//               {' '}
//               <h1
//                 className="font-formular-medium text-[24px] uppercase
//             leading-[18.729px] tracking-[0.271px] text-black my-[40px]  "
//               >
//                 Select Instrument
//               </h1>
//             </div>
//             {instruments.map((mood, index) => (
//               <div
//                 key={index}
//                 className="lg:w-1/6 p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize "
//               >
//                 {mood}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Instrument;

import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

interface InstrumentProps {
  onSelect: (instrument: string) => void;
}

const Instrument: React.FC<InstrumentProps> = ({ onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const instruments = [
    'Accordion',
    'Cello',
    'Electric Guitar',
    'Iya-Ilu',
    'Organ',
    'Sanxian',
    'Acoustic Guitar',
    'Clarinet',
    'Flute',
    'Mandolin',
    'Oud',
    'Sarod',
    'Banjo',
    'Congas',
    'Gangan',
    'Mbira',
    'Pedal Steel Guitar',
    'Saxophone',
    'Bass Guitar',
    'Djembe',
    'Harmonica',
    'Oboe',
    'Percussion',
    'Sitar',
    'Bata',
    'Drum Kit',
    'Harp',
    'Omele',
    'Piano',
    'Steel Drum',
    'Synthesizer',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectInstrument = (instrument: string) => {
    onSelect(instrument);
    setIsDropdownOpen(false);
  };

  return (
    <div className="inline-block w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        Instrument{' '}
        <img
          src={ArrowDown}
          alt="Toggle dropdown"
          className={`transform transition-transform ${
            isDropdownOpen ? '-rotate-90' : ''
          }`}
        />
      </button>
      {isDropdownOpen && (
        <div className="w-full fixed bottom-0 lg:relative left-0 h-[75vh] lg:h-full z-50 bg-white border border-gray-200 mt-2">
          <div className="p-4 max-h-full overflow-y-auto">
            <div className="flex justify-between lg:hidden">
              <h1
                className="font-formular-medium text-[24px] uppercase
            leading-[18.729px] tracking-[0.271px] text-black my-[40px]"
              >
                Select Instrument
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {instruments.map((instrument) => (
                <button
                  key={instrument}
                  onClick={() => handleSelectInstrument(instrument)}
                  className="p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize text-left  focus:outline-none focus:ring-2 focus:ring-[#475367]"
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instrument;
