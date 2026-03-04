"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 pointer-events-none p-8 md:p-12 flex justify-between items-end">
      {/* Left: Vertical Socials */}
      <div className="flex flex-col gap-6 pointer-events-auto">
        {['LI', 'TW', 'IG'].map((social) => (
          <a
            key={social}
            href="#"
            className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white hover:tracking-[0.4em] transition-all duration-500 ease-cinematic py-1"
          >
            {social}
          </a>
        ))}
      </div>

      {/* Right: Sound Toggle (Aesthetic placeholder) */}
      <div className="flex flex-col items-end gap-4 pointer-events-auto">
        <button className="group flex items-center gap-3 focus:outline-none">
          <span className="text-[9px] tracking-[0.2em] uppercase text-white/40 group-hover:text-white transition-colors duration-300">
            Ambient: On
          </span>
          <div className="flex gap-0.5 h-3 items-end">
            {[0.4, 0.7, 0.3, 0.9, 0.5].map((h, i) => (
              <div
                key={i}
                className="w-[1px] bg-accent"
                style={{ height: `${h * 100}%` }}
              />
            ))}
          </div>
        </button>

        <div className="text-[8px] tracking-[0.1em] text-white/20 uppercase">
          © Amaterasu Lab 2026
        </div>
      </div>
    </footer>
  );
};

export default Footer;