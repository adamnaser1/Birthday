"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import confetti from "canvas-confetti";
import { FaGift } from "react-icons/fa";

interface CountdownProps {
  onOpenGift: () => void;
}

export default function Countdown({ onOpenGift }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [giftStep, setGiftStep] = useState(0); // 0=ribbon, 1=lid lifting, 2=opened
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = true;
    // Target Date: July 13th, 2025, 00:00:00
    const targetDate = new Date("2025-07-13T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFinished) {
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#D4AF37", "#C68A8A", "#ffffff"]
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#D4AF37", "#C68A8A", "#ffffff"]
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isFinished]);

  const handleGiftClick = () => {
    if (giftStep === 0) {
      setGiftStep(1);
      setTimeout(() => setGiftStep(2), 1500);
      setTimeout(() => {
        confetti({
          particleCount: 200,
          spread: 120,
          origin: { y: 0.5 },
          colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ffffff", "#ffb6c1"]
        });
        setTimeout(() => onOpenGift(), 2000);
      }, 2500);
    }
  };

  if (!isClient.current) return null;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-20 px-4">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="flex gap-4 md:gap-8 mb-12">
              <AnimatedNumber value={timeLeft.days} label="Days" />
              <AnimatedNumber value={timeLeft.hours} label="Hours" />
              <AnimatedNumber value={timeLeft.minutes} label="Minutes" />
              <AnimatedNumber value={timeLeft.seconds} label="Seconds" />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-2xl font-letter text-rose text-center"
            >
              Until the birthday of my favourite person ❤️
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center text-center z-20"
          >
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-rose mb-16"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              🎉 HAPPY BIRTHDAY 🎉
            </motion.h2>

            {/* 3D Gift Box */}
            <div className="relative perspective-[800px] cursor-pointer" onClick={handleGiftClick}>
              {/* Box Base */}
              <motion.div
                className="relative w-52 h-52 md:w-64 md:h-64"
                animate={giftStep >= 1 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {/* Box Body */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a0505] to-[#2a0a0a] border-2 border-gold/30 rounded-xl shadow-[0_20px_60px_rgba(163,19,42,0.3),inset_0_0_40px_rgba(212,175,55,0.05)]">
                  {/* Front face gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-gold/5 rounded-xl" />
                  
                  {/* Vertical ribbon */}
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-gradient-to-b from-gold via-[#e8c84a] to-gold"
                    animate={giftStep >= 1 ? { opacity: 0, scaleX: 0 } : {}}
                    transition={{ duration: 0.8 }}
                  />
                  {/* Horizontal ribbon */}
                  <motion.div 
                    className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-8 bg-gradient-to-r from-gold via-[#e8c84a] to-gold"
                    animate={giftStep >= 1 ? { opacity: 0, scaleY: 0 } : {}}
                    transition={{ duration: 0.8 }}
                  />
                  
                  {/* Gift Icon Center */}
                  <AnimatePresence>
                    {giftStep === 0 && (
                      <motion.div 
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      >
                        <FaGift className="text-gold text-4xl drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Lid */}
                <motion.div
                  className="absolute -top-4 -left-2 -right-2 h-16 md:h-20 bg-gradient-to-b from-[#2a0a0a] to-[#1a0505] border-2 border-gold/30 rounded-xl shadow-lg origin-bottom z-20"
                  animate={
                    giftStep >= 1
                      ? { rotateX: -120, y: -80, opacity: 0 }
                      : { rotateX: 0 }
                  }
                  transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {/* Lid ribbon cross */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center"
                    animate={giftStep >= 1 ? { opacity: 0 } : {}}
                  >
                    <div className="absolute w-full h-2 bg-gold rounded" />
                    <div className="absolute w-2 h-full bg-gold rounded" />
                  </motion.div>
                  
                  {/* Bow */}
                  <motion.div 
                    className="absolute -top-6 left-1/2 -translate-x-1/2 text-3xl z-30"
                    animate={giftStep >= 1 ? { scale: 0, rotate: 180, opacity: 0 } : { y: [0, -3, 0] }}
                    transition={giftStep >= 1 ? { duration: 0.5 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    🎀
                  </motion.div>
                </motion.div>

                {/* Light burst from inside when opened */}
                <AnimatePresence>
                  {giftStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0.6], scale: [0.5, 1.5, 2] }}
                      transition={{ duration: 2 }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gold/30 rounded-full blur-[60px] z-0"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Butterflies flying out */}
              <AnimatePresence>
                {giftStep >= 2 && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={`butterfly-${i}`}
                        initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                        animate={{
                          opacity: [0, 1, 1, 0],
                          x: (i % 2 === 0 ? 1 : -1) * (80 + i * 30),
                          y: -(100 + i * 40),
                          scale: [0.3, 1, 0.8],
                          rotate: [0, (i % 2 === 0 ? 1 : -1) * 20, 0],
                        }}
                        transition={{
                          duration: 2 + i * 0.3,
                          delay: i * 0.15,
                          ease: "easeOut",
                        }}
                        className="absolute top-1/2 left-1/2 text-2xl z-30 pointer-events-none"
                      >
                        🦋
                      </motion.div>
                    ))}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={`sparkle-${i}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                          x: (Math.cos((i * Math.PI) / 4)) * 120,
                          y: (Math.sin((i * Math.PI) / 4)) * 120 - 60,
                        }}
                        transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                        className="absolute top-1/2 left-1/2 text-xl pointer-events-none"
                      >
                        ✨
                      </motion.div>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Instruction Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: giftStep === 0 ? [0.4, 1, 0.4] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 text-sm text-gray-soft font-body tracking-widest uppercase"
            >
              Tap to open your gift
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
