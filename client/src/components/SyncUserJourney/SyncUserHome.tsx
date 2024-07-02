import Search from '../../assets/images/search-1.svg';
import Genre from '../../constants/genre';
import Mood from '../../constants/mood';
import Instrument from '../../constants/instrument';
import Background from '../../assets/images/user-homepage-head.png';
import MusicWave from '../../assets/images/musicwave.svg';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
import AddMusic from '../../assets/images/add-music.svg';
import MusicImg from '../../assets/images/3000x3000.jpg.png';

const SyncUserHome = () => {
  const musicDetails = [
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    {
      musicImg: MusicImg,
      title: 'ORIGINAL REMIX',
      artist: 'GBASKY Feat. MOE...',
      musicWaves: [MusicWave, MusicWave, MusicWave],
      duration: '3:00',
      bpm: '117 BPM',
      genre: 'RnB',
      mood: 'Calm, Uplifting',
      actions: [Favorite, AddMusic, Copy],
    },
    // Add more items here as needed
  ];
  return (
    <div className="px-5 xl:px-20 relative mb-[331px]">
      <section>
        <div className="relative w-full my-24px">
          <input
            type="text"
            placeholder="Search for music, genres, moods, keywords or lyrics"
            className="pl-10 pr-4 py-4 border rounded-lg text-gray-500 text-[16px] font-Utile-medium leading-[21.33px] focus:outline-none focus:bg-[#E4E7EC] w-full"
          />
          <img
            src={Search}
            alt="Search"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
          />
        </div>
        <div className="mt-[32px]">
          <ul className="flex gap-[43px] items-center">
            <li>
              <Genre />
            </li>
            <li className="flex gap-[7px] items-center uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
              <Mood />
            </li>
            <li className="flex gap-[7px] items-center uppercase font-formular-bold text-[14px] text-[#475367] leading-[18.729px] tracking-[0.271px">
              <Instrument />
            </li>
          </ul>
        </div>
        <div className="relative mt-[55px]">
          <span className="w-full">
            <img src={Background} alt="" className="w-full h-[247px] " />
          </span>
          <div className=" flex gap-2 lg:gap-6 flex-col absolute top-0 my-auto xl:my-[57px] xl:ml-[64px]">
            <h2 className="text-[32] lg:text-[64px] xl:leading-[78px] font-gitSans font-normal text-grey-100">
              Explore Our Music Library
            </h2>
            <p className="font-formular-regular text-[16px] xl:text-[24px] xl:leading-[32px] max-w-[550px] text-grey-300">
              Discover, listen, and license authentic african music for your
              projects
            </p>
          </div>
        </div>
      </section>
      <section className="mt-[63px]">
        <h3 className="text-[#27282A] text-[24px] font-formular-bold leading-6 mb-[45px]">
          Browse Songs
        </h3>

        <div className=" flex flex-col gap-[56px]">
          {musicDetails.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between  "
            >
              <span className="flex gap-3">
                <img src={detail.musicImg} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail.title}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail.artist}
                  </p>
                </span>
              </span>
              <div className="flex items-center">
                {detail.musicWaves.map((wave, waveIndex) => (
                  <img key={waveIndex} src={wave} alt="" />
                ))}
              </div>
              <span className="flex gap-12">
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail.duration}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail.bpm}
                  </p>
                </span>
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail.genre}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail.mood}
                  </p>
                </span>
              </span>
              <span className="flex gap-6">
                {detail.actions.map((action, actionIndex) => (
                  <img key={actionIndex} src={action} alt="" />
                ))}{' '}
              </span>
              <span className="gap-[12px] flex">
                <button className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                  View More
                </button>
                <button className="text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]">
                  License
                </button>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SyncUserHome;
