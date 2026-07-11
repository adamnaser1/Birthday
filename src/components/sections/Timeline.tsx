"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const timelineEvents = [
  { id: 1, title: "The day we met", date: "Where it all began", align: "left", photo: "8.jpeg" },
  { id: 2, title: "The first smile", date: "A memory etched forever", align: "right", photo: "9.jpeg" },
  { id: 3, title: "The late night talks", date: "Hours felt like seconds", align: "left", photo: "k24.jpeg" },
  { id: 4, title: "The day we realized we mattered", date: "A spark turned into a flame", align: "right", photo: "r29.jpeg" },
  { id: 5, title: "The day we confessed", date: "Two hearts syncing", align: "left", photo: "s28.jpeg" },
  { id: 6, title: "Today ❤️", date: "More in love than yesterday", align: "right", photo: "k25.jpeg" },
];

export default function Timeline() {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-heading text-white mb-4"
          >
            Our Story
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-1 bg-gold mx-auto"
          />
        </div>

        {/* The center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-[calc(100%-200px)] w-[2px] bg-white/10 top-48 hidden md:block" />

        <div className="relative z-10 flex flex-col gap-16 md:gap-32">
          {timelineEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`flex flex-col md:flex-row items-center w-full ${
                event.align === "left" ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div 
                className={`w-full md:w-5/12 bg-card/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl relative group hover:border-gold/30 transition-colors duration-500
                  ${event.align === "left" ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"}
                  text-center
                `}
              >
                {/* Dot */}
                <div 
                  className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gold rounded-full shadow-[0_0_15px_var(--color-gold)]
                    ${event.align === "left" ? "-right-[calc(8.333vw+22px)] xl:-right-[114px]" : "-left-[calc(8.333vw+22px)] xl:-left-[114px]"}
                  `} 
                />

                {/* Small pinned photo */}
                {event.photo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative w-20 h-20 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-white/10 shadow-md group-hover:border-gold/30 transition-colors duration-500"
                  >
                    <Image 
                      src={`/media/${event.photo}`} 
                      alt={event.title} 
                      fill 
                      sizes="80px" 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </motion.div>
                )}
                
                <h3 className="text-2xl md:text-3xl font-heading text-gold mb-2 group-hover:scale-105 transition-transform duration-500 origin-center md:origin-inherit">
                  {event.title}
                </h3>
                <p className="text-gray-soft font-body text-sm tracking-widest uppercase">
                  {event.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
