"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegStar } from "react-icons/fa";

const wishes = [
  "May your days be as beautiful as your heart.",
  "I wish you endless joy and unstoppable laughter.",
  "May all your wildest dreams come true this year.",
  "I wish for us to create a million more memories.",
  "May you always feel as loved as you make me feel.",
  "I wish you health, wealth, and profound peace.",
  "May your smile never fade.",
  "I wish you success in every endeavor you pursue.",
  "May your path be illuminated by stars.",
  "I wish for every day to bring you a new reason to smile.",
  "May the world treat you with the kindness you give to it.",
  "I wish you unwavering confidence in your beautiful self.",
  "May this year be the start of your greatest chapter yet.",
  "I wish for our love to grow stronger with every passing second.",
  "May you find magic in the ordinary moments.",
  "I wish you the courage to chase your biggest goals.",
  "May you always be surrounded by people who cherish you.",
  "I wish you moments of breathtaking wonder.",
  "May your heart always be light and free.",
  "I wish you comfort on your hardest days.",
  "May your spirit remain forever unbroken.",
  "I wish you the realization of how truly special you are.",
  "May serendipity follow you wherever you go.",
  "I wish you an abundance of sweet surprises.",
  "May you always see the beauty in your reflection.",
  "I wish you a lifetime of holding my hand.",
  "May your passions ignite the world.",
  "I wish you peace that surpasses all understanding.",
  "May your journey be filled with glorious adventures.",
  "I wish you the strength to overcome any obstacle.",
  "May you always feel at home in my arms.",
  "I wish you a year of monumental breakthroughs.",
  "May every sunset bring you a promise of a better tomorrow.",
  "I wish you the fulfillment of your heart's deepest desires.",
  "May you never lose your radiant spark.",
  "I wish you an ocean of tranquility.",
  "May your creativity know no bounds.",
  "I wish you the joy of discovering new places and things.",
  "May you always feel deeply, madly loved.",
  "I wish you perfectly timed serendipities.",
  "May the universe align in your favor.",
  "I wish you sweet dreams that turn into reality.",
  "May you always have a reason to celebrate.",
  "I wish you a year filled with firsts.",
  "May your laughter echo in the halls of my memory forever.",
  "I wish you a heart full of gratitude and grace.",
  "May you be a magnet for miracles.",
  "I wish you endless inspiration.",
  "May your days be painted with your favorite colors.",
  "I wish you the happiest birthday imaginable."
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
    <section className="relative w-full py-32 bg-background flex flex-col items-center px-4">
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-gold bg-background px-2">
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
