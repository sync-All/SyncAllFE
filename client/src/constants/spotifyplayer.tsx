import React from 'react';
import Play from '../assets/images/AddCircle.svg';
import Pause from '../assets/images/Cash Out.svg';

interface SpotifyPlayerProps {
  trackId: string;
  waveImageUrl: string;
  trackUrl: string | null;
  isPlaying: boolean;
  onPlayPause: (id: string) => void;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({
  trackId,
  waveImageUrl,
  trackUrl,
  isPlaying,
  onPlayPause,
}) => {
  return (
    <div className="flex items-center">
      <img
        src={waveImageUrl}
        alt="Music Wave"
        onClick={() => onPlayPause(trackId)}
        className="cursor-pointer"
      />
      {isPlaying ? (
        <img
          src={Pause}
          alt="Pause"
          onClick={() => onPlayPause(trackId)}
          className="cursor-pointer"
        />
      ) : (
        <img
          src={Play}
          alt="Play"
          onClick={() => onPlayPause(trackId)}
          className="cursor-pointer"
        />
      )}
      {isPlaying && trackUrl && (
        <iframe
          src={trackUrl}
          width="300"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      )}
    </div>
  );
};

export default SpotifyPlayer;
