"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Globe() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <video
        src="/globe-loop.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      {/* Top gradient blend */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#050505] to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-20 h-[1px] bg-white/30"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 0.5, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-xs text-white/40 uppercase"
          style={{ letterSpacing: "0.4em" }}
        >
          Worldwide Presence
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-extralight uppercase text-center"
          style={{ letterSpacing: "0.25em" }}
        >
          Global Reach
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="text-sm font-light text-white/40 max-w-md text-center"
          style={{ letterSpacing: "0.1em", lineHeight: "1.8" }}
        >
          Connecting Horizons. Redefining Distance.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.9 }}
          className="w-20 h-[1px] bg-white/20"
        />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex items-center justify-between border-t border-white/5">
          <span
            className="text-xs text-white/20 uppercase"
            style={{ letterSpacing: "0.2em" }}
          >
            © 2026 Jesko Jets
          </span>
          <div className="flex gap-8">
            {["Privacy", "Terms", "Contact"].map((item) => (
              <span
                key={item}
                className="text-xs text-white/20 uppercase cursor-pointer hover:text-white/40 transition-colors duration-500"
                style={{ letterSpacing: "0.15em" }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
