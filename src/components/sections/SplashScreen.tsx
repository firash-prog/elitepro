"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SplashScreen Component
 * 
 * Clones the initial splash screen of the Amaterasu landing page.
 * Enhanced with Framer Motion for cinematic perfection.
 */

const SplashScreen: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#051622]"
        >
          {/* Ecosystem SVG background decoration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <svg 
              viewBox="0 0 1000 1000" 
              className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px]"
            >
              {[...Array(12)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="500"
                  cy="500"
                  r="200"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  initial={{ rotate: i * 30, opacity: 0 }}
                  animate={{ 
                    rotate: [i * 30, i * 30 + 360],
                    opacity: 0.5
                  }}
                  transition={{ 
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2 }
                  }}
                  style={{ transformOrigin: "500px 500px" }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Main Interactive Trigger */}
          <motion.button 
            onClick={handleEnter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="group relative flex flex-col items-center justify-center outline-none"
            aria-label="Click to Enter"
          >
            {/* Interactive Circle SVGs */}
            <div className="relative w-[197px] h-[197px] flex items-center justify-center">
              <svg 
                viewBox="0 0 200 200" 
                className="absolute inset-0 w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-110"
              >
                {/* Pulsing Outer Ring */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="98" 
                  fill="none" 
                  stroke="white" 
                  strokeWidth="0.5" 
                  strokeDasharray="4 4"
                  className="animate-[spin_20s_linear_infinite]"
                />
                {/* Spinning Inner Dashed Circle */}
                <circle 
                  cx="100" 
                  cy="100" 
                  r="70" 
                  fill="none" 
                  stroke="rgba(255,255,255,0.3)" 
                  strokeWidth="1" 
                  strokeDasharray="1 10"
                  className="animate-[spin_10s_linear_infinite_reverse]"
                />
              </svg>
              
              {/* Inner Central Dot */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-white rounded-full transition-transform duration-500 group-hover:scale-[2.5]" 
              />
            </div>

            {/* Letter-split text labels */}
            <div 
              className="mt-8 flex gap-4 text-white font-sans text-[14px] font-medium tracking-[0.1em] uppercase overflow-hidden"
              style={{ height: '1.2em' }}
            >
              <div className="flex">
                {"Click to Enter".split("").map((char, i) => (
                  <motion.span 
                    key={i} 
                    className="inline-block whitespace-pre"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 1 + i * 0.03, duration: 0.5 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Hover State Hint */}
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 0.4 }}
               transition={{ delay: 2 }}
               className="absolute -bottom-12 text-[10px] tracking-widest uppercase text-white/40 group-hover:opacity-0 transition-opacity"
            >
               Click to enter ecosystem
            </motion.div>
          </motion.button>

          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;