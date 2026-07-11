"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaStepForward, FaStepBackward, FaChevronUp, FaChevronDown, FaHeart } from "react-icons/fa";
import Image from "next/image";

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayChange: (playing: boolean) => void;
}

const lyrics = [
  { time: 0, text: "♪ Instrumental ♪" },
  { time: 2, text: "I'ma care for you" },
  { time: 9, text: "I'ma care for you, you, you, you" },
  { time: 20, text: "♪ Instrumental ♪" },
  { time: 38, text: "You make it look like it's magic (Oh, yeah)" },
  { time: 43, text: "'Cause I see nobody, nobody but you, you, you" },
  { time: 51, text: "I'm never confused" },
  { time: 53, text: "Hey, hey" },
  { time: 56, text: "And I'm so used to bein' used" },
  { time: 60, text: "So I love when you call unexpected" },
  { time: 66, text: "'Cause I hate when the moment's expected" },
  { time: 71, text: "So I'ma care for you, you, you" },
  { time: 77, text: "I'ma care for you, you, you, you, yeah" },
  { time: 84, text: "'Cause girl, you're perfect" },
  { time: 86, text: "You're always worth it" },
  { time: 89, text: "And you deserve it" },
  { time: 92, text: "The way you work it" },
  { time: 96, text: "'Cause girl, you earned it, yeah" },
  { time: 102, text: "Girl, you earned it, yeah" },
  { time: 109, text: "You know our love would be tragic (Oh, yeah)" },
  { time: 114, text: "So you don't pay it, don't pay it no mind, mind, mind" },
  { time: 122, text: "We live with no lies" },
  { time: 125, text: "Hey, hey" },
  { time: 127, text: "You're my favorite kind of night" },
  { time: 131, text: "So I love when you call unexpected" },
  { time: 137, text: "'Cause I hate when the moment's expected" },
  { time: 143, text: "So I'ma care for you, you, you" },
  { time: 148, text: "I'ma care for you, you, you, you, yeah" },
  { time: 155, text: "'Cause girl, you're perfect (Girl, you're perfect)" },
  { time: 158, text: "You're always worth it (Always worth it)" },
  { time: 161, text: "And you deserve it (And you deserve it)" },
  { time: 164, text: "The way you work it (The way you work it)" },
  { time: 168, text: "'Cause girl, you earned it, yeah (Earned it)" },
  { time: 173, text: "Girl, you earned it, yeah" },
  { time: 179, text: "On that lonely night (Lonely night)" },
  { time: 183, text: "We said it wouldn't be love" },
  { time: 185, text: "But we felt the rush (Fell in love)" },
  { time: 189, text: "It made us believe it was only us (Only us)" },
  { time: 194, text: "Convinced we were broken inside, yeah, inside, yeah" },
  { time: 209, text: "'Cause girl, you're perfect (Girl, you're perfect)" },
  { time: 212, text: "You're always worth it (Always worth it)" },
  { time: 215, text: "And you deserve it (And you deserve it)" },
  { time: 218, text: "The way you work it (The way you work it)" },
  { time: 221, text: "'Cause girl, you earned it, yeah (You earned it)" },
  { time: 227, text: "Girl, you earned it, yeah (You earned it)" },
  { time: 236, text: "Na-na-na-na-na" },
  { time: 239, text: "Oh-oh-oh yeah, yeah" },
  { time: 245, text: "'Cause girl, you're perfect" },
  { time: 248, text: "The way you work it" },
  { time: 251, text: "You deserve it girl, you deserve it" },
  { time: 257, text: "Girl, you earned it, yeah, yeah" }
];

export default function AudioPlayer({ isPlaying, onPlayChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setHasStarted(true);
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

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

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const currentLyric = lyrics.slice().reverse().find(lyric => currentTime >= lyric.time)?.text || "♪";

  return (
    <>
      <audio
        ref={audioRef}
        src="/media/song.mp3"
        loop
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        className="hidden"
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`fixed bottom-6 right-6 z-50 flex flex-col bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${expanded ? 'w-80 p-6' : 'w-72 p-3 cursor-pointer hover:bg-[#1a1a1a]/90'}`}
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
                className={`relative overflow-hidden rounded-lg shadow-2xl ${expanded ? 'w-56 h-56 mb-8' : 'w-12 h-12 flex-shrink-0'}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-rose/20 z-10" />
                <Image
                  src="/media/2.jpeg" // Using one of the provided photos as album art
                  alt="Album Art"
                  fill
                  className={`object-cover ${isPlaying ? 'animate-[spin_20s_linear_infinite]' : ''}`}
                  style={{ borderRadius: expanded ? '16px' : '50%' }}
                />
                {/* Vinyl Hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0a0a0a] rounded-full z-20 border border-white/10 shadow-inner" />
              </motion.div>

              {/* Track Info & Controls Mini */}
              <div className={`flex flex-col ${expanded ? 'w-full text-center mb-6' : 'flex-grow justify-center overflow-hidden'}`}>
                <motion.h4 layoutId="track-title" className={`text-white font-heading truncate ${expanded ? 'text-2xl mb-1' : 'text-sm'}`}>
                  Our Love Story
                </motion.h4>
                <motion.p layoutId="track-artist" className={`text-gray-soft font-body truncate ${expanded ? 'text-sm' : 'text-xs'}`}>
                  Adam & Hann
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
                  <div className="flex items-center justify-center gap-8 mb-8">
                    <button className="text-gray-soft hover:text-white transition-colors">
                      <FaStepBackward size={20} />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-14 h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition-transform"
                    >
                      {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                    </button>
                    <button className="text-gray-soft hover:text-white transition-colors">
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
                  <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden group">
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
