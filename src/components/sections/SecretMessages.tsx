"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Secret {
  id: number;
  label: string;
  message: string;
  color: string;
  youtubeId?: string;
  link?: string;
  linkText?: string;
}

const secrets: Secret[] = [
  {
    id: 1,
    label: "💌 Read this",
    message: "If you're reading this, I hope you're smiling already. And if you're not... then here's a reminder: somewhere in Tunisia there's a guy who feels incredibly lucky that you exist. Thank you for making my ordinary days feel extraordinary. ❤️",
    color: "bg-rose/20 text-rose border-rose/50",
  },
  {
    id: 2,
    label: "🌙 Open this tonight",
    message: "Tonight, before you close your eyes, imagine me saying what I always wish I could say in person: good night, sleep well, sweet dreams, and don't let anything steal that beautiful smile of yours. I'll be thinking about you. 🌙🤍",
    color: "bg-blue-900/30 text-blue-200 border-blue-500/50",
  },
  {
    id: 3,
    label: "❤️ One more thing",
    message: "You are the best thing that ever happened to me, and I would choose you in a hundred lifetimes, in a hundred worlds, in any version of reality.",
    color: "bg-accent/20 text-accent border-accent/50",
  },
  {
    id: 4,
    label: "🎵 Listen to this",
    message: "This is your favorite song. Every time I hear it, I think of you.",
    youtubeId: "8CWy_-afIpY",
    color: "bg-gold/20 text-gold border-gold/50",
  },
  {
    id: 5,
    label: "🌹 Secret",
    message: "I love you more than words can express, more than time can measure, and more than distance can separate.",
    color: "bg-white/10 text-white border-white/30",
  }
];

export default function SecretMessages() {
  const [activeSecret, setActiveSecret] = useState<typeof secrets[0] | null>(null);

  return (
    <section className="relative w-full py-40 bg-transparent overflow-hidden px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-heading text-white mb-4"
          >
            Little Secrets
          </motion.h2>
          <p className="font-body text-gray-soft text-sm uppercase tracking-widest">
            Hidden notes just for you
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {secrets.map((secret, index) => (
            <motion.button
              key={secret.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveSecret(secret)}
              className={`px-6 py-3 rounded-full border backdrop-blur-sm transition-all duration-300 font-body text-sm md:text-base hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] ${secret.color}`}
            >
              {secret.label}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeSecret && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSecret(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-transparent/80 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-card/90 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] text-center flex flex-col items-center"
            >
              <button 
                onClick={() => setActiveSecret(null)}
                className="absolute top-6 right-6 text-gray-soft hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="mb-8 inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-soft uppercase tracking-widest">
                {activeSecret.label}
              </div>
              
              <p className="font-letter text-2xl md:text-4xl text-white leading-relaxed text-center mb-6">
                &ldquo;{activeSecret.message}&rdquo;
              </p>

              {activeSecret.youtubeId ? (
                <div className="mt-4 w-full aspect-video rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.3)] bg-black/50">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${activeSecret.youtubeId}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  />
                </div>
              ) : activeSecret.link ? (
                <a 
                  href={activeSecret.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-3 bg-gold text-black font-body uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-black transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  {activeSecret.linkText}
                </a>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
