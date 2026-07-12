"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const flowers = [
  {
    name: "Rose",
    photo: "rose.jpeg",
    color: "#A3132A",
    message: "You are the most beautiful soul I have ever known.",
  },
  {
    name: "Tulip",
    photo: "tulip.jpeg",
    color: "#ff69b4",
    message: "My love for you blooms more every day.",
  },
  {
    name: "Sunflower",
    photo: "sunflower.jpeg",
    color: "#FFD700",
    message: "You are the sunshine in my darkest days.",
  },
  {
    name: "Daisy",
    photo: "daisy.jpeg",
    color: "#fff",
    message: "Every little thing about you makes me happy.",
  },
  {
    name: "Lavender",
    photo: "lavender.jpeg",
    color: "#9370DB",
    message: "Your presence calms every storm inside me.",
  },
];

export default function Flowers() {
  const [activeFlower, setActiveFlower] = useState<number | null>(null);

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden min-h-[60vh]">
      <div className="text-center mb-16 md:mb-20 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          A Garden For You 🌸
        </motion.h2>
        <p className="font-body text-gray-soft text-base md:text-lg px-4">
          Each flower carries a message. Tap to read it.
        </p>
      </div>

      {/* Flower photos grid */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-5xl mx-auto z-10">
        {flowers.map((flower, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.08, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveFlower(i)}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden cursor-pointer border-4 shadow-[0_0_25px_rgba(0,0,0,0.4)]"
            style={{ borderColor: flower.color }}
          >
            <Image
              src={`/media/${flower.photo}`}
              alt={flower.name}
              fill
              sizes="160px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-2 left-0 right-0 text-center text-white text-xs md:text-sm font-body tracking-wider">
              {flower.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bouquet photo */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 md:mt-24 relative w-64 h-64 md:w-80 md:h-80 bg-white p-3 rounded-lg shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer z-10"
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

      {/* Photo + Message overlay */}
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
              <div className="relative w-48 h-48 md:w-64 md:h-64 mb-8 p-2 bg-white rounded-sm shadow-xl rotate-[-2deg]">
                <Image
                  src={
                    activeFlower === 99
                      ? "/media/boquetFleurs.jpeg"
                      : `/media/${flowers[activeFlower].photo}`
                  }
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
