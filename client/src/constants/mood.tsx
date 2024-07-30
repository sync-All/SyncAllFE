import React, { useState, useRef, useEffect } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

interface MoodProps {
  onSelect: (mood: string) => void;
}

const Mood: React.FC<MoodProps> = ({ onSelect }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


  const moods = [
    'Accomplished',
    'Bizarre',
    'Dark',
    'Horror',
    'Meditation',
    'Romantic',
    'Action',
    'Bouncy',
    'Depressed',
    'Hyper',
    'Mellow',
    'Sad',
    'Adored',
    'Calm',
    'Determined',
    'Inspiring',
    'Military',
    'Scared',
    'Adventure',
    'Cheerful',
    'Feel Good',
    'Intense',
    'Orchestral',
    'Scary',
    'Aerobics',
    'Christian',
    'Flirty',
    'Islamic',
    'Patriotic',
    'Sci-Fi',
    'Aggressive',
    'Comedy',
    'Frantic',
    'Lazy',
    'Peaceful',
    'Sensual',
    'Angry',
    'Confident',
    'Gentle',
    'Lifestyle',
    'Rebellious',
    'Sexy',
    'Annoyed',
    'Crazy',
    'Gloomy',
    'Lonely',
    'Relaxation',
    'Silly',
    'Anxious',
    'Crime',
    'Grateful',
    'Loved',
    'Relaxed',
    'Soulful',
    'Arabic',
    'Crunk',
    'Happy',
    'Magical',
    'Religious',
    'Sports',
    'Workout',
    'Wedding',
    'Uplifting',
    'Thriller',
    'Suspense',
    'Strange',
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

  const handleSelectMood = (mood: string) => {
    onSelect(mood);
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
        Mood{' '}
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
                Select Mood
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleSelectMood(mood)}
                  className="p-2 text-[14px] font-formular-regular leading-[18.729px] tracking-[0.271px] text-[#475367] capitalize text-left  focus:outline-none focus:ring-2 focus:ring-[#475367]"
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mood;
