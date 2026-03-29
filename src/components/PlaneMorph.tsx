"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { drawImageToCanvas } from "@/lib/drawImageToCanvas";

export default function PlaneMorph() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true });

  const { images, loaded } = useImagePreloader("/sequence-2", 40);

  const smoothProgress = useRef(0);

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      window.dispatchEvent(new Event('scroll'));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Frame rendering and scroll loop
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      if (!sectionRef.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), totalScroll);
      const targetProgress = scrolled / totalScroll;

      // Smoothen progress with lerp
      smoothProgress.current += (targetProgress - smoothProgress.current) * 0.1;
      const progress = smoothProgress.current;

      // Update text opacity directly
      if (textRef.current) {
        let textOpacity = 1;
        if (progress < 0.15) textOpacity = progress / 0.15;
        else if (progress > 0.75) textOpacity = 1 - (progress - 0.75) / 0.25;
        textRef.current.style.opacity = textOpacity.toFixed(3);
      }

      // Update scale directly
      if (containerRef.current) {
        const scale = 1 + progress * 0.05;
        containerRef.current.style.transform = `scale(${scale})`;
      }

      // Draw frame
      const frameIndex = Math.min(
        Math.floor(progress * (images.current.length - 1)),
        images.current.length - 1
      );
      
      if (frameIndex >= 0 && frameIndex < images.current.length) {
        const img = images.current[frameIndex];
        if (img && img.complete && img.naturalWidth > 0) {
          drawImageToCanvas(ctx, img, canvas);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [images, loaded]);

  return (
    <section ref={sectionRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        {/* Canvas with scale effect */}
        <div
          ref={containerRef}
          className="w-full h-full transition-transform duration-75 ease-out"
          style={{ transform: `scale(1)` }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Overlay Text */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-75"
          style={{ opacity: 0 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isTextInView ? { opacity: 0.5, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-xs md:text-sm text-white/40 uppercase mb-4"
            style={{ letterSpacing: "0.4em" }}
          >
            The Art of Flight
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-3xl md:text-6xl lg:text-7xl font-extralight uppercase text-center"
            style={{ letterSpacing: "0.2em" }}
          >
            Where Aerodynamics
            <br />
            <span className="font-thin text-white/70">Meets Art</span>
          </motion.h2>
        </div>

        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
