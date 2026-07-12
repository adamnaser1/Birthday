"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

const photos = [
  "2.jpeg", "3.jpeg", "4.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg",
  "10.jpeg", "11.jpeg", "36.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", 
  "17.jpeg", "18.jpeg", "19.jpeg", "20.jpeg", "21.jpeg", "22.jpeg", "31.jpeg", 
  "32.jpeg", "33.jpeg", "35.jpeg", "k23.jpeg", "k24.jpeg", "k25.jpeg", "r27.jpeg", 
  "r29.jpeg", "r30.jpeg", "r34.jpeg", "s26.jpeg", "s28.jpeg"
];

export default function PhotoMemory() {
  const [index, setIndex] = useState(-1);

  // Pre-generate rotations using a deterministic seed based on index
  const photoStyles = useMemo(() => {
    return photos.slice(0, 35).map((_, i) => ({
      rotate: (i % 2 === 0 ? 1 : -1) * ((i * 7.3 + 3.1) % 15 + 5),
      yOffset: ((i * 13.7 + 5.9) % 40) - 20,
    }));
  }, []);

  return (
    <section className="relative w-full py-32 bg-transparent overflow-hidden min-h-screen flex flex-col items-center">
      <div className="text-center mb-24 z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading text-white mb-4"
        >
          Beautiful Memories
        </motion.h2>
        <p className="font-letter text-rose text-2xl">Every picture tells our story</p>
      </div>

      {/* Scattered Polaroids */}
      <div className="relative w-full max-w-6xl mx-auto min-h-[80vh] flex flex-wrap justify-center items-center gap-4 md:gap-8 p-4">
        {photos.slice(0, 35).map((photo, i) => {
          const { rotate, yOffset } = photoStyles[i];

          return (
            <motion.div
              key={photo}
              initial={{ opacity: 0, scale: 0.8, y: 100, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 1, y: yOffset, rotate }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1, 
                type: "spring", 
                stiffness: 50 
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 40,
                transition: { duration: 0.3 }
              }}
              onClick={() => setIndex(i)}
              className="relative p-3 pb-12 bg-white rounded-sm shadow-xl cursor-pointer group w-40 md:w-56"
            >
              <div className="relative w-full aspect-square overflow-hidden bg-gray-200">
                <Image
                  src={`/media/${photo}`}
                  alt={`Memory ${i}`}
                  fill
                  sizes="(max-width: 768px) 160px, 224px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute bottom-4 left-0 w-full text-center">
                <span className="font-letter text-black/70 text-lg">Memory</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={photos.slice(0, 35).map((p) => ({ src: `/media/${p}` }))}
        styles={{ container: { backgroundColor: "rgba(9, 9, 9, 0.95)" } }}
      />
    </section>
  );
}
