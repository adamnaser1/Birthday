"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Page {
  type: "photo" | "text" | "mixed";
  photo?: string;
  title?: string;
  note?: string;
  sticker?: string;
}

const pages: Page[] = [
  { type: "mixed", photo: "2.jpeg", title: "Where it all began", note: "The moment everything changed ❤️", sticker: "📌" },
  { type: "text", title: "Dear Hanni,", note: "I remember the first time we talked.Wallah my heart already knew you were special before my brain caught up." },
  { type: "mixed", photo: "15.jpeg", title: "Getting closer", note: "Every conversation made me fall harder", sticker: "💕" },
  { type: "mixed", photo: "33.jpeg", title: "That smile", note: "The smile that could light up entire cities", sticker: "✨" },
  { type: "text", title: "A little secret:", note: "I replay our conversations in my head before I sleep. Every. Single. Night." },
  { type: "mixed", photo: "18.jpeg", title: "My favorite", note: "I could stare at this photo forever", sticker: "🌹" },
  { type: "mixed", photo: "14.jpeg", title: "Us", note: "The best team in the world", sticker: "💫" },
  { type: "text", title: "Promise:", note: "One day, the distance will just be a memory. And I will be holding your hand for real. That day is coming. ❤️" },
];

export default function MemoryBook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const tapeStyles = useMemo(() => {
    return pages.map((_, i) => ({
      rotate: -5 + ((i * 7.3) % 10),
      x: 10 + ((i * 13.7) % 60),
    }));
  }, []);

  const goToPage = (direction: "next" | "prev") => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === "next" && currentPage < pages.length - 1) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
      setIsFlipping(false);
    }, 400);
  };

  const page = pages[currentPage];
  const tape = tapeStyles[currentPage];

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Our Memory Book
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Flip through our memories</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative w-full max-w-lg mx-auto z-10"
      >
        {/* Book */}
        <div className="relative perspective-[1200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full min-h-[500px] md:min-h-[600px] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Paper Background */}
              <div className="absolute inset-0 bg-[#f5efe0]" />
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`
              }} />

              {/* Notebook lines */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-full h-[1px] bg-blue-200/30" style={{ marginTop: `${30 + i * 28}px` }} />
                ))}
                {/* Red margin line */}
                <div className="absolute top-0 bottom-0 left-[60px] w-[1px] bg-red-300/40" />
              </div>

              {/* Page Content */}
              <div className="relative z-10 p-8 md:p-12 flex flex-col h-full min-h-[500px] md:min-h-[600px]">
                {/* Tape decoration */}
                <div
                  className="absolute top-4 bg-yellow-200/60 h-6 w-20 z-20"
                  style={{
                    left: `${tape.x}%`,
                    transform: `rotate(${tape.rotate}deg)`,
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                  }}
                />

                {/* Sticker */}
                {page.sticker && (
                  <div className="absolute top-6 right-8 text-3xl z-20">{page.sticker}</div>
                )}

                {/* Photo */}
                {page.photo && (
                  <div className="relative mx-auto mt-10 mb-6 w-64 h-64 md:w-72 md:h-72 bg-white p-2 shadow-md"
                    style={{ transform: `rotate(${tape.rotate * 0.5}deg)` }}
                  >
                    <Image
                      src={`/media/${page.photo}`}
                      alt={page.title || "Memory"}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                {page.title && (
                  <h3 className={`font-letter text-[#2C2C2C] text-center ${page.type === "text" ? "text-3xl mt-16 mb-8" : "text-2xl mt-4 mb-2"}`}>
                    {page.title}
                  </h3>
                )}

                {/* Note */}
                {page.note && (
                  <p className={`font-letter text-[#555] text-center leading-relaxed ${page.type === "text" ? "text-xl px-4" : "text-lg"}`}>
                    {page.note}
                  </p>
                )}

                {/* Doodle hearts at the bottom */}
                <div className="absolute bottom-6 right-8 text-2xl opacity-30 font-letter text-[#c68a8a]">
                  ♡ ♡ ♡
                </div>

                {/* Page number */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#999] font-body">
                  {currentPage + 1} / {pages.length}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => goToPage("prev")}
            disabled={currentPage === 0}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-body tracking-widest uppercase text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <button
            onClick={() => goToPage("next")}
            disabled={currentPage === pages.length - 1}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-body tracking-widest uppercase text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </motion.div>
    </section>
  );
}
