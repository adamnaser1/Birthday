"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  label: string;
}

export default function AnimatedNumber({ value, label }: AnimatedNumberProps) {
  const formattedValue = value.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-20 h-24 md:w-28 md:h-32 bg-card/40 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-heading text-gold tabular-nums absolute"
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs md:text-sm font-body text-gray-soft uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}
