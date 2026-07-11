"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function DistanceMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      setStep(1); // Show pins
      await new Promise(r => setTimeout(r, 1500));
      setStep(2); // Draw line
      await new Promise(r => setTimeout(r, 2000));
      setStep(3); // Show distance info
      await new Promise(r => setTimeout(r, 3000));
      setStep(4); // Show final message
    };

    sequence();
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          The Distance Between Us
        </motion.h2>
      </div>

      <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] z-10">
        {/* Simplified Map Background */}
        <div className="absolute inset-0 bg-[#0a1628] rounded-3xl border border-white/5 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Grid lines */}
          {[...Array(10)].map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full h-[1px] bg-white/5" style={{ top: `${(i + 1) * 10}%` }} />
          ))}
          {[...Array(10)].map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full w-[1px] bg-white/5" style={{ left: `${(i + 1) * 10}%` }} />
          ))}

          {/* Tunisia Pin (approximately bottom-center-left) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", damping: 15 }}
            className="absolute bottom-[35%] left-[40%] flex flex-col items-center z-20"
          >
            <div className="relative">
              <div className="w-6 h-6 bg-rose rounded-full border-2 border-white shadow-[0_0_20px_rgba(163,19,42,0.8)]" />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-rose/30 rounded-full"
              />
            </div>
            <span className="mt-2 text-sm font-heading text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              🇹🇳 Tunisia
            </span>
          </motion.div>

          {/* Norwich Pin (approximately top-center-left) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={step >= 1 ? { scale: 1, opacity: 1 } : {}}
            transition={{ type: "spring", damping: 15, delay: 0.3 }}
            className="absolute top-[20%] left-[35%] flex flex-col items-center z-20"
          >
            <div className="relative">
              <div className="w-6 h-6 bg-gold rounded-full border-2 border-white shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
              <motion.div
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute inset-0 bg-gold/30 rounded-full"
              />
            </div>
            <span className="mt-2 text-sm font-heading text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              🇬🇧 Norwich
            </span>
          </motion.div>

          {/* Glowing Connection Line */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
            <motion.path
              d="M 35% 23% Q 50% 50% 40% 62%"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={step >= 2 ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              filter="url(#glow)"
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#A3132A" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* Distance Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={step >= 3 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="absolute top-1/2 right-[10%] -translate-y-1/2 flex flex-col gap-4 z-20"
          >
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-soft font-body uppercase tracking-widest mb-1">Distance</p>
              <p className="text-2xl font-heading text-gold">2,078 km</p>
            </div>
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-soft font-body uppercase tracking-widest mb-1">Time Difference</p>
              <p className="text-2xl font-heading text-rose">1 hour</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, type: "spring" }}
        className="text-center mt-16 z-10"
      >
        <p className="font-letter text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-gold to-rose">
          Distance means nothing.
        </p>
        <p className="font-body text-gray-soft text-lg mt-4">
          When someone means everything.
        </p>
      </motion.div>
    </section>
  );
}
