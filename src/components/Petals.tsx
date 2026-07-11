"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  delay: number;
  duration: number;
  opacity: number;
  blur: number;
}

export default function Petals() {
  const [petals, setPetals] = useState<Petal[]>([]);
  const { scrollYProgress } = useScroll();

  // Create a slight parallax effect on the petals when scrolling
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    // Generate petals on mount
    const petalCount = 25;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: -20 - (Math.random() * 100), // start above screen
      size: Math.random() * 20 + 10,
      rotation: Math.random() * 360,
      delay: Math.random() * 20, // stagger start times heavily
      duration: Math.random() * 10 + 15, // float down very slowly (15-25s)
      opacity: Math.random() * 0.5 + 0.1,
      blur: Math.random() * 4,
    }));
    
    setPetals(newPetals);
  }, []);

  if (petals.length === 0) return null;

  return (
    <motion.div 
      style={{ y: yParallax }} 
      className="fixed inset-0 pointer-events-none z-0"
    >
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-tl-full rounded-br-full rounded-tr-sm rounded-bl-sm bg-gradient-to-br from-rose to-[#800f22]"
          style={{
            left: `${petal.x}vw`,
            top: `${petal.y}vh`,
            width: petal.size,
            height: petal.size,
            opacity: petal.opacity,
            filter: `blur(${petal.blur}px)`,
          }}
          animate={{
            y: ["0vh", "120vh"], // fall past the screen
            x: ["0vw", `${(Math.random() - 0.5) * 20}vw`, `${(Math.random() - 0.5) * 40}vw`], // drift
            rotate: [petal.rotation, petal.rotation + 360, petal.rotation + 720],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}
