"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Variants } from "framer-motion";

interface IntroProps {
  onBegin: () => void;
}

export default function Intro({ onBegin }: IntroProps) {
  const [step, setStep] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.5 }
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: { duration: 1, ease: "easeInOut" as const }
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" as const }
    }
  };

  return (
    <motion.section
      className="relative flex flex-col items-center justify-center min-h-screen w-full bg-transparent overflow-hidden z-30"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background pointer-events-none" />

      <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl">
        {step === 0 && (
          <motion.h1
            key="step1"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.8 } }}
            onAnimationComplete={() => {
              setTimeout(() => setStep(1), 2000);
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading text-white tracking-wide"
          >
            Hey Hann <span className="text-accent">❤️</span>
          </motion.h1>
        )}

        {step === 1 && (
          <motion.div
            key="step2"
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-8"
          >
            <h2 className="text-3xl md:text-5xl font-heading text-gray-soft font-light italic">
              Before your birthday begins...
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.2 }}
              onAnimationComplete={() => {
                setTimeout(() => setStep(2), 2500);
              }}
              className="text-xl md:text-2xl font-body text-white/80"
            >
              I made something just for you.
            </motion.p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" as const }}
            className="flex flex-col items-center"
          >
            <button
              onClick={onBegin}
              className="group relative px-10 py-4 overflow-hidden rounded-full bg-transparent border border-white/20 hover:border-gold/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gold/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out rounded-full" />
              <span className="relative z-10 text-white group-hover:text-gold tracking-widest uppercase font-body text-sm transition-colors duration-300">
                Begin
              </span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}
