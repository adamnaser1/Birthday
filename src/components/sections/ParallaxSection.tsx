"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/media/17.jpeg')` }} // Assuming 17.jpeg is a nice background picture
        />
      </motion.div>

      {/* Quote */}
      <motion.div 
        style={{ opacity }}
        className="relative z-20 text-center px-4 max-w-4xl"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-letter text-white leading-relaxed md:leading-[1.5] drop-shadow-2xl">
          &ldquo;I look at you and see the rest of my life in front of my eyes.&rdquo;
        </h2>
      </motion.div>
    </section>
  );
}
