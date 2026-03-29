"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-white/60" />
          <span
            className="text-sm font-light uppercase"
            style={{ letterSpacing: "0.35em" }}
          >
            Jesko Jets
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {["Fleet", "Experience", "Heritage", "Contact"].map((item) => (
            <span
              key={item}
              className="text-xs font-light uppercase cursor-pointer text-white/50 hover:text-white transition-colors duration-500"
              style={{ letterSpacing: "0.2em" }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <span
            className="text-xs font-light uppercase cursor-pointer border border-white/20 px-5 py-2 hover:bg-white/5 transition-all duration-500"
            style={{ letterSpacing: "0.15em" }}
          >
            Inquire
          </span>
        </div>
      </div>
    </motion.nav>
  );
}
