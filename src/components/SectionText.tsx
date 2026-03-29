"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTextProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left" | "right";
}

export default function SectionText({
  title,
  subtitle,
  align = "center",
}: SectionTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto flex flex-col ${alignClass} gap-6`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-16 h-[1px] bg-white/20 origin-left"
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-extralight uppercase leading-tight"
          style={{ letterSpacing: "0.15em" }}
        >
          {title}
        </motion.h2>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            className="text-sm md:text-base font-light text-white/40 max-w-lg"
            style={{ letterSpacing: "0.1em", lineHeight: "1.8" }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
          className="w-16 h-[1px] bg-white/10 origin-right"
        />
      </div>
    </section>
  );
}
