"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const videos = [
  "vd1.mp4", "vd2.mp4", "vd3.mp4"
];

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <section className="relative w-full py-32 bg-background flex flex-col items-center px-4">
      <div className="text-center mb-16 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Moments in Motion
        </motion.h2>
        <p className="font-letter text-gray-soft text-xl">Hearing your voice is my favorite sound</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl bg-card/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 md:p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
      >
        <div className="relative w-full rounded-2xl overflow-hidden bg-black">
          <video
            key={videos[activeVideo]}
            src={`/media/${videos[activeVideo]}`}
            controls
            playsInline
            className="w-full aspect-video object-contain"
          />
        </div>

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
      </motion.div>
    </section>
  );
}
