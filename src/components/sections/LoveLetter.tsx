"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const letterContent = [
  "My dearest love,",
  "",
  "As I sit down to write this, I find myself smiling just thinking about you. Today is a special day, not just for you, but for everyone who is lucky enough to have you in their lives.",
  "",
  "You bring so much light, joy, and warmth into my world. Every moment spent with you, even the quiet ones, is a treasure I hold close to my heart.",
  "",
  "I know we are far apart right now, but please know that my love for you knows no distance. I am sending you the biggest hug, the sweetest kisses, and all my love.",
  "",
  "Happy Birthday, my beautiful soul. Here's to a lifetime of birthdays together.",
  "",
  "Forever yours,",
  "Adam , UR POO ❤️"
];

export default function LoveLetter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [sealBroken, setSealBroken] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [displayedText, setDisplayedText] = useState<string[]>(Array(letterContent.length).fill(""));
  const [activeLine, setActiveLine] = useState(-1);

  const handleBreakSeal = () => {
    if (sealBroken) return;
    setSealBroken(true);
    setTimeout(() => setEnvelopeOpen(true), 800);
    setTimeout(() => setLetterVisible(true), 2000);
  };

  useEffect(() => {
    if (!letterVisible) return;

    let currentLine = 0;
    let currentChar = 0;
    
    const interval = setInterval(() => {
      if (currentLine >= letterContent.length) {
        clearInterval(interval);
        setActiveLine(-1);
        return;
      }

      const line = letterContent[currentLine];
      setActiveLine(currentLine);
      
      if (currentChar <= line.length) {
        setDisplayedText(prev => {
          const newText = [...prev];
          newText[currentLine] = line.substring(0, currentChar);
          return newText;
        });
        currentChar++;
      } else {
        currentLine++;
        currentChar = 0;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [letterVisible]);

  return (
    <section ref={containerRef} className="relative w-full py-32 flex flex-col justify-center items-center px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          A Letter For You
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Break the seal to read</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="relative z-10 w-full max-w-2xl flex flex-col items-center"
      >
        {/* ---- ENVELOPE ---- */}
        <div className={`relative w-full transition-all duration-1000 ${envelopeOpen ? 'mb-8' : ''}`}>
          {/* Envelope Body */}
          <div className="relative w-full h-64 md:h-80 bg-gradient-to-b from-[#d4a76a] to-[#b8894d] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Paper texture */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E")`
            }} />

            {/* Envelope flap (top triangle) */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1/2 origin-top z-10"
              animate={envelopeOpen ? { rotateX: 180, y: -10 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#c49555] to-[#b8894d]"
                style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
              />
              <div className="absolute inset-0 opacity-20"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.2'/%3E%3C/svg%3E")`
                }}
              />
            </motion.div>

            {/* Diagonal folds */}
            <div className="absolute bottom-0 left-0 right-0 h-full opacity-40"
              style={{ clipPath: "polygon(0 100%, 50% 40%, 100% 100%)" }}
            >
              <div className="absolute inset-0 bg-[#a07540]" />
            </div>

            {/* Inner shadow on bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Wax Seal */}
          <motion.button
            onClick={handleBreakSeal}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] z-30 cursor-pointer focus:outline-none"
            whileHover={!sealBroken ? { scale: 1.1 } : {}}
            whileTap={!sealBroken ? { scale: 0.9 } : {}}
            animate={sealBroken ? { scale: [1, 1.3, 0], rotate: [0, 10, -10, 0], opacity: [1, 1, 0] } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24">
              {/* Seal circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b0000] to-[#5c0000] rounded-full shadow-[0_4px_20px_rgba(139,0,0,0.5),inset_0_2px_6px_rgba(255,255,255,0.2)]" />
              {/* Heart stamp */}
              <div className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl">
                ❤️
              </div>
              {/* Wax drips */}
              <div className="absolute -bottom-2 left-1/4 w-3 h-5 bg-[#8b0000] rounded-b-full" />
              <div className="absolute -bottom-1 right-1/3 w-2 h-4 bg-[#8b0000] rounded-b-full" />
            </div>
          </motion.button>

          {/* "Break the seal" hint */}
          {!sealBroken && isInView && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-gray-soft font-body tracking-widest uppercase whitespace-nowrap"
            >
              Tap the seal to open
            </motion.p>
          )}
        </div>

        {/* ---- LETTER (slides up from envelope) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 100, scaleY: 0.8 }}
          animate={letterVisible ? { opacity: 1, y: 0, scaleY: 1 } : {}}
          transition={{ duration: 1.5, type: "spring", damping: 20 }}
          className="relative w-full max-w-2xl bg-[#FDFBF7] text-[#2C2C2C] p-8 md:p-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] pointer-events-none" />
          
          <div className="relative z-10 font-letter text-2xl md:text-3xl leading-relaxed md:leading-[2.5rem]">
            {displayedText.map((line, i) => (
              <p key={i} className="min-h-[2rem] md:min-h-[2.5rem]">
                {line}
                {letterVisible && i === activeLine && displayedText[i] !== letterContent[i] && (
                  <motion.span 
                    animate={{ opacity: [1, 0] }} 
                    transition={{ repeat: Infinity, duration: 0.2 }}
                    className="inline-block w-1 h-5 bg-black/50 ml-1 translate-y-1"
                  />
                )}
              </p>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
