"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function LoveMeter() {
  const { scrollYProgress } = useScroll();

  // Smooth out the scroll progress so the meter doesn't jump
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the height of the filled portion
  const fillHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  
  // Change color based on depth
  const fillColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["#D4AF37", "#C68A8A", "#A3132A"] // Gold -> Rose Gold -> Deep Red
  );

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 h-[60vh] w-1 z-40 hidden md:block group">
      {/* Container Background */}
      <div className="absolute inset-0 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        {/* Filled Portion */}
        <motion.div 
          className="absolute top-0 w-full rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]"
          style={{ height: fillHeight, backgroundColor: fillColor }}
        />
      </div>

      {/* Label (Love Meter) */}
      <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs tracking-[0.3em] font-body text-gray-soft opacity-0 group-hover:opacity-100 transition-opacity duration-500 uppercase whitespace-nowrap">
        Love Meter
      </div>

      {/* 0% Marker */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-soft font-body">
        0%
      </div>
      
      {/* Infinity Marker */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-lg text-rose font-heading">
        ∞
      </div>
    </div>
  );
}
