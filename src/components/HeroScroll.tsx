"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { drawImageToCanvas } from "@/lib/drawImageToCanvas";

export default function HeroScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true });

  const { images, loaded, loadedCount, total } = useImagePreloader(
    "/sequence-1",
    120
  );

  const smoothProgress = useRef(0);

  // Canvas resize handler
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Force render on resize
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

      // Smoothen the progress with inertia (lerp)
      smoothProgress.current += (targetProgress - smoothProgress.current) * 0.1;

      // Use lerped progress for smoother updates
      const progress = smoothProgress.current;

      // Update text opacity directly with subtle smoothing
      if (textRef.current) {
        let textOpacity = 1;
        if (progress < 0.1) textOpacity = progress / 0.1;
        else if (progress > 0.7) textOpacity = 1 - (progress - 0.7) / 0.3;
        textRef.current.style.opacity = textOpacity.toFixed(3);
      }

      // Draw frame
      const frameIndex = Math.min(
        Math.floor(progress * (images.current.length - 1)),
        images.current.length - 1
      );

      // Safety check for valid frame
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
  }, [images, loaded]); // Re-run when images are loaded

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Loading indicator */}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-20">
            <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-white/60 transition-all duration-300"
                style={{ width: `${(loadedCount / total) * 100}%` }}
              />
            </div>
            <span
              className="mt-4 text-xs text-white/30 uppercase"
              style={{ letterSpacing: "0.3em" }}
            >
              Loading Experience
            </span>
          </div>
        )}

        {/* Hero Text Overlay */}
        <div
          ref={textRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none transition-opacity duration-75"
          style={{ opacity: 0 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isTextInView ? { opacity: 0.5, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-xs md:text-sm text-white/50 uppercase mb-4"
            style={{ letterSpacing: "0.4em" }}
          >
            Introducing
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.6 }}
            className="text-4xl md:text-7xl lg:text-8xl font-extralight uppercase text-center"
            style={{ letterSpacing: "0.2em" }}
          >
            Precision
            <br />
            <span className="font-thin text-white/70">in Motion</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isTextInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 1.0 }}
            className="w-24 h-[1px] bg-white/30 mt-8"
          />
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Top vignette */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#050505]/50 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

