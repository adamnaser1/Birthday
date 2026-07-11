"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reasons = [
  "I love your smile.",
  "I love how you care.",
  "I love hearing your voice.",
  "I love your kindness.",
  "I love your laugh.",
  "I love your eyes.",
  "I love your personality.",
  "I love the way you look at me.",
  "I love how safe I feel with you.",
  "I love your sense of humor.",
  "I love how passionate you are.",
  "I love your beautiful mind.",
  "I love how you support my dreams.",
  "I love your gentle touch.",
  "I love how you make me want to be better.",
  "I love your late-night thoughts.",
  "I love how we can talk about anything.",
  "I love the way you say my name.",
  "I love your quirks.",
  "I love the way you listen to me.",
  "I love your beautiful soul.",
  "I love your warmth.",
  "I love how you understand me without words.",
  "I love your strength.",
  "I love the way you hold my hand.",
  "I love your resilience.",
  "I love your sleepy voice.",
  "I love the way you see the world.",
  "I love your passion for the things you love.",
  "I love how you always know how to cheer me up.",
  "I love your text messages.",
  "I love the memories we've created.",
  "I love our inside jokes.",
  "I love how you challenge me.",
  "I love your honesty.",
  "I love your loyalty.",
  "I love how you make ordinary moments special.",
  "I love your creativity.",
  "I love the way you smell.",
  "I love your hugs.",
  "I love how you inspire me.",
  "I love your forgiveness.",
  "I love the way you comfort me.",
  "I love your optimism.",
  "I love your intelligence.",
  "I love how you respect me.",
  "I love your beautiful heart.",
  "I love the way we fit together perfectly.",
  "I love your patience with me.",
  "I love how you make me laugh until my stomach hurts.",
  "I love your empathy for others.",
  "I love your sense of adventure.",
  "I love how you surprise me.",
  "I love your dedication.",
  "I love the way you dress.",
  "I love your cute habits.",
  "I love how we can just be silent together.",
  "I love your ambition.",
  "I love how you celebrate my successes.",
  "I love your cooking (or lack thereof!).",
  "I love your sweet kisses.",
  "I love how you remember the little things.",
  "I love your confidence.",
  "I love how you handle difficult situations.",
  "I love your weirdness because it matches mine.",
  "I love how you make me feel like the luckiest person alive.",
  "I love your protective nature.",
  "I love how you believe in us.",
  "I love your beautiful face.",
  "I love the way you laugh at my terrible jokes.",
  "I love your independence.",
  "I love how you prioritize us.",
  "I love your spontaneous ideas.",
  "I love the way you look when you're focused.",
  "I love how you make me feel loved every single day.",
  "I love your vulnerability with me.",
  "I love how you make my heart skip a beat.",
  "I love your thoughtful gifts.",
  "I love the way you treat my friends and family.",
  "I love how we share the same values.",
  "I love your beautiful hair.",
  "I love how you calm my anxiety.",
  "I love the future we are building together.",
  "I love your enthusiasm.",
  "I love how you never give up on me.",
  "I love the way you sing along to songs.",
  "I love your endless curiosity.",
  "I love how you bring out the best in me.",
  "I love your unwavering faith in me.",
  "I love how you make my life complete.",
  "I love your grace.",
  "I love the way you make every day an adventure.",
  "I love how you make me feel understood.",
  "I love your sparkling energy.",
  "I love how you make me feel like I'm home.",
  "I love your beautiful, chaotic energy.",
  "I love the way you love me.",
  "I love you, simply because you are you.",
  "I love you for everything you are.",
  "I love you endlessly."
];

export default function ReasonsILoveYou() {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < reasons.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      setIndex(0); // loop back or stay
    }
  };

  return (
    <section className="relative w-full py-32 bg-transparent flex flex-col items-center px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-96 bg-rose/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-heading text-gold mb-2"
        >
          100 Reasons Why
        </motion.h2>
        <p className="font-body text-gray-soft text-sm tracking-widest uppercase">
          {index + 1} / 100
        </p>
      </div>

      <div 
        className="relative z-10 w-full max-w-2xl h-64 md:h-80 flex items-center justify-center cursor-pointer group"
        onClick={handleNext}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center text-center px-4"
          >
            <p className="text-3xl md:text-5xl font-letter text-white leading-relaxed">
              &ldquo;{reasons[index]}&rdquo;
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Click indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 text-gray-soft/50 font-body text-sm flex items-center gap-2 group-hover:opacity-100 transition-opacity"
        >
          <span>Tap to read more</span>
        </motion.div>
      </div>
    </section>
  );
}
