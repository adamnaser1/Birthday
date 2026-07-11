"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FlowerData {
  name: string;
  emoji: string;
  color: string;
  petalColor: string;
  stemColor: string;
  message: string;
  petalCount: number;
}

const flowers: FlowerData[] = [
  {
    name: "Rose",
    emoji: "🌹",
    color: "#A3132A",
    petalColor: "#cc1a36",
    stemColor: "#2d5a27",
    message: "You are the most beautiful soul I have ever known.",
    petalCount: 8,
  },
  {
    name: "Tulip",
    emoji: "🌷",
    color: "#ff69b4",
    petalColor: "#ff85c8",
    stemColor: "#2d5a27",
    message: "My love for you blooms more every day.",
    petalCount: 6,
  },
  {
    name: "Sunflower",
    emoji: "🌻",
    color: "#FFD700",
    petalColor: "#f0c420",
    stemColor: "#2d5a27",
    message: "You are the sunshine in my darkest days.",
    petalCount: 12,
  },
  {
    name: "Daisy",
    emoji: "🌼",
    color: "#fff",
    petalColor: "#ffffff",
    stemColor: "#2d5a27",
    message: "Every little thing about you makes me happy.",
    petalCount: 10,
  },
  {
    name: "Lavender",
    emoji: "💜",
    color: "#9370DB",
    petalColor: "#a78bdb",
    stemColor: "#2d5a27",
    message: "Your presence calms every storm inside me.",
    petalCount: 6,
  },
];

function FlowerSVG({ flower, isGrown, onClick }: { flower: FlowerData; isGrown: boolean; onClick: () => void }) {
  const petals = useMemo(() => {
    return Array.from({ length: flower.petalCount }).map((_, i) => {
      const angle = (360 / flower.petalCount) * i;
      return { angle, key: i };
    });
  }, [flower.petalCount]);

  return (
    <motion.div 
      className="relative flex flex-col items-center cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      {/* Flower head */}
      <div className="relative w-32 h-32 md:w-40 md:h-40">
        {/* Petals */}
        {petals.map(({ angle, key }) => (
          <motion.div
            key={key}
            className="absolute top-1/2 left-1/2 origin-bottom"
            initial={{ scale: 0, opacity: 0 }}
            animate={isGrown ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 + key * 0.1, type: "spring" }}
            style={{
              transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              width: 20,
              height: 40,
            }}
          >
            <div
              className="w-full h-full rounded-t-full"
              style={{ backgroundColor: flower.petalColor, opacity: 0.9 }}
            />
          </motion.div>
        ))}

        {/* Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full z-10"
          initial={{ scale: 0 }}
          animate={isGrown ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 + flower.petalCount * 0.1 }}
          style={{ backgroundColor: flower.name === "Sunflower" ? "#5c3d0a" : "#e8c84a" }}
        />
      </div>

      {/* Stem */}
      <motion.div
        className="w-1.5 rounded-b-full origin-top"
        style={{ backgroundColor: flower.stemColor }}
        initial={{ height: 0 }}
        animate={isGrown ? { height: 100 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Leaves */}
      <motion.div
        className="absolute bottom-8 -left-4 w-8 h-4 rounded-tl-full rounded-br-full origin-right"
        style={{ backgroundColor: flower.stemColor }}
        initial={{ scale: 0, rotate: 0 }}
        animate={isGrown ? { scale: 1, rotate: -30 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-16 -right-4 w-8 h-4 rounded-tr-full rounded-bl-full origin-left"
        style={{ backgroundColor: flower.stemColor }}
        initial={{ scale: 0, rotate: 0 }}
        animate={isGrown ? { scale: 1, rotate: 30 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
      />

      {/* Seed (before growth) */}
      {!isGrown && (
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🌱
        </motion.div>
      )}

      {/* Name label */}
      <p className="mt-4 text-sm font-body text-gray-soft tracking-wider uppercase">{flower.name}</p>
    </motion.div>
  );
}

export default function Flowers() {
  const [grownFlowers, setGrownFlowers] = useState<Set<number>>(new Set());
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const handleFlowerClick = (index: number) => {
    if (!grownFlowers.has(index)) {
      setGrownFlowers(prev => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    } else {
      setActiveMessage(flowers[index].message);
    }
  };

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-20 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          A Garden For You
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Tap each seed to grow a flower. Tap again to reveal its message.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-12 md:gap-16 max-w-4xl mx-auto z-10">
        {flowers.map((flower, i) => (
          <FlowerSVG
            key={flower.name}
            flower={flower}
            isGrown={grownFlowers.has(i)}
            onClick={() => handleFlowerClick(i)}
          />
        ))}
      </div>

      {/* Message Overlay */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
            onClick={() => setActiveMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-card/90 backdrop-blur-xl border border-gold/30 p-10 rounded-2xl max-w-lg text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={e => e.stopPropagation()}
            >
              <p className="font-letter text-3xl md:text-4xl text-white leading-relaxed">
                &ldquo;{activeMessage}&rdquo;
              </p>
              <p className="mt-6 text-xs text-gray-soft font-body tracking-widest uppercase">Tap anywhere to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
