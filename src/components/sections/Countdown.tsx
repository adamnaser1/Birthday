"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import confetti from "canvas-confetti";

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
  const isClient = useRef(false);

  useEffect(() => {
    isClient.current = true;
    // Target Date: July 13th, 2026, 00:00:00
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
      // Fire confetti when countdown finishes
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

  if (!isClient.current) return null;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-background py-20 px-4">
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
              className="text-5xl md:text-7xl lg:text-8xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold via-white to-rose mb-12"
              animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% auto" }}
            >
              🎉 HAPPY BIRTHDAY 🎉
            </motion.h2>

            <motion.button
              onClick={onOpenGift}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group px-12 py-5 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold to-rose opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-[-2px] bg-gradient-to-r from-gold to-rose opacity-50 blur-xl group-hover:opacity-80 transition-opacity duration-300" />
              <span className="relative z-10 text-white font-body tracking-widest uppercase text-sm md:text-base font-semibold">
                Open Your Birthday Gift
              </span>
            </motion.button>
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
