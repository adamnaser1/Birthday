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
  "Adam ❤️"
];

export default function LoveLetter() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [displayedText, setDisplayedText] = useState<string[]>(Array(letterContent.length).fill(""));
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    if (!isInView) return;

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
  }, [isInView]);

  return (
    <section className="relative w-full py-32 flex justify-center items-center px-4 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-background to-background" />

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, rotateX: 20, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, type: "spring" }}
        className="relative w-full max-w-2xl bg-[#FDFBF7] text-[#2C2C2C] p-8 md:p-16 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-gpu"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Subtle paper folds/shadows */}
        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)] pointer-events-none" />
        
        {/* Handwriting */}
        <div className="relative z-10 font-letter text-2xl md:text-3xl leading-relaxed md:leading-[2.5rem]">
          {displayedText.map((line, i) => (
            <p key={i} className="min-h-[2rem] md:min-h-[2.5rem]">
              {line}
              {/* Blinking cursor effect for handwriting */}
              {isInView && i === activeLine && displayedText[i] !== letterContent[i] && (
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
    </section>
  );
}
