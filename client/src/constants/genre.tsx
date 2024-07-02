import { useState } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

const Genre: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const genres = [
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
    'R & B',
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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="flex gap-[7px] items-center uppercase font-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer group">
        Genre <img src={ArrowDown} alt="Arrow down" />
        {isDropdownOpen && (
          <div className="fixed top-[210px] left-0 w-screen h-[80vh] z-50 overflow-y-auto flex flex-wrap mx-20 bg-white">
            {genres.map((genre, index) => (
              <div key={index} className="w-1/6 p-2">
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
