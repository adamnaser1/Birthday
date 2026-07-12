"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface FlowerData {
  name: string;
  photo: string;
  color: string;
  petalColor: string;
  stemColor: string;
  message: string;
  petalCount: number;
}

const flowers: FlowerData[] = [
  {
    name: "Rose",
    photo: "rose.jpeg",
    color: "#A3132A",
    petalColor: "#cc1a36",
    stemColor: "#2d5a27",
    message: "You are the most beautiful soul I have ever known.",
    petalCount: 8,
  },
  {
    name: "Tulip",
    photo: "tulip.jpeg",
    color: "#ff69b4",
    petalColor: "#ff85c8",
    stemColor: "#2d5a27",
    message: "My love for you blooms more every day.",
    petalCount: 6,
  },
  {
    name: "Sunflower",
    photo: "sunflower.jpeg",
    color: "#FFD700",
    petalColor: "#f0c420",
    stemColor: "#2d5a27",
    message: "You are the sunshine in my darkest days.",
    petalCount: 12,
  },
  {
    name: "Daisy",
    photo: "daisy.jpeg",
    color: "#fff",
    petalColor: "#ffffff",
    stemColor: "#2d5a27",
    message: "Every little thing about you makes me happy.",
    petalCount: 10,
  },
  {
    name: "Lavender",
    photo: "lavender.jpeg",
    color: "#9370DB",
    petalColor: "#a78bdb",
    stemColor: "#2d5a27",
    message: "Your presence calms every storm inside me.",
    petalCount: 6,
  },
];

function FlowerSVG({ flower, isGrown, onClick, index }: { flower: FlowerData; isGrown: boolean; onClick: () => void; index: number }) {
  // No more CSS petals, we render the image directly

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
      <motion.div 
        className="relative w-24 h-24 md:w-32 md:h-32 z-10 rounded-full border-4 shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{ borderColor: flower.color, backgroundColor: "#000" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isGrown ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.8, type: "spring", damping: 15 }}
      >
        <Image 
          src={`/media/${flower.photo}`} 
          alt={flower.name} 
          fill 
          sizes="128px"
          className="object-cover" 
        />
      </motion.div>

      {/* Stem */}
      <motion.div
        className="w-1.5 rounded-b-full origin-top relative z-0"
        style={{ backgroundColor: flower.stemColor }}
        initial={{ height: 0 }}
        animate={isGrown ? { height: 120 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Leaves */}
      <motion.div
        className="absolute bottom-10 -left-6 w-10 h-5 rounded-tl-full rounded-br-full origin-right"
        style={{ backgroundColor: flower.stemColor }}
        initial={{ scale: 0, rotate: 0 }}
        animate={isGrown ? { scale: 1, rotate: -30 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-20 -right-6 w-10 h-5 rounded-tr-full rounded-bl-full origin-left"
        style={{ backgroundColor: flower.stemColor }}
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
          {allGrown ? "A Bouquet For You 💐" : "A Garden For You"}
        </motion.h2>
        <p className="font-body text-gray-soft text-base md:text-lg px-4">
          {allGrown 
            ? "Your garden is full. Tap any flower to see the beautiful photos you sent."
            : "Tap each seed to grow a flower. Tap again to reveal its photo."}
        </p>
      </div>

      {/* The Garden */}
      <div className="relative flex flex-wrap justify-center items-end gap-6 md:gap-10 max-w-5xl mx-auto z-10">
        {flowers.map((flower, i) => (
          <div key={i}>
            <FlowerSVG
              index={i}
              flower={flower}
              isGrown={grownFlowers.has(i)}
              onClick={() => handleFlowerClick(i)}
            />
          </div>
        ))}
      </div>

      {/* Bouquet Animation (Appears when all grown) */}
      <AnimatePresence>
        {allGrown && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1, type: "spring", damping: 20 }}
            className="mt-20 relative w-64 h-64 md:w-80 md:h-80 bg-white p-3 rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer"
            onClick={() => setActiveFlower(99)} // Special index for the bouquet
          >
            <Image 
              src="/media/boquetFleurs.jpeg" 
              alt="Final Bouquet" 
              fill 
              sizes="300px" 
              className="object-cover rounded-md" 
            />
            <div className="absolute -bottom-6 right-4 font-letter text-3xl text-rose -rotate-6">
              For you ❤️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  src={activeFlower === 99 ? "/media/boquetFleurs.jpeg" : `/media/${flowers[activeFlower].photo}`} 
                  alt="Memory" 
                  fill 
                  className="object-cover rounded-sm"
                  sizes="250px"
                />
              </div>

              <p className="font-letter text-2xl md:text-4xl text-white leading-relaxed">
                {activeFlower === 99 
                  ? "A bouquet as beautiful as you are. 💐" 
                  : `"${flowers[activeFlower].message}"`}
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
