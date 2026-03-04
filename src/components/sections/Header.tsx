"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Clones the fixed navigation header featuring the "Amaterasu" text logo,
 * the numeric indicator, the chapter menu showing "Vision" or "Menu",
 * and the animated SVG burger icon.
 */
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-8 md:px-12 md:py-10 pointer-events-none">
      {/* Left: Section Indicator */}
      <div className="flex-1 flex items-center pointer-events-auto">
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          01 <span className="mx-2 text-white/10">|</span> 06
        </span>
      </div>

      {/* Center: Logo */}
      <Link
        href="/"
        className="flex-shrink-0 text-[12px] md:text-[14px] font-light tracking-[0.8em] uppercase text-white hover:opacity-70 transition-all duration-500 ease-in-out pointer-events-auto text-center translate-x-[0.4em]"
      >
        Amaterasu
      </Link>

      {/* Right: 3x2 Dot Menu Icon */}
      <div className="flex-1 flex justify-end pointer-events-auto">
        <button
          onClick={toggleMenu}
          className="group flex flex-col items-end gap-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="grid grid-cols-3 gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 bg-white rounded-full transition-transform duration-300 group-hover:scale-125 group-hover:bg-accent"
              />
            ))}
          </div>
          <span className="text-[8px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors duration-300">
            Menu
          </span>
        </button>
      </div>
    </header>
  );
}
