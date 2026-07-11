"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    // Gold metallic overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    gradient.addColorStop(0, "#b8860b");
    gradient.addColorStop(0.3, "#d4af37");
    gradient.addColorStop(0.5, "#f0d060");
    gradient.addColorStop(0.7, "#d4af37");
    gradient.addColorStop(1, "#b8860b");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Add sparkle/texture pattern
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * canvas.offsetWidth;
      const y = Math.random() * canvas.offsetHeight;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // "Scratch Me" text
    ctx.font = "bold 18px system-ui";
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH ME ✨", canvas.offsetWidth / 2, canvas.offsetHeight / 2);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left);
    const y = (clientY - rect.top);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x * 2, y * 2, 40, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const pct = (transparent / (pixels.length / 4)) * 100;
    setPercentage(pct);

    if (pct > 60 && !revealed) {
      setRevealed(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          A Hidden Surprise
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Scratch the card to reveal a secret message</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-80 h-48 md:w-[28rem] md:h-56 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/10 z-10"
      >
        {/* Hidden message underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a0a1a] p-8">
          <p className="font-letter text-2xl md:text-3xl text-gold text-center leading-relaxed">
            You are the best thing that ever happened to me.
          </p>
          <p className="font-letter text-xl text-rose mt-4">
            ❤️ Always & Forever ❤️
          </p>
        </div>

        {/* Scratchable canvas overlay */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full cursor-pointer touch-none transition-opacity duration-1000 ${revealed ? 'opacity-0 pointer-events-none' : ''}`}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={handleTouchMove}
        />
      </motion.div>

      {/* Progress hint */}
      {!revealed && percentage > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-xs text-gray-soft font-body tracking-widest"
        >
          {Math.floor(percentage)}% scratched
        </motion.p>
      )}
    </section>
  );
}
