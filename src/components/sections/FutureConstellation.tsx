"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StarData {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  dream: string;
  emoji: string;
}

const dreams = [
  { text: "Visit Tunisia together 🇹🇳", emoji: "✈️" },
  { text: "Finally meet in person ❤️", emoji: "🤝" },
  { text: "Travel the world together 🌍", emoji: "🗺️" },
  { text: "Our first apartment 🏠", emoji: "🏡" },
  { text: "Cooking together 🍝", emoji: "👨‍🍳" },
  { text: "Watch a sunset side by side 🌅", emoji: "🌇" },
  { text: "Spend every birthday together 🎂", emoji: "🎉" },
  { text: "Grow old together 👴👵", emoji: "💍" },
  { text: "Build our own family 👨‍👩‍👧", emoji: "🏡" },
  { text: "Road trip across Europe 🚗", emoji: "🛣️" },
  { text: "Dance in the rain together 🌧️", emoji: "💃" },
  { text: "Watch the northern lights 🌌", emoji: "🌠" },
];

export default function FutureConstellation() {
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [connectedStars, setConnectedStars] = useState<Set<number>>(new Set());

  const stars: StarData[] = useMemo(() => {
    return dreams.map((dream, i) => ({
      id: i,
      x: 10 + ((i * 23.7 + 15.3) % 80),
      y: 10 + ((i * 17.1 + 8.9) % 75),
      size: 3 + ((i * 3.7 + 1.3) % 4),
      brightness: 0.5 + ((i * 0.17 + 0.1) % 0.5),
      dream: dream.text,
      emoji: dream.emoji,
    }));
  }, []);

  // Background stars (decorative)
  const bgStars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => ({
      x: (i * 13.7 + 5.3) % 100,
      y: (i * 11.3 + 7.1) % 100,
      size: 1 + ((i * 0.7 + 0.3) % 1.5),
      opacity: 0.1 + ((i * 0.13 + 0.05) % 0.4),
    }));
  }, []);

  const handleStarClick = (id: number) => {
    setActiveStar(id);
    setConnectedStars(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  // Generate constellation lines between connected stars
  const lines = useMemo(() => {
    const connected = Array.from(connectedStars).sort((a, b) => a - b);
    const result: Array<{ x1: number; y1: number; x2: number; y2: number; key: string }> = [];
    for (let i = 0; i < connected.length - 1; i++) {
      const s1 = stars[connected[i]];
      const s2 = stars[connected[i + 1]];
      result.push({
        x1: s1.x,
        y1: s1.y,
        x2: s2.x,
        y2: s2.y,
        key: `${connected[i]}-${connected[i + 1]}`,
      });
    }
    return result;
  }, [connectedStars, stars]);

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Our Future Written in the Stars
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Tap each star to discover our future dreams</p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[600px] z-10">
        <div className="absolute inset-0 bg-[#030510] rounded-3xl border border-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          
          {/* Background stars */}
          {bgStars.map((s, i) => (
            <div
              key={`bg-${i}`}
              className="absolute w-px h-px bg-white rounded-full animate-pulse"
              style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, opacity: s.opacity }}
            />
          ))}

          {/* Constellation lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {lines.map(line => (
              <motion.line
                key={line.key}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="rgba(212, 175, 55, 0.4)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
            ))}
          </svg>

          {/* Interactive stars */}
          {stars.map((star) => (
            <motion.button
              key={star.id}
              onClick={() => handleStarClick(star.id)}
              className="absolute z-20 group focus:outline-none"
              style={{ left: `${star.x}%`, top: `${star.y}%`, transform: "translate(-50%, -50%)" }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
            >
              {/* Star core */}
              <motion.div
                className="rounded-full bg-white"
                style={{ width: star.size * 2, height: star.size * 2 }}
                animate={connectedStars.has(star.id)
                  ? { boxShadow: "0 0 15px 5px rgba(212,175,55,0.8)", backgroundColor: "#D4AF37" }
                  : { opacity: [star.brightness, 1, star.brightness] }
                }
                transition={connectedStars.has(star.id) ? { duration: 0.5 } : { duration: 2 + star.id * 0.3, repeat: Infinity }}
              />
              
              {/* Hover ring */}
              <div className="absolute inset-[-8px] rounded-full border border-white/0 group-hover:border-gold/50 transition-all duration-300" />

              {/* Star emoji label (shows when connected) */}
              {connectedStars.has(star.id) && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-lg"
                >
                  {star.emoji}
                </motion.span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Dream popup */}
      <AnimatePresence>
        {activeStar !== null && (
          <motion.div
            key={activeStar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 20 }}
            className="mt-8 bg-card/80 backdrop-blur-xl border border-gold/20 px-8 py-5 rounded-2xl shadow-xl z-10"
          >
            <p className="font-letter text-2xl md:text-3xl text-white text-center">
              {stars[activeStar].emoji} {stars[activeStar].dream}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <p className="mt-6 text-xs text-gray-soft font-body tracking-widest z-10">
        {connectedStars.size} / {stars.length} stars discovered
      </p>
    </section>
  );
}
