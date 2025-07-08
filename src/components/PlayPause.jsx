import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => {
  // More specific comparison to ensure only the exact same song shows as playing
  const isCurrentSongPlaying = isPlaying && 
    activeSong?.title === song?.title && 
    activeSong?.key === song?.key;

  return isCurrentSongPlaying ? (
    <FaPauseCircle
      size={35}
      className="text-gray-300 hover:text-white cursor-pointer"
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle
      size={35}
      className="text-gray-300 hover:text-white cursor-pointer"
      onClick={handlePlay}
    />
  );
};

export default PlayPause;