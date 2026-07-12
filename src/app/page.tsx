"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/Preloader";
import Intro from "@/components/sections/Intro";
import AudioPlayer from "@/components/AudioPlayer";
import GlobalEnvironment from "@/components/GlobalEnvironment";
import LoveMeter from "@/components/LoveMeter";
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
import Flowers from "@/components/sections/Flowers";
import BirthdayCake from "@/components/sections/BirthdayCake";
import ScratchCard from "@/components/sections/ScratchCard";

import FutureConstellation from "@/components/sections/FutureConstellation";
import MemoryBook from "@/components/sections/MemoryBook";
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
    let typed = "";
    const target = "iloveyou";
    let titleTapCount = 0;
    let titleTapTimer: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: KeyboardEvent) => {
      typed += e.key.toLowerCase();
      if (typed.length > target.length) {
        typed = typed.slice(typed.length - target.length);
      }
      if (typed === target) {
        confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 }, colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ff69b4"] });
        typed = "";
      }
    };

    // Double-click anywhere spawns a heart
    const handleDblClick = (e: MouseEvent) => {
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;font-size:2rem;pointer-events:none;z-index:9999;transition:all 1s ease-out;opacity:1;`;
      document.body.appendChild(heart);
      requestAnimationFrame(() => {
        heart.style.transform = "translateY(-80px) scale(1.5)";
        heart.style.opacity = "0";
      });
      setTimeout(() => heart.remove(), 1200);
    };

    // Shake detection for mobile
    let lastX = 0, lastY = 0, lastZ = 0;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;
      const dx = Math.abs(acc.x - lastX);
      const dy = Math.abs(acc.y - lastY);
      const dz = Math.abs(acc.z - lastZ);
      if (dx + dy + dz > 30) {
        confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 }, colors: ["#D4AF37", "#ff69b4", "#fff"] });
      }
      lastX = acc.x; lastY = acc.y; lastZ = acc.z;
    };

    // Title tap counter
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "H1" || target.tagName === "H2") {
        titleTapCount++;
        clearTimeout(titleTapTimer);
        titleTapTimer = setTimeout(() => { titleTapCount = 0; }, 2000);
        if (titleTapCount >= 10) {
          confetti({ particleCount: 300, spread: 180, origin: { y: 0.5 }, colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ffffff", "#ffb6c1"] });
          titleTapCount = 0;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("dblclick", handleDblClick);
    window.addEventListener("devicemotion", handleMotion);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("dblclick", handleDblClick);
      window.removeEventListener("devicemotion", handleMotion);
      window.removeEventListener("click", handleClick);
    };
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
    <main className="min-h-screen relative overflow-x-hidden selection:bg-gold/30 selection:text-gold text-white">
      <GlobalEnvironment />
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
            <LoveMeter />
            <Story />
            <Timeline />
            <MemoryBook />
            <Flowers />
            <PhotoMemory />
            <ParallaxSection />

            <VideoSection />
            <ReasonsILoveYou />
            <LoveLetter />
            <ScratchCard />
            <BirthdayCake />
            <WishJar />
            <InteractiveHeart />
            <FutureConstellation />
            <SecretMessages />
            <FinalSurprise />
          </>
        )}
      </div>
    </main>
  );
}
