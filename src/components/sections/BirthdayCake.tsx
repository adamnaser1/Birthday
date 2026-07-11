"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blownOut, setBlownOut] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);

  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      setMicActive(true);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      const detect = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        // If blowing is detected (loud, breathy noise)
        if (average > 40) {
          blowOutCandles();
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        animFrameRef.current = requestAnimationFrame(detect);
      };

      detect();
    } catch {
      // Mic not available, user can use the button fallback
      console.log("Microphone not available. Use the button to blow out candles.");
    }
  };

  const blowOutCandles = () => {
    setCandlesLit(false);
    setBlownOut(true);
    setMicActive(false);
    
    // Show hidden message after a beat
    setTimeout(() => setShowMessage(true), 2000);

    // Confetti
    import("canvas-confetti").then(({ default: confetti }) => {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#C68A8A", "#A3132A", "#ffffff", "#ffb6c1"]
      });
    });
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <section className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      <div className="text-center mb-16 z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Make a Wish 🎂
        </motion.h2>
        <p className="font-body text-gray-soft text-lg">Blow into your microphone to extinguish the candles</p>
      </div>

      {/* Cake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <div className="relative flex flex-col items-center">
          {/* Candles */}
          <div className="flex gap-6 md:gap-8 mb-2 relative z-20">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {candlesLit && (
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="relative mb-1"
                    >
                      <motion.div
                        animate={{
                          scaleY: [1, 1.3, 0.9, 1.1, 1],
                          scaleX: [1, 0.8, 1.1, 0.9, 1],
                          rotate: [-2, 2, -3, 1, -2],
                        }}
                        transition={{ duration: 0.4 + i * 0.05, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-6 bg-gradient-to-t from-orange-400 via-yellow-300 to-yellow-100 rounded-full"
                        style={{
                          filter: "drop-shadow(0 0 8px rgba(255,200,50,0.8)) drop-shadow(0 0 20px rgba(255,150,0,0.4))"
                        }}
                      />
                      {/* Inner flame */}
                      <motion.div
                        animate={{ scaleY: [1, 0.8, 1.2, 1] }}
                        transition={{ duration: 0.3, repeat: Infinity }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-3 bg-white/80 rounded-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle stick */}
                <div className="w-2.5 h-12 md:h-16 bg-gradient-to-b from-[#ff99cc] to-[#ff66aa] rounded-sm shadow-inner" />
              </div>
            ))}
          </div>

          {/* Cake Top (icing) */}
          <div className="relative w-56 h-10 md:w-72 md:h-12 bg-gradient-to-b from-white to-[#f5e6d3] rounded-t-[40%] shadow-inner z-10">
            {/* Dripping icing */}
            <div className="absolute bottom-0 left-[15%] w-4 h-6 bg-white rounded-b-full" />
            <div className="absolute bottom-0 left-[40%] w-5 h-8 bg-white rounded-b-full" />
            <div className="absolute bottom-0 left-[65%] w-3 h-5 bg-white rounded-b-full" />
            <div className="absolute bottom-0 left-[85%] w-4 h-7 bg-white rounded-b-full" />
          </div>

          {/* Cake Body Layer 1 */}
          <div className="w-56 h-20 md:w-72 md:h-24 bg-gradient-to-b from-[#d4956b] to-[#c4855b] shadow-[inset_0_-5px_15px_rgba(0,0,0,0.2)] relative">
            {/* Stripe decorations */}
            <div className="absolute top-1/3 left-0 right-0 h-3 bg-[#e8a882]/50" />
            <div className="absolute top-2/3 left-0 right-0 h-2 bg-[#c07050]/50" />
          </div>

          {/* Cake Body Layer 2 */}
          <div className="w-64 h-8 md:w-80 md:h-10 bg-gradient-to-b from-[#e8c84a] to-[#d4af37] rounded-b-lg shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
            {/* Gold trim */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-gold/40 via-gold to-gold/40 rounded-b-lg" />
          </div>

          {/* Cake Plate */}
          <div className="w-72 h-4 md:w-88 md:h-5 bg-gradient-to-b from-[#e0e0e0] to-[#c0c0c0] rounded-full mt-1 shadow-lg" />

          {/* Ambient glow when lit */}
          {candlesLit && (
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-10 left-1/2 -translate-x-1/2 w-60 h-40 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none"
            />
          )}
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 mt-12 z-10">
        {candlesLit && !micActive && (
          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={startMicDetection}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-body text-sm tracking-widest uppercase hover:bg-white/20 transition-colors"
            >
              🎤 Enable Microphone
            </motion.button>
            <motion.button
              onClick={blowOutCandles}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gold/20 border border-gold/30 rounded-full text-gold font-body text-sm tracking-widest uppercase hover:bg-gold/30 transition-colors"
            >
              Or Tap to Blow
            </motion.button>
          </div>
        )}

        {micActive && candlesLit && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-rose font-body tracking-widest uppercase text-sm"
          >
            🎤 Listening... Blow now!
          </motion.p>
        )}
      </div>

      {/* Hidden message after blowing */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, type: "spring" }}
            className="mt-16 text-center z-10"
          >
            <p className="font-letter text-3xl md:text-5xl text-gold leading-relaxed">
              My wish already came true...
            </p>
            <p className="font-letter text-2xl md:text-3xl text-rose mt-4">
              because I have you. ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
