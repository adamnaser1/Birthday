"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import confetti from "canvas-confetti";
import { FaGift } from "react-icons/fa";

interface CountdownProps {
  onFinish: () => void;
}

export default function Countdown({ onFinish }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Target Date: July 13th, 2025, 00:00:00
    const targetDate = new Date("2026-07-13T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        onFinish();
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



  if (!isMounted) return null;

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
        ) : null}
      </AnimatePresence>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-rose/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px]" />
      </div>
    </section>
  );
}
