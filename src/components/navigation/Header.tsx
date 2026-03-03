"use client";

import React, { useState } from 'react';
import NavigationOverlay from './NavigationOverlay';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header 
        className="fixed top-0 left-0 w-full z-[300] flex items-center justify-between px-[5%] py-8 pointer-events-none"
      >
        {/* Logo */}
        <a 
          href="/" 
          className="pointer-events-auto text-[rgb(235,235,235)] font-sans font-normal text-[0.875rem] tracking-[0.2em] uppercase transition-opacity duration-300 hover:opacity-70"
          style={{
            fontFamily: 'var(--font-sans)',
          }}
        >
          Amaterasu
        </a>

        {/* Menu Interaction Container */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="pointer-events-auto group flex items-center outline-none"
          data-cursor="scale"
        >
          {/* Numerical Indicator */}
          <div 
            className="flex items-center justify-center mr-6 text-[rgb(235,235,235)] font-sans text-[0.875rem] font-medium opacity-40"
          >
            <div className="label font-mono">0{isMenuOpen ? '2' : '1'}</div>
          </div>

          {/* Vision/Menu Dual Label */}
          <div 
            className="relative h-[1.2rem] overflow-hidden flex flex-col items-start justify-start mr-8 text-[rgb(235,235,235)] font-sans text-[0.875rem] font-medium tracking-[0.1em] uppercase"
          >
            <div 
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: isMenuOpen ? 'translateY(-50%)' : 'translateY(0)' }}
            >
              <div className="h-[1.2rem] flex items-center">Menu</div>
              <div className="h-[1.2rem] flex items-center">Close</div>
            </div>
          </div>

          {/* Burger Icon */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              className="burger-svg"
            >
              <motion.path 
                animate={isMenuOpen ? { d: "M4 4L20 20" } : { d: "M4 7H20" }}
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
              <motion.path 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                d="M4 12H20" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
              <motion.path 
                animate={isMenuOpen ? { d: "M4 20L20 4" } : { d: "M4 17H20" }}
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
              />
            </svg>
          </div>
        </button>
      </header>

      <NavigationOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;