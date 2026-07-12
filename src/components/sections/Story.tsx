"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { Variants } from "framer-motion";

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = Array.from(text);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="inline-block"
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  );
};



export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-12 md:gap-20 text-center relative">


        <h3 className="text-2xl md:text-4xl font-heading text-white leading-relaxed">
          <TypewriterText text="Today..." delay={0.2} />
        </h3>

        <p className="text-xl md:text-3xl font-body font-light text-gray-soft leading-relaxed">
          <TypewriterText text="The world celebrates another year of your life." delay={1} />
        </p>

        <p className="text-xl md:text-3xl font-body font-light text-gray-soft leading-relaxed">
          <TypewriterText text="But for me..." delay={3.5} />
        </p>

        <p className="text-xl md:text-3xl font-body font-light text-gray-soft leading-relaxed">
          <TypewriterText text="It's celebrating the existence of someone who completely changed mine." delay={4.5} />
        </p>

        <p className="text-xl md:text-3xl font-body font-light text-gray-soft leading-relaxed">
          <TypewriterText text="Distance may separate us today." delay={9} />
        </p>

        <p className="text-xl md:text-3xl font-body font-light text-gray-soft leading-relaxed">
          <TypewriterText text="But my heart has never felt closer to yours." delay={11} />
        </p>

        <motion.h3 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 14 }}
          className="text-4xl md:text-6xl font-letter text-gold mt-10"
        >
          Happy Birthday, my love.
        </motion.h3>
      </div>
    </section>
  );
}
