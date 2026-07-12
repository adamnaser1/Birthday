"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const flowers = [
  {
    name: "Rose",
    photo: "rose.jpeg",
    message: "You are the most beautiful soul I have ever known.",
  },
  {
    name: "Tulip",
    photo: "tulip.jpeg",
    message: "My love for you blooms more every day.",
  },
  {
    name: "Sunflower",
    photo: "sunflower.jpeg",
    message: "You are the sunshine in my darkest days.",
  },
  {
    name: "Daisy",
    photo: "daisy.jpeg",
    message: "Every little thing about you makes me happy.",
  },
  {
    name: "Lavender",
    photo: "lavender.jpeg",
    message: "Your presence calms every storm inside me.",
  },
];

export default function Flowers() {
  const [revealedFlowers, setRevealedFlowers] = useState<Set<number>>(new Set());
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  const handleSeedClick = (index: number) => {
    if (!revealedFlowers.has(index)) {
      // First click: reveal the flower image
      setRevealedFlowers((prev) => {
        const next = new Set(prev);
        next.add(index);
        return next;
      });
    } else {
      // Already revealed: show the message overlay
      setActiveFlower(index);
    }
  };

  const allRevealed = revealedFlowers.size === flowers.length;

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden min-h-[80vh]">
      <div className="text-center mb-16 md:mb-20 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          {allRevealed ? "A Bouquet For You 💐" : "A Garden For You"}
        </motion.h2>
        <p className="font-body text-gray-soft text-base md:text-lg px-4">
          {allRevealed
            ? "Your garden is full. Tap any flower to read its message."
            : "Tap each seed to reveal a flower."}
        </p>
      </div>

      {/* Seeds / Flowers row */}
      <div className="flex flex-wrap justify-center items-end gap-8 md:gap-14 max-w-5xl mx-auto z-10">
        {flowers.map((flower, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSeedClick(i)}
          >
            <AnimatePresence mode="wait">
              {!revealedFlowers.has(i) ? (
                /* Seed */
                <motion.div
                  key="seed"
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    className="text-4xl md:text-5xl select-none"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🌱
                  </motion.span>
                  <span className="mt-2 text-xs text-gray-soft/60 font-body">tap me</span>
                </motion.div>
              ) : (
                /* Flower image — displayed as-is, no circle, no crop */
                <motion.div
                  key="flower"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-28 h-36 md:w-36 md:h-44"
                >
                  <Image
                    src={`/media/${flower.photo}`}
                    alt={flower.name}
                    fill
                    sizes="150px"
                    className="object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bouquet (appears when all revealed) */}
      <AnimatePresence>
        {allRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 relative w-64 h-64 md:w-80 md:h-80 bg-white p-3 rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer z-10"
            onClick={() => setActiveFlower(99)}
          >
            <Image
              src="/media/boquetFleurs.jpeg"
              alt="Bouquet"
              fill
              sizes="320px"
              className="object-cover rounded-md"
            />
            <div className="absolute -bottom-6 right-4 font-letter text-3xl text-rose -rotate-6">
              For you ❤️
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message overlay */}
      <AnimatePresence>
        {activeFlower !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
            onClick={() => setActiveFlower(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-card/90 backdrop-blur-xl border border-gold/30 p-6 md:p-10 rounded-2xl max-w-lg w-full flex flex-col items-center text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-48 h-60 md:w-64 md:h-80 mb-8">
                <Image
                  src={
                    activeFlower === 99
                      ? "/media/boquetFleurs.jpeg"
                      : `/media/${flowers[activeFlower].photo}`
                  }
                  alt="Memory"
                  fill
                  className={activeFlower === 99 ? "object-cover rounded-md" : "object-contain"}
                  sizes="260px"
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
