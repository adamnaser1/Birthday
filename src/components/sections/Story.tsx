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

// Floating polaroid that animates in from the side
function FloatingPhoto({ src, side, delay, rotate }: { src: string; side: "left" | "right"; delay: number; rotate: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -150 : 150, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay, type: "spring", damping: 15 }}
      className={`absolute ${side === "left" ? "-left-24 md:-left-40" : "-right-24 md:-right-40"} w-28 h-28 md:w-36 md:h-36 z-0 hidden lg:block`}
    >
      <div className="relative w-full h-full p-1.5 bg-white rounded-sm shadow-xl">
        <Image src={`/media/${src}`} alt="" fill sizes="150px" className="object-cover rounded-sm" />
      </div>
    </motion.div>
  );
}

export default function Story() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-12 md:gap-20 text-center relative">
        {/* Floating photos alongside text */}
        <FloatingPhoto src="7.jpeg" side="left" delay={1} rotate={-8} />
        <FloatingPhoto src="s26.jpeg" side="right" delay={5} rotate={6} />
        <FloatingPhoto src="r27.jpeg" side="left" delay={9} rotate={-5} />

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
