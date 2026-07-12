"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

interface HeartData {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    // Generate fewer on mobile to keep it smooth
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 30;
    
    const initialHearts = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      size: Math.random() * 20 + 10, // 10px to 30px
      duration: Math.random() * 20 + 15, // 15s to 35s
      delay: Math.random() * 20, // stagger start
      opacity: Math.random() * 0.3 + 0.1, // 0.1 to 0.4
    }));
    setHearts(initialHearts);
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-accent"
          style={{
            left: `${heart.x}%`,
            opacity: heart.opacity,
            fontSize: heart.size,
          }}
          initial={{ y: "10vh", x: 0, rotate: 0 }}
          animate={{
            y: "-110vh",
            x: [0, Math.random() * 100 - 50, 0],
            rotate: [0, Math.random() * 180 - 90, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <FaHeart />
        </motion.div>
      ))}
    </div>
  );
}
