import { useState } from 'react';
import ArrowDown from '../assets/images/arrow-down.svg';

const Mood = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <div className="flex gap-[7px] items-center uppercase font-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px] cursor-pointer group">
        Mood <img src={ArrowDown} alt="Arrow down" />
        {isDropdownOpen && (
          <div className="fixed bottom-0 lg:top-[210px] left-0 w-screen h-[75vh]  lg:h-[80vh] z-50 overflow-y-auto flex flex-col lg:flex-row lg:flex-wrap px-[44px] lg:px-0 lg:mx-20 bg-white">
            <div className="flex justify-between lg:hidden">
              {' '}
              <h1
                className="font-formular-medium text-[24px] uppercase
            leading-[18.729px] tracking-[0.271px] text-black my-[40px]  "
              >
                Select Mood
              </h1>
            </div>
            {moods.map((mood, index) => (
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
};

export default Mood;
