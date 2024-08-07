import PlayButton from '../assets/images/playbtn.svg';
import pauseButton from "../assets/pause.svg"
import { useEffect, useRef,RefObject, useState } from 'react';
import WaveSurfer from "wavesurfer.js";

interface PlayerProps {
    trackLink : string | undefined,
    containerStyle ?:  string | undefined,
    buttonStyle ?:  string | undefined,
    timerStyle ?:  string | undefined,
    waveStyle ?: string | undefined,
    duration ?: number | undefined
}

const MusicPlayer:React.FC<PlayerProps>= ({trackLink, containerStyle, buttonStyle, timerStyle, waveStyle, duration}) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const waveformRef:RefObject<HTMLDivElement> = useRef(null)
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  
  const handlePlayPause = () => {
    if (audio) {
      setIsPlaying(!isPlaying);
      wavesurfer?.current?.playPause();
    }
  };

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

  useEffect(()=>{
    if(trackLink){
        const newAudio = new Audio(trackLink)
        setAudio(newAudio)
    }

    if(waveformRef.current){
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        if(trackLink){
          wavesurfer.current.load(trackLink);
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
          if (wavesurfer.current) {
            if(duration){
              const songduration = Math.floor(wavesurfer.current!.getCurrentTime() - minutes * 60);
              if (songduration >= duration) {
                wavesurfer.current!.stop()
                wavesurfer.current!.setTime(0)
                setIsPlaying(false);
              }
            }
          }
        });
  
        wavesurfer.current.on('finish', () => {
          wavesurfer.current!.setTime(0)
          setIsPlaying(false);
        });
        
    }
    return () => wavesurfer?.current?.destroy();
    
  },[trackLink,volume, duration])

  return (
    <div className={containerStyle || " flex items-center justify-between mt-20"}>
      <img src={ isPlaying ? pauseButton : PlayButton} alt="" onClick={handlePlayPause} className={buttonStyle ||'w-12 cursor-pointer'} />
      <div id="waveform" ref={waveformRef} className={waveStyle ||'w-[60%]'}></div>
      <p className={timerStyle || "font-Utile-medium text-[16px] leading-4 "}>{currentTime || '00:00'}</p>
    </div>
  )
}

export default MusicPlayer
