"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaChevronDown, FaHeart } from "react-icons/fa";
import Image from "next/image";

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayChange: (playing: boolean) => void;
}

const playlist = [
  {
    id: 1,
    title: "Earned it ",
    artist: "The Weekend",
    src: "/media/song.mp3",
    cover: "/media/2.jpeg",
  },
  {
    id: 2,
    title: "As You Are",
    artist: "The Weekend",
    src: "/media/As You Are.mp3",
    cover: "/media/8.jpeg",
  },
  {
    id: 3,
    title: "Stand By Me",
    artist: "From me to YOU",
    src: "/media/Stand By Me  Cinematic Orchestral Cover  Emotional.mp3",
    cover: "/media/10.jpeg",
  }
];

export default function AudioPlayer({ isPlaying, onPlayChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const track = playlist[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setHasStarted(true);
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayChange(!isPlaying);
  };

  const nextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentLyric = isPlaying ? "♪ Playing ♪" : "Paused";

  return (
    <>
      <audio
        ref={audioRef}
        src={track.src}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 flex flex-col bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${expanded ? 'w-[calc(100vw-32px)] md:w-80 p-6' : 'w-64 md:w-72 p-3 cursor-pointer hover:bg-[#1a1a1a]/90'}`}
            onClick={() => !expanded && setExpanded(true)}
          >
            {/* Top Bar (Collapse) */}
            {expanded && (
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] text-gray-soft tracking-[0.2em] uppercase font-body">Now Playing</span>
                <button
                  onClick={(e) => { e.stopPropagation(); setExpanded(false); }}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FaChevronDown size={12} className="text-gray-soft" />
                </button>
              </div>
            )}

            <div className={`flex ${expanded ? 'flex-col items-center' : 'items-center gap-4'}`}>

              {/* Album Art */}
              <motion.div
                layoutId="album-art"
                className={`relative overflow-hidden rounded-lg shadow-2xl ${expanded ? 'w-48 h-48 md:w-56 md:h-56 mb-8' : 'w-10 h-10 md:w-12 md:h-12 flex-shrink-0'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-rose/20 z-10" />
                <Image
                  src={track.cover}
                  alt="Album Art"
                  fill
                  sizes="200px"
                  className={`object-cover ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}
                  style={{ borderRadius: expanded ? '16px' : '50%' }}
                />
                {/* Vinyl Hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0a0a0a] rounded-full z-20 border border-white/10 shadow-inner" />
              </motion.div>

              {/* Track Info & Controls Mini */}
              <div className={`flex flex-col ${expanded ? 'w-full text-center mb-6' : 'flex-grow justify-center overflow-hidden'}`}>
                <motion.h4 layoutId="track-title" className={`text-white font-heading truncate ${expanded ? 'text-2xl mb-1' : 'text-sm'}`}>
                  {track.title}
                </motion.h4>
                <motion.p layoutId="track-artist" className={`text-gray-soft font-body truncate ${expanded ? 'text-sm' : 'text-xs'}`}>
                  {track.artist}
                </motion.p>
              </div>

              {/* Mini Controls */}
              {!expanded && (
                <div className="flex items-center gap-3 pr-2">
                  <button onClick={togglePlay} className="text-white hover:text-gold transition-colors">
                    {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                  </button>
                </div>
              )}
            </div>

            {/* Expanded Controls & UI */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full flex flex-col"
                >
                  {/* Progress Bar */}
                  <div className="w-full mb-6">
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer relative group">
                      <div
                        className="h-full bg-gold rounded-full relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)] opacity-0 group-hover:opacity-100 transition-opacity translate-x-1/2" />
                      </div>
                    </div>
                    <div className="flex justify-between w-full mt-2 text-[10px] text-gray-soft font-body font-mono">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main Controls */}
                  <div className="flex items-center justify-center gap-6 md:gap-8 mb-6 md:mb-8">
                    <button onClick={prevTrack} className="text-gray-soft hover:text-white transition-colors p-2">
                      <FaStepBackward size={20} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                    </button>
                    <button onClick={nextTrack} className="text-gray-soft hover:text-white transition-colors p-2">
                      <FaStepForward size={20} />
                    </button>
                  </div>

                  {/* Secondary Controls (Mute & Heart) */}
                  <div className="flex justify-between items-center px-4">
                    <button onClick={toggleMute} className="text-gray-soft hover:text-white transition-colors">
                      {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
                    </button>
                    <button className="text-rose hover:scale-110 transition-transform">
                      <FaHeart size={18} />
                    </button>
                  </div>

                  {/* Lyrics Preview */}
                  <div className="mt-6 md:mt-8 p-4 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-[#1a1a1a] to-transparent z-10" />
                    <p className="text-center text-sm font-letter text-gold/80 italic transition-all duration-300">
                      &ldquo;{currentLyric}&rdquo;
                    </p>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-[#1a1a1a] to-transparent z-10" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
