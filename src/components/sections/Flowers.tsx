"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FlowerData {
  photo: string;
  message: string;
}

// 5 red roses with photos
const flowers: FlowerData[] = [
  {
    photo: "2.jpeg",
    message: "You are the most beautiful soul I have ever known.",
  },
  {
    photo: "k23.jpeg",
    message: "My love for you blooms more every day.",
  },
  {
    photo: "4.jpeg",
    message: "You are the sunshine in my darkest days.",
  },
  {
    photo: "6.jpeg",
    message: "Every little thing about you makes me happy.",
  },
  {
    photo: "10.jpeg",
    message: "Your presence calms every storm inside me.",
  },
];

function RedRoseSVG({ isGrown, onClick, index }: { isGrown: boolean; onClick: () => void; index: number }) {
  const petals = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const angle = (360 / 8) * i;
      return { angle, key: i };
    });
  }, []);

  return (
    <motion.div 
      className="relative flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Flower head */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 z-10">
        {petals.map(({ angle, key }) => (
          <motion.div
            key={key}
            className="absolute top-1/2 left-1/2 origin-bottom"
            initial={{ scale: 0, opacity: 0 }}
            animate={isGrown ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 + key * 0.1, type: "spring" }}
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: 25,
              height: 45,
            }}
          >
            <div
              className="w-full h-full rounded-t-full shadow-[0_0_10px_rgba(163,19,42,0.5)]"
              style={{ backgroundColor: "#cc1a36", opacity: 0.95 }}
            />
          </motion.div>
        ))}

        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full z-10 shadow-inner"
          initial={{ scale: 0 }}
          animate={isGrown ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.6 }}
          style={{ backgroundColor: "#8b0000" }}
        />
      </div>

      {/* Stem */}
      <motion.div
        className="w-1.5 rounded-b-full origin-top relative z-0"
        style={{ backgroundColor: "#2d5a27" }}
        initial={{ height: 0 }}
        animate={isGrown ? { height: 120 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Leaves */}
      <motion.div
        className="absolute bottom-10 -left-6 w-10 h-5 rounded-tl-full rounded-br-full origin-right"
        style={{ backgroundColor: "#2d5a27" }}
        initial={{ scale: 0, rotate: 0 }}
        animate={isGrown ? { scale: 1, rotate: -30 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-20 -right-6 w-10 h-5 rounded-tr-full rounded-bl-full origin-left"
        style={{ backgroundColor: "#2d5a27" }}
        initial={{ scale: 0, rotate: 0 }}
        animate={isGrown ? { scale: 1, rotate: 30 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Seed (before growth) */}
      {!isGrown && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-3xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🌱
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Flowers() {
  const [grownFlowers, setGrownFlowers] = useState<Set<number>>(new Set());
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  const handleFlowerClick = (index: number) => {
    if (!grownFlowers.has(index)) {
      setGrownFlowers(prev => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    } else {
      setActiveFlower(index);
    }
  };

  const allGrown = grownFlowers.size === flowers.length;

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden min-h-[80vh]">
      <div className="text-center mb-16 md:mb-24 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          {allGrown ? "A Bouquet For You 🌹" : "A Garden For You"}
        </motion.h2>
        <p className="font-body text-gray-soft text-base md:text-lg px-4">
          {allGrown 
            ? "Your roses have bloomed. Tap them to see the memories they hold."
            : "Red roses are your favorite. Tap each seed to grow one. Tap again to reveal what's inside."}
        </p>
      </div>

      {/* The Bouquet / Garden */}
      <div className={`relative flex flex-wrap justify-center items-end gap-6 md:gap-10 max-w-5xl mx-auto z-10 transition-all duration-1000 ${allGrown ? 'scale-110 md:scale-125 translate-y-10' : ''}`}>
        {flowers.map((_, i) => (
          <div key={i} className={`transition-all duration-1000 ${allGrown ? (i%2===0 ? '-rotate-6' : 'rotate-6') : ''}`}>
            <RedRoseSVG
              index={i}
              isGrown={grownFlowers.has(i)}
              onClick={() => handleFlowerClick(i)}
            />
          </div>
        ))}

        {/* Bouquet ribbon (appears when all grown) */}
        <AnimatePresence>
          {allGrown && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none z-20"
            >
              <div className="absolute inset-0 border-b-4 border-gold rounded-[100%] rotate-3 shadow-[0_5px_15px_rgba(212,175,55,0.4)]"></div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-2 w-8 h-12 bg-gold/80 clip-path-polygon-[0_0,100%_0,50%_100%] shadow-[0_5px_15px_rgba(212,175,55,0.4)]"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Message & Photo Overlay */}
      <AnimatePresence>
        {activeFlower !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            onClick={() => setActiveFlower(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-card/90 backdrop-blur-xl border border-gold/30 p-6 md:p-10 rounded-2xl max-w-lg w-full flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 p-2 bg-white rounded-sm shadow-xl rotate-[-2deg]">
                <Image 
                  src={`/media/${flowers[activeFlower].photo}`} 
                  alt="Memory" 
                  fill 
                  className="object-cover rounded-sm"
                  sizes="250px"
                />
              </div>

              <p className="font-letter text-2xl md:text-4xl text-white leading-relaxed">
                &ldquo;{flowers[activeFlower].message}&rdquo;
              </p>
              
              <button 
                onClick={() => setActiveFlower(null)}
                className="mt-8 text-xs text-gray-soft font-body tracking-widest uppercase hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
