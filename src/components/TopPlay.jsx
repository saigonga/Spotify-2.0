/* eslint-disable import/no-unresolved */
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className={`w-full flex flex-row items-center hover:bg-[#4c426e] ${
    activeSong?.title === song?.title && activeSong?.key === song?.key ? 'bg-[#4c426e]' : 'bg-transparent'
  } py-2 p-4 rounded-lg cursor-pointer mb-2`}>
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img 
        className="w-20 h-20 rounded-lg object-cover" 
        src={song?.images?.coverart || song?.attributes?.artwork?.url || 'https://via.placeholder.com/80x80?text=No+Image'} 
        alt={song?.title || 'Song'}
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
        }}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">
            {song?.title || song?.attributes?.name || 'Unknown Title'}
          </p>
        </Link>
        <Link to={song?.artists?.[0]?.adamid ? `/artists/${song.artists[0].adamid}` : '/top-artists'}>
          <p className="text-base text-gray-300 mt-1">
            {song?.subtitle || song?.artists?.[0]?.name || song?.attributes?.artistName || 'Unknown Artist'}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const topPlays = data?.slice(0, 5);

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {error ? (
            <p className="text-gray-400">Unable to load top charts at the moment</p>
          ) : isFetching ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            topPlays?.map((song, i) => (
              <TopChartCard
                key={`${song?.key}-${i}`}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={() => handlePlayClick(song, i)}
              />
            ))
          )}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {error ? (
            <div className="text-gray-400">Unable to load top artists</div>
          ) : isFetching ? (
            <div className="text-gray-400">Loading...</div>
          ) : (
            topPlays?.slice(0, 5).map((artist, i) => (
              <SwiperSlide
                key={artist?.key}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist?.artists?.[0]?.adamid}`}>
                  <img 
                    src={artist?.images?.background || artist?.images?.coverart || 'https://via.placeholder.com/150x150?text=No+Image'} 
                    alt="Name" 
                    className="rounded-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;