"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { label: "Vision", href: "#vision" },
    { label: "Technology", href: "#technology" },
    { label: "Principles", href: "#principles" },
    { label: "Perspectives", href: "#perspectives" },
    { label: "Aleph", href: "/aleph" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-[#051622] flex flex-col justify-center px-[5%]"
        >
          {/* Close Trigger (Handled by the Header's burger icon state in this implementation, 
              but we add a background click close as well) */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          <nav className="relative z-10 max-w-[1440px] mx-auto w-full">
            <div className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a 
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-center gap-8 text-[4rem] md:text-[6rem] lg:text-[8rem] font-light leading-none tracking-tighter uppercase text-white/20 hover:text-white transition-colors duration-500"
                    data-cursor="scale"
                  >
                    <span className="text-[1.5rem] font-mono opacity-40 mt-4">0{i + 1}</span>
                    <span>{item.label}</span>
                  </a>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Footer Info in Menu */}
          <div className="absolute bottom-12 left-[5%] right-[5%] flex justify-between items-end border-t border-white/10 pt-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Amaterasu Lab</span>
              <span className="text-[14px] text-white/60">Physics Cognition Lab</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">2026 Edition</span>
              <div className="flex gap-6">
                 {["Twitter", "LinkedIn", "Instagram"].map(s => (
                   <a key={s} href="#" className="text-[14px] text-white/60 hover:text-white transition-colors">{s}</a>
                 ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationOverlay;
