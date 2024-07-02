import React, { useState } from 'react';
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
          <div className="fixed top-[210px] left-0 w-screen h-[80vh] z-50 overflow-y-auto flex flex-wrap mx-20 bg-white">
            {moods.map((mood, index) => (
              <div key={index} className="w-1/6 ">
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
