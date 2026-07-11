"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHeart } from "react-icons/fa";

export default function FinalSurprise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);

  // Pre-generate star positions so they don't change on re-render
  const stars = useMemo(() => {
    return [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 1}s`,
      animationDelay: `${Math.random() * 2}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  const launchFireworks = useCallback(() => {
    const duration = 8 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ffffff"]
      });
    }, 250);
  }, []);

  useEffect(() => {
    if (isInView && step === 0) {
      const sequence = async () => {
        setStep(1);
        await new Promise(r => setTimeout(r, 4000));
        
        setStep(2);
        await new Promise(r => setTimeout(r, 4000));
        
        setStep(3);
        await new Promise(r => setTimeout(r, 4000));
        
        setStep(4);
        await new Promise(r => setTimeout(r, 3000));
        
        setStep(5);
        launchFireworks();
        await new Promise(r => setTimeout(r, 8000));
        
        setStep(6);
      };
      
      sequence();
    }
  }, [isInView, step, launchFireworks]);

  const fadeVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 2 } },
    exit: { opacity: 0, filter: "blur(10px)", transition: { duration: 1.5 } }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden"
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
        {step === 1 && (
          <motion.h2
            key="s1"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-5xl md:text-7xl font-heading text-white text-center"
          >
            Happy Birthday <span className="text-accent">❤️</span>
          </motion.h2>
        )}

        {step === 2 && (
          <motion.h2
            key="s2"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-3xl md:text-5xl font-body text-gray-soft text-center font-light"
          >
            I wish I could be beside you today.
          </motion.h2>
        )}

        {step === 3 && (
          <motion.h2
            key="s3"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-3xl md:text-5xl font-body text-gray-soft text-center font-light"
          >
            But until that day comes...
          </motion.h2>
        )}

        {step === 4 && (
          <motion.h2
            key="s4"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-3xl md:text-5xl font-body text-gray-soft text-center font-light"
          >
            Please remember...
          </motion.h2>
        )}

        {step === 5 && (
          <motion.div
            key="s5"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center justify-center z-10"
          >
            <motion.h1 
              className="text-7xl md:text-[10rem] font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-rose mb-8"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              I Love You.
            </motion.h1>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaHeart className="text-accent text-6xl md:text-9xl drop-shadow-[0_0_30px_rgba(163,19,42,0.8)]" />
            </motion.div>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            key="s6"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center text-center z-10 px-4"
          >
            <h3 className="text-2xl md:text-4xl font-body font-light text-white mb-8">
              Forever grateful that life brought us together.
            </h3>
            <h2 className="text-4xl md:text-6xl font-heading text-gold mb-16">
              Happy Birthday, My Love ❤️
            </h2>
            <div className="flex flex-col items-center gap-4">
              <span className="font-body text-gray-soft tracking-[0.3em] uppercase text-sm">
                13 July
              </span>
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="font-letter text-2xl text-rose">
                Made with all my love,
              </span>
              <span className="font-letter text-3xl text-white">
                Adam ❤️
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
