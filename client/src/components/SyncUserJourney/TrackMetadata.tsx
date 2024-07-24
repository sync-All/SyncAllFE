import Background from '../../assets/images/user-homepage-head.png';
import Favorite from '../../assets/images/favorite.svg';
import Copy from '../../assets/images/copy-link.svg';
import AddMusic from '../../assets/images/add-music.svg';
import PlayButton from '../../assets/images/playbtn.svg';
import pauseButton from "../../assets/pause.svg"
import { useParams } from 'react-router-dom';
import { useEffect, useRef,RefObject, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import WaveSurfer from "wavesurfer.js";

const TrackMetadata = () => {
  const { id } = useParams();
  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef:RefObject<HTMLDivElement> = useRef(null)
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  interface ResponseData {
    message?: string;
  }

  interface TrackDetails {
    _id: string;
    trackTitle: string;
    mainArtist: string;
    genre: string;
    mood: string[];
    releaseDate: string;
    countryOfRecording: string;
    countryOfRelease: string;
    lyrics: string;
    trackLink: string;
    artWork: string;
    audioLang: string;
    claimBasis: string;
    claimingUser: string;
    composers: string[];
    copyrightName: string;
    copyrightYear: number;
    createdAt: string;
    earnings: number;
    explicitCont: boolean;
    featuredArtist: string[];
    featuredInstrument: string[];
    isrc: string;
    percentClaim: number;
    producers: string[];
    publishers: string[];
    recordingDate: string;
    recordingVersion: string;
    releaseDesc: string;
    releaseLabel: string;
    releaseTitle: string;
    releaseType: string;
    role: string;
    tag: string[];
    upc: number;
    updatedAt: string;
    uploadStatus: string;
    user: string;
    writers: string[];
  }

  useEffect(() => {
    const fetchTrackDetails = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/allSongs`; // Endpoint to fetch all tracks
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        const res = await axios.get(apiUrl, config);
        const allTracks: TrackDetails[] = res.data.allTracks;
        const track = allTracks.find((track) => track._id === id);
        if (track) {
          console.log(track)
          setTrackDetails(track);
          const newAudio = new Audio(track?.trackLink)
          setAudio(newAudio)
        } else {
          toast.error('Track not found');
        }
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      }
    };
    fetchTrackDetails();
  }, [id]);

  const formWaveSurferOptions = (ref:HTMLElement | string) => ({
    container: ref,
    waveColor: "#98A2B3",
    progressColor: "#013131",
    cursorColor: "#013131",
    barWidth: 2,
    barRadius: 5,
    responsive: true,
    height: 40,
    // If true, normalize by the maximum peak instead of 1.0.
    normalize: true,
    // Use the PeakCache to improve rendering speed of large waveforms.
    partialRender: true
  });

  useEffect(() => {
    if(waveformRef.current){
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      if(trackDetails?.trackLink){
        wavesurfer.current.load(trackDetails.trackLink);
      }
      wavesurfer.current.on("ready", function() {
        if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume);
          setVolume(volume);
        }
      })

      wavesurfer.current.on('audioprocess', () => {
        const minutes = Math.floor(wavesurfer.current!.getCurrentTime() / 60);
        const seconds = Math.floor(wavesurfer.current!.getCurrentTime() - minutes * 60);
        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setCurrentTime(formattedTime);
      });

      wavesurfer.current.on('finish', () => {
        wavesurfer.current!.setTime(0)
        setIsPlaying(false);
      });
      
    }

    

      return () => wavesurfer?.current?.destroy();
    },[trackDetails,volume]);

  const handlePlayPause = () => {
    if (audio) {
      setIsPlaying(!isPlaying);
      wavesurfer?.current?.playPause();
    }
  };

  
  console.log(currentTime)
  // console.log(wavesurfer.current?.getCurrentTime())

  
  return (
    <div> 
      <div className="flex flex-col lg:flex-row lg:gap-16 mx-5 lg:mx-20">
        <div className="lg:w-[40%]">
          <img
            src={trackDetails?.artWork || Background}
            alt=""
            className="w-full h-[412px] object-cover"
          />
        </div>
        <div className="flex flex-col mt-11 lg:mt-0 lg:w-[60%]">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex flex-col gap-2 lg:gap-4 w-full">
              <p className="text-[#475367] text-[32px] lg:text-[56px] font-formular-bold ">
                {trackDetails?.trackTitle || 'No Title Available'}
              </p>
              <p className="text-[#667185] text-[16px] lg:text-[24px] font-Utile-regular  ">
                {trackDetails?.mainArtist}
              </p>
            </div>

            <div className="flex mt-[27px] gap-[25px] items-center lg:items-start ">
              <img src={Favorite} alt="" />
              <img src={AddMusic} alt="" />
              <img src={Copy} alt="" />
              <button className="w-fit lg:min-w-fit text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px] lg:w-full">
                Get Quote
              </button>
            </div>
          </div>

          <div className=" flex items-center justify-between mt-20">
            <img src={ isPlaying ? pauseButton : PlayButton} alt="" onClick={handlePlayPause} className='w-12 cursor-pointer' />
            <div id="waveform" ref={waveformRef} className='w-[60%]'></div>
            <p className="font-Utile-medium text-[16px] leading-4 ">{currentTime || '00:00'}</p>
          </div>
          <div className="mt-[93px] mb-[163px]">
            <h4 className="font-formular-regular text-[24px] leading-6 text-[#344054] mb-2 ">
              Track Details
            </h4>
            <hr />
            <div className="mt-6 flex flex-col lg:flex-row gap-8 lg:gap-10 justify-between ">
              <div className="flex flex-col gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Genre</p>
                  <p className="text-[#475367]">
                    {trackDetails?.genre || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Composed by</p>
                  <p className="text-[#475367]">
                    {trackDetails?.composers.join(', ') || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Duration</p>
                  <p className="text-[#475367]">3 minutes, 33 seconds</p>
                </span>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Mood</p>
                  <p className="text-[#475367]">
                    {trackDetails?.mood.join(', ') || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Produced by</p>
                  <p className="text-[#475367]">
                    {trackDetails?.producers.join(', ') || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release Label</p>
                  <p className="text-[#475367]">
                    {trackDetails?.releaseLabel || 'N/A'}
                  </p>
                </span>
              </div>
              <div className="flex  flex-col justify-between gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Tempo</p>
                  <p className="text-[#475367]">128 BPM</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release date</p>
                  <p className="text-[#475367]">
                    {trackDetails?.releaseDate || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Featured Instrument</p>
                  <p className="text-[#475367]">
                    {trackDetails?.featuredInstrument.join(', ') || 'N/A'}
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMetadata;
