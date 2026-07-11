"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function InteractiveHeart() {
  const [clicks, setClicks] = useState(0);
  const maxClicks = 20; // 5% per click
  const percentage = Math.min(Math.round((clicks / maxClicks) * 100), 100);
  const isFull = percentage >= 100;

  const handleTap = () => {
    if (!isFull) {
      setClicks((prev) => prev + 1);
    }
  };

  return (
    <section className="relative w-full py-40 flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        backgroundColor: isFull ? "rgba(163, 19, 42, 0.1)" : "var(--color-background)",
      }}
    >
      {/* Global glow if full */}
      <AnimatePresence>
        {isFull && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)]" />
            <div className="absolute top-0 left-0 w-full h-full bg-rose/5" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-heading text-white mb-4">How much do I love you?</h2>
        <p className="font-body text-gray-soft text-sm uppercase tracking-widest mb-16">
          Tap the heart to find out
        </p>

        <motion.div
          onClick={handleTap}
          animate={{ 
            scale: isFull ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: isFull ? 1 : 0.2,
            repeat: isFull ? Infinity : 0,
          }}
          whileTap={!isFull ? { scale: 0.9 } : {}}
          className="relative cursor-pointer"
        >
          {/* Heart background pulse */}
          {isFull && (
            <motion.div
              animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 text-accent"
            >
              <FaHeart size={120} className="md:w-40 md:h-40 w-[120px] h-[120px]" />
            </motion.div>
          )}

          {/* The filling heart */}
          <div className="relative text-white/10 overflow-hidden">
            <FaHeart size={120} className="md:w-40 md:h-40 w-[120px] h-[120px]" />
            
            <div 
              className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-500 ease-out"
              style={{ height: `${percentage}%` }}
            >
              <FaHeart size={120} className="md:w-40 md:h-40 w-[120px] h-[120px] text-accent absolute bottom-0 left-0" />
            </div>
          </div>

          <AnimatePresence>
            {!isFull && clicks > 0 && (
              <motion.div
                key={clicks}
                initial={{ opacity: 1, y: 0, scale: 0.5 }}
                animate={{ opacity: 0, y: -50, scale: 1.2 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 text-rose font-body text-sm font-bold"
              >
                +{Math.round(100 / maxClicks)}%
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div 
          className="mt-12 text-5xl md:text-7xl font-heading text-gold"
          animate={{ scale: isFull ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 2, repeat: isFull ? Infinity : 0 }}
        >
          {isFull ? "∞%" : `${percentage}%`}
        </motion.div>
        
        <AnimatePresence>
          {isFull && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-6 font-letter text-2xl text-rose"
            >
              My love for you is infinite.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
