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
          <div className="fixed top-[210px] left-0 w-screen  z-50 overflow-y-auto flex flex-wrap mx-20 bg-white">
            {instruments.map((mood, index) => (
              <div key={index} className="w-1/6 ">
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
