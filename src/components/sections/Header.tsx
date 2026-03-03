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
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 py-8 transition-all duration-500 ease-in-out",
        scrolled ? "bg-[#030a16]/40 backdrop-blur-md py-6" : "bg-transparent"
      )}
      style={{
        height: "auto",
        backgroundColor: scrolled ? "rgba(3, 10, 22, 0.7)" : "transparent",
      }}
    >
      {/* Logo */}
      <Link 
        href="/" 
        className="text-[14px] font-medium tracking-[0.2em] uppercase text-white hover:opacity-70 transition-opacity"
        style={{
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.2em',
        }}
      >
        Amaterasu
      </Link>

      {/* Navigation Controls */}
      <div 
        className="flex items-center gap-6"
        onMouseEnter={() => {}} // Integration point for custom cursor "hide" logic
      >
        {/* Numeric Indicator */}
        <div className="flex items-center justify-center">
          <span 
            className="text-[10px] text-white/50 font-normal tracking-widest"
            style={{ fontFamily: 'var(--font-sans)', lineHeight: '1' }}
          >
            0
          </span>
        </div>

        {/* Chapter Label / Menu Text */}
        <div className="relative h-4 overflow-hidden w-12 flex items-center">
          <div 
            className={cn(
              "flex flex-col transition-transform duration-500 ease-in-out font-medium text-[10px] tracking-[0.1em] uppercase text-white",
              isMenuOpen ? "-translate-y-1/2" : "translate-y-0"
            )}
            style={{ height: '200%' }}
          >
            <div className="h-full flex items-center">Vision</div>
            <div className="h-full flex items-center">Menu</div>
          </div>
        </div>

        {/* Animated Burger Icon */}
        <button 
          onClick={toggleMenu}
          className="group relative w-8 h-8 flex flex-col items-center justify-center focus:outline-none"
          aria-label="Toggle Menu"
        >
          <div className="relative w-[18px] h-[12px]">
            {/* Top Bar */}
            <span 
              className={cn(
                "absolute block h-[0.5px] w-full bg-white transition-all duration-300 ease-in-out",
                isMenuOpen ? "top-1.5 rotate-45" : "top-0"
              )}
            />
            {/* Middle Bar */}
            <span 
              className={cn(
                "absolute block h-[0.5px] w-full bg-white top-1.5 transition-all duration-200 ease-in-out",
                isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
              )}
            />
            {/* Bottom Bar */}
            <span 
              className={cn(
                "absolute block h-[0.5px] w-full bg-white transition-all duration-300 ease-in-out",
                isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
              )}
            />
          </div>

          {/* SVG Elements for stylistic accuracy if needed (from structure) */}
          <div className="hidden">
            <svg className="burger-svg" xmlns="http://www.w3.org/2000/svg">
              {/* Paths would go here if complex SVG animation was retrieved */}
              {[...Array(9)].map((_, i) => <path key={i} />)}
            </svg>
          </div>
        </button>
      </div>
    </header>
  );
}
