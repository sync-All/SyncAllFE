import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

interface InstrumentProps {
  onSelect: (genre: string) => void;
}

export const genres = [
    'African',
    'African Dancehall',
    'African Reggae',
    'Afrikaans',
    'Alte',
    'Alternative',
    'Alternative Rock',
    'Amapiano',
    'Apala',
    'Awurebe',
    'Latin Jazz',
    'Levant',
    'Levant Pop',
    'Maghreb Pop',
    'Maghreb Rai',
    'Afro House',
    'Afro Soul',
    'Afro-Beat',
    'Afro-Folk',
    'Afro-Pop',
    'Baladas Y Boleros',
    'Big Band',
    'Blues',
    'Bongo Flava Kizomba',
    'Brazilian',
    'Opera',
    'Original Pilipino Music',
    'Pop',
    'Pop Latino',
    'Punk',
    "Children's Music",
    'Chinese',
    'Christian',
    'Comedy',
    'Contemporary Latin',
    'Country',
    'Coupe-Decale',
    'Dance',
    'Dancehall',
    'Easy Listening',
    'Sakara',
    'Singer/Songwriter',
    'Soul',
    'Spoken Word',
    'Educational',
    'Egypt Pop',
    'Electronic',
    'Enka',
    'Environmental Sound',
    'Experimental',
    'Fitness & Workout',
    'Folk',
    'French Pop',
    'Fuji',
    'Marabi',
    'Maskandi',
    'Mbaqanga',
    'Metal',
    'New Age',
    'Gengetone',
    'German Folk',
    'German Pop',
    'Gqom',
    'Highlife',
    'Hip-Hop/Rap',
    'Holiday',
    'Inspirational',
    'Instrumental',
    'Isicathamiya',
    'RnB',
    'Raices',
    'Reggae',
    'Regional Mexicano',
    'Rock',
    'J-Pop',
    'Jazz',
    'Juju',
    'K-Pop',
    'Karaoke',
    'Kayokyoku',
    'Kwaito',
    'Kwela',
    'Langarm',
    'Latin',
    'Vocal',
    'Waka',
    'World',
  ];
  
const Genre: React.FC<InstrumentProps> = ({ onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

 

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
    // <div
    //   className="relative inline-block"
    //   onMouseEnter={() => setIsDropdownOpen(true)}
    //   onMouseLeave={() => setIsDropdownOpen(false)}
    // >
    //   <div className="flex gap-[7px] items-center uppercase font-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer group">
    //     Genre <img src={ArrowDown} alt="Arrow down" />
    //     {isDropdownOpen && (
    //       <div
    //         className="fixed bottom-0 lg:top-[210px] left-0 w-screen h-[75vh]  lg:h-[80vh] z-50 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap lg:px-0 px-[44px] lg:mx-20 bg-white"
    //       >
    //         <div className="flex justify-between lg:hidden">
    //           {' '}
    //           <h1
    //             className="font-formular-medium text-[24px] uppercase
    //         leading-[18.729px] tracking-[0.271px] text-black my-[40px]  "
    //           >
    //             Select Genre
    //           </h1>
    //         </div>

    //         {genres.map((genre, index) => (
    //           <div
    //             key={index}
    //             className="lg:w-1/6 p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize "
    //           >
    //             {genre}
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="inline-block w-full" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer focus:outline-none"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        Genre{' '}
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
                Select genre
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleSelectInstrument(genre)}
                  className="p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize text-left  focus:outline-none focus:ring-2 focus:ring-[#475367]"
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Genre;
