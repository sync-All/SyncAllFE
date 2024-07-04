import  { useState } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

const Instrument = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const instruments = [
    'Accordian',
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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="flex gap-[7px] items-center uppercase font-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer group">
        Instrument <img src={ArrowDown} alt="Arrow down" />
        {isDropdownOpen && (
          <div className="fixed bottom-0 lg:top-[210px] left-0 w-screen h-[75vh]  lg:h-[80vh] z-50 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap px-[44px] lg:px-0 lg:mx-20 bg-white">
            <div className="flex justify-between lg:hidden">
              {' '}
              <h1
                className="font-formular-medium text-[24px] uppercase
            leading-[18.729px] tracking-[0.271px] text-black my-[40px]  "
              >
                Select Instrument
              </h1>
            </div>
            {instruments.map((mood, index) => (
              <div
                key={index}
                className="lg:w-1/6 p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize "
              >
                {mood}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Instrument;
