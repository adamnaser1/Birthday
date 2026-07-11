"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const videos = [
  "vd1.mp4", "vd2.mp4", "vd3.mp4"
];

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Open curtains when section scrolls into view
  if (isInView && !curtainsOpen) {
    setTimeout(() => setCurtainsOpen(true), 500);
  }

  return (
    <section ref={containerRef} className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Our Private Cinema
        </motion.h2>
        <p className="font-letter text-gray-soft text-xl">Hearing your voice is my favorite sound</p>
      </div>

      <div className="relative w-full max-w-5xl mx-auto">
        {/* Cinema Frame */}
        <div className="relative bg-[#0a0a0a] rounded-t-[3rem] border-t-8 border-x-8 border-[#1a1a1a] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Projector Light */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={curtainsOpen ? { opacity: [0.03, 0.08, 0.05] } : { opacity: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top center, rgba(255,255,200,0.15), transparent 70%)"
            }}
          />

          {/* Curtains */}
          <div className="absolute inset-0 z-30 pointer-events-none flex overflow-hidden">
            {/* Left Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={curtainsOpen ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="w-1/2 h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5a0a0a] via-[#8b1a1a] to-[#6a0e0e]" />
              {/* Curtain folds */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-0 h-full w-[2px] bg-black/20"
                  style={{ left: `${(i + 1) * 16}%` }}
                />
              ))}
              {/* Curtain drape shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={curtainsOpen ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              className="w-1/2 h-full relative"
            >
              <div className="absolute inset-0 bg-gradient-to-l from-[#5a0a0a] via-[#8b1a1a] to-[#6a0e0e]" />
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute top-0 h-full w-[2px] bg-black/20"
                  style={{ right: `${(i + 1) * 16}%` }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            </motion.div>
          </div>

          {/* Curtain Valance (top drape) */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#4a0808] to-transparent z-40 pointer-events-none" />

          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black">
            <video
              key={videos[activeVideo]}
              src={`/media/${videos[activeVideo]}`}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Cinema Base / Stage */}
        <div className="relative w-full h-16 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-b-2xl border-b-4 border-x-4 border-[#111]">
          {/* Ambient Floor Light */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gold/10 blur-xl rounded-full" />
        </div>

        {/* Seat Silhouettes */}
        <div className="relative w-full flex justify-center gap-1 mt-4 opacity-20">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={curtainsOpen ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 2 + i * 0.1 }}
              className="w-8 h-10 md:w-10 md:h-12 bg-[#1a1a1a] rounded-t-lg border border-white/5"
            />
          ))}
        </div>

        {/* Video Selector */}
        <div className="flex justify-center gap-3 mt-8 overflow-x-auto pb-4">
          {videos.map((vid, idx) => (
            <button
              key={idx}
              onClick={() => setActiveVideo(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeVideo === idx ? "w-8 bg-gold" : "bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Play video ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
