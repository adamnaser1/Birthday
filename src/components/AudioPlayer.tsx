"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayChange: (playing: boolean) => void;
}

export default function AudioPlayer({ isPlaying, onPlayChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      // Play the audio and handle any browser autoplay restrictions
      audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      setHasStarted(true);
    } else if (!isPlaying && audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/media/song.mp3"
        loop
        preload="auto"
        className="hidden"
      />

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-card/80 backdrop-blur-md border border-white/10 px-4 py-3 rounded-full shadow-2xl"
          >
            <div className="flex flex-col">
              <span className="text-xs text-gray-soft font-body uppercase tracking-wider">Now Playing</span>
              <span className="text-sm text-gold font-heading">Our Love Story</span>
            </div>

            <div className="flex items-center gap-3 ml-2 border-l border-white/10 pl-4">
              <button
                onClick={() => onPlayChange(!isPlaying)}
                className="text-white hover:text-gold transition-colors focus:outline-none"
              >
                {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
              </button>
              <button
                onClick={toggleMute}
                className="text-white hover:text-gold transition-colors focus:outline-none"
              >
                {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
              </button>
            </div>
            
            {/* Equalizer animation */}
            <div className="flex items-end gap-[2px] h-4 ml-1">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={
                    isPlaying
                      ? { height: ["20%", "100%", "40%", "80%", "20%"] }
                      : { height: "20%" }
                  }
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                  className="w-1 bg-rose rounded-t-sm"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
