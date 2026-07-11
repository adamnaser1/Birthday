"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHeart } from "react-icons/fa";

const allPhotos = [
  "2.jpeg", "3.jpeg", "4.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg",
  "10.jpeg", "11.jpeg", "36.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg",
  "17.jpeg", "18.jpeg", "19.jpeg", "20.jpeg", "21.jpeg", "22.jpeg", "31.jpeg",
  "32.jpeg", "33.jpeg", "35.jpeg", "k23.jpeg", "k24.jpeg", "k25.jpeg", "r27.jpeg",
  "r29.jpeg", "r30.jpeg", "r34.jpeg", "s26.jpeg", "s28.jpeg"
];

// Heart shape coordinates for positioning photos
function getHeartPosition(t: number, scale: number = 1): { x: number; y: number } {
  const x = 16 * Math.pow(Math.sin(t), 3) * scale;
  const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
  return { x, y };
}

export default function FinalSurprise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [step, setStep] = useState(0);

  const stars = useMemo(() => {
    return [...Array(60)].map((_, i) => ({
      left: `${(i * 17.3 + 5.7) % 100}%`,
      top: `${(i * 11.9 + 3.1) % 100}%`,
      animationDuration: `${1 + ((i * 1.7 + 0.3) % 3)}s`,
      animationDelay: `${(i * 0.9 + 0.1) % 2}s`,
      opacity: 0.1 + ((i * 0.13 + 0.05) % 0.6),
    }));
  }, []);

  // Pre-compute heart positions for each photo
  const heartPositions = useMemo(() => {
    return allPhotos.map((_, i) => {
      const t = (i / allPhotos.length) * Math.PI * 2;
      const pos = getHeartPosition(t, 8);
      return { x: pos.x, y: pos.y };
    });
  }, []);

  const launchFireworks = useCallback(() => {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 60 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 60 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() * 0.4 },
        colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ffffff", "#ffb6c1"]
      });
    }, 200);
  }, []);

  useEffect(() => {
    if (isInView && step === 0) {
      const sequence = async () => {
        // Step 1: Black screen, silence
        setStep(1);
        await new Promise(r => setTimeout(r, 5000));

        // Step 2: "Wait..."
        setStep(2);
        await new Promise(r => setTimeout(r, 3000));

        // Step 3: Photos fly in forming heart
        setStep(3);
        await new Promise(r => setTimeout(r, 5000));

        // Step 4: Heart beats, text fades in
        setStep(4);
        launchFireworks();
        await new Promise(r => setTimeout(r, 10000));

        // Step 5: Final credits
        setStep(5);
      };

      sequence();
    }
  }, [isInView, step, launchFireworks]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={star}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Black silence */}
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black z-10"
          />
        )}

        {/* Step 2: "Wait..." */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center z-20"
          >
            <h2 className="text-3xl md:text-5xl font-body text-gray-soft font-light italic">
              Wait...
            </h2>
            {/* Heartbeat effect */}
            <motion.div
              className="mt-8"
              animate={{ scale: [1, 1.2, 1, 1.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaHeart className="text-accent text-4xl" />
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Photos fly into heart shape */}
        {step >= 3 && step < 5 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-screen flex items-center justify-center z-20"
          >
            <div className="relative" style={{ width: "min(80vw, 400px)", height: "min(80vw, 400px)" }}>
              {allPhotos.map((photo, i) => {
                const pos = heartPositions[i];
                // Start from random edges of the screen
                const startX = ((i % 2 === 0 ? 1 : -1) * (200 + (i * 23) % 100));
                const startY = ((i % 3 === 0 ? -1 : 1) * (200 + (i * 17) % 100));

                return (
                  <motion.div
                    key={photo}
                    className="absolute rounded-sm overflow-hidden shadow-lg border border-white/20"
                    style={{ width: 40, height: 40, left: "50%", top: "50%" }}
                    initial={{
                      x: startX,
                      y: startY,
                      scale: 0,
                      opacity: 0,
                      rotate: (i * 37) % 360,
                    }}
                    animate={{
                      x: pos.x * 2.5,
                      y: pos.y * 2.5,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.08,
                      type: "spring",
                      damping: 15,
                    }}
                  >
                    <img
                      src={`/media/${photo}`}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.div>
                );
              })}

              {/* Giant heart beating behind photos */}
              {step >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: [0, 0.3, 0.2, 0.3, 0.2],
                    scale: [0.8, 1, 0.9, 1, 0.9],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]"
                >
                  <FaHeart className="text-accent text-[200px] md:text-[300px] drop-shadow-[0_0_60px_rgba(163,19,42,0.5)]" />
                </motion.div>
              )}
            </div>

            {/* Text overlay */}
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 1 }}
                className="absolute bottom-[10%] left-0 right-0 text-center z-30 px-4"
              >
                <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-rose mb-6"
                  style={{ backgroundSize: "200% auto" }}
                >
                  Happy Birthday ❤️
                </h1>
                <h2 className="text-4xl md:text-6xl font-letter text-gold mb-4">Hanni</h2>
                <p className="text-xl md:text-2xl font-body text-gray-soft font-light">Thank you for existing.</p>
                <p className="text-2xl md:text-3xl font-letter text-rose mt-4">I love you.</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Step 5: Final credits */}
        {step === 5 && (
          <motion.div
            key="s5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className="flex flex-col items-center justify-center text-center z-20 px-4"
          >
            <h2 className="text-4xl md:text-6xl font-heading text-gold mb-12">
              Happy Birthday, My Love ❤️
            </h2>
            <div className="flex flex-col items-center gap-6 mb-16">
              <span className="font-body text-gray-soft tracking-[0.3em] uppercase text-sm">
                13 July
              </span>
              <div className="w-12 h-[1px] bg-white/20" />
            </div>
            <div className="max-w-md bg-card/30 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <p className="font-letter text-xl text-white/80 leading-relaxed mb-6">
                Made with countless late nights, too much coffee, and all my love.
              </p>
              <p className="font-letter text-2xl text-gold">
                Happy Birthday, Hanni.
              </p>
              <p className="font-letter text-3xl text-white mt-2">
                — Adam ❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
