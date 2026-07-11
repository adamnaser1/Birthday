"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Intro from "@/components/sections/Intro";
import AudioPlayer from "@/components/AudioPlayer";
import Countdown from "@/components/sections/Countdown";
import Story from "@/components/sections/Story";
import Timeline from "@/components/sections/Timeline";
import PhotoMemory from "@/components/sections/PhotoMemory";
import VideoSection from "@/components/sections/VideoSection";
import LoveLetter from "@/components/sections/LoveLetter";
import ReasonsILoveYou from "@/components/sections/ReasonsILoveYou";
import WishJar from "@/components/sections/WishJar";
import InteractiveHeart from "@/components/sections/InteractiveHeart";
import SecretMessages from "@/components/sections/SecretMessages";
import ParallaxSection from "@/components/sections/ParallaxSection";
import FinalSurprise from "@/components/sections/FinalSurprise";
import confetti from "canvas-confetti";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    if (loading || !giftOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [loading, giftOpened]);

  // Easter Eggs
  useEffect(() => {
    // Konami code logic for "I love you"
    let typed = "";
    const target = "iloveyou";
    
    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > target.length) {
        typed = typed.slice(typed.length - target.length);
      }
      if (typed === target) {
        alert("I love you too ❤️"); // Simple easter egg alert or trigger a state
        typed = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTitleTap = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleBegin = () => {
    setHasStarted(true);
    setAudioPlaying(true);
  };

  const handleOpenGift = () => {
    setGiftOpened(true);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-gold/30 selection:text-gold">
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AudioPlayer isPlaying={audioPlaying} onPlayChange={setAudioPlaying} />

      <AnimatePresence>
        {!loading && !hasStarted && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-40 bg-background"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          >
            <div onClick={handleTitleTap}>
              <Intro onBegin={handleBegin} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hasStarted && !giftOpened && (
          <motion.div
            key="countdown"
            className="fixed inset-0 z-30 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5 } }}
            exit={{ 
              opacity: 0, 
              scale: 1.1, 
              filter: "blur(20px)",
              transition: { duration: 2, ease: "easeInOut" } 
            }}
          >
            <Countdown onOpenGift={handleOpenGift} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content */}
      <div 
        className={`relative z-20 transition-opacity duration-[2000ms] ${
          giftOpened ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {giftOpened && (
          <>
            <Story />
            <Timeline />
            <PhotoMemory />
            <ParallaxSection />
            <VideoSection />
            <ReasonsILoveYou />
            <LoveLetter />
            <WishJar />
            <InteractiveHeart />
            <SecretMessages />
            <FinalSurprise />
          </>
        )}
      </div>
    </main>
  );
}
