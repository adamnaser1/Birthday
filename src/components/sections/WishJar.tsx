"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegStar } from "react-icons/fa";

const wishes = [
  "May Allah fill your life with endless happiness and barakah.",
  "Insha'Allah, every dream you've been quietly holding onto comes true.",
  "I pray that this year brings you more peace than you've ever known.",
  "May every du'a you whisper be answered in the most beautiful way.",
  "May Allah keep your smile bright and your heart at ease.",
  "Insha'Allah, you'll always find light, even on the darkest days.",
  "I hope Allah blesses you with a life full of love, laughter, and unforgettable memories.",
  "May your birthday mark the beginning of your happiest chapter yet.",
  "I ask Allah to protect you wherever life takes you.",
  "May your heart always find comfort in Allah's mercy.",
  "Insha'Allah, every step you take leads you to something beautiful.",
  "May Allah replace every worry with relief and every tear with joy.",
  "I hope this year surprises you with blessings you never expected.",
  "May Allah grant you good health, endless happiness, and a peaceful heart.",
  "May your path always be guided by His light.",
  "Insha'Allah, you'll wake up every morning with hope and go to sleep with gratitude.",
  "I pray that Allah opens doors for you that no one can close.",
  "May your life always be filled with people who genuinely love and appreciate you.",
  "May Allah grant you strength whenever life becomes difficult.",
  "Insha'Allah, you'll never stop believing in yourself.",
  "May every challenge become a reason for you to grow stronger.",
  "I pray that Allah blesses your future with more than you could ever imagine.",
  "May your beautiful heart always find reasons to smile.",
  "Insha'Allah, your kindness returns to you a thousand times over.",
  "May Allah write only goodness in your destiny.",
  "I hope your happiest memories are still waiting to be made.",
  "May Allah make your heart bloom with peace, just like a garden after the rain.",
  "Insha'Allah, this birthday is only the beginning of something wonderful.",
  "May Allah surround you with His mercy every single day.",
  "I pray that every year makes you even happier than the one before.",
  "May Allah make your dreams easier to reach than you ever imagined.",
  "Insha'Allah, every sunset reminds you that tomorrow always brings new hope.",
  "May Allah protect your beautiful soul from every harm.",
  "I hope your life is filled with little miracles that make you smile.",
  "May Allah bless your family and keep them safe and healthy.",
  "Insha'Allah, you'll always find peace wherever your heart goes.",
  "I pray that Allah grants you success in everything that's good for you.",
  "May every birthday bring you closer to the life you've always wished for.",
  "May Allah give you a heart that stays grateful through every season of life.",
  "Insha'Allah, your future is brighter than your dreams today.",
  "May Allah bless every smile you share with the world.",
  "I pray you'll always have someone to remind you how special you are.",
  "May Allah reward your kind heart with endless blessings.",
  "Insha'Allah, your laughter never fades and your hope never disappears.",
  "May your life always be filled with barakah, love, and beautiful surprises.",
  "I ask Allah to grant you both happiness in this life and Jannat Al-Firdaws in the next.",
  "May Allah make your heart feel at home wherever you are.",
  "Insha'Allah, every chapter ahead is even more beautiful than the last.",
  "I pray that Allah accepts every sincere du'a you make.",
  "Happy Birthday ❤️ May Allah always keep you under His protection and shower your life with endless blessings."
];

export default function WishJar() {
  const [currentWish, setCurrentWish] = useState<string | null>(null);

  // Pre-generate star properties so they stay stable across renders
  const starProps = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      duration: 2 + ((i * 1.7 + 0.3) % 2),
      delay: (i * 0.9 + 0.1) % 2,
      left: `${10 + ((i * 17.3 + 5.7) % 80)}%`,
      bottom: `${10 + ((i * 11.9 + 3.1) % 50)}%`,
      size: 10 + ((i * 3.7 + 1.3) % 10),
    }));
  }, []);

  const pullWish = () => {
    const randomIndex = Math.floor(Math.random() * wishes.length);
    setCurrentWish(wishes[randomIndex]);
  };

  return (
    <section className="relative w-full py-32 bg-transparent flex flex-col items-center px-4">
      <div className="text-center mb-16 z-10">
        <h2 className="text-4xl md:text-6xl font-heading text-white mb-4">The Wish Jar</h2>
        <p className="font-body text-gray-soft text-lg font-light">Tap the jar to pull out a birthday wish</p>
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center">
        {/* The Glass Jar */}
        <motion.div
          onClick={pullWish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-48 h-64 md:w-56 md:h-72 cursor-pointer z-10"
        >
          {/* Jar Lid */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gradient-to-b from-[#b87333] to-[#8c5222] rounded-sm shadow-md z-20" />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 h-4 bg-gradient-to-b from-[#8c5222] to-[#5c3211] rounded-b-md z-20" />

          {/* Jar Body */}
          <div className="absolute top-8 left-0 w-full h-[calc(100%-2rem)] bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-[2rem] rounded-t-xl shadow-[inset_0_0_50px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />

            {/* Glowing stars inside */}
            {starProps.map((star, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay
                }}
                className="absolute text-gold/60"
                style={{
                  left: star.left,
                  bottom: star.bottom,
                }}
              >
                <FaRegStar size={star.size} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Displayed Wish */}
        <div className="h-40 mt-12 w-full flex justify-center items-start">
          <AnimatePresence mode="wait">
            {currentWish && (
              <motion.div
                key={currentWish}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="bg-card/80 backdrop-blur-md border border-gold/30 p-6 rounded-2xl shadow-xl w-full text-center relative"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold bg-transparent px-2">
                  <FaRegStar size={16} />
                </div>
                <p className="font-letter text-2xl md:text-3xl text-white">
                  &ldquo;{currentWish}&rdquo;
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
