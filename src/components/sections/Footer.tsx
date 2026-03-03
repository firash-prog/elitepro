"use client";

import React from 'react';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative bg-[#030a16] pt-[160px] pb-[40px] border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1440px]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-0">
          {/* Logo & Info Section */}
          <div className="flex flex-col gap-6 max-w-[320px]">
            <a 
              href="/" 
              className="text-white text-[24px] tracking-[-0.02em] font-normal leading-none"
            >
              Amaterasu
            </a>
            <p className="text-[#ffffff80] text-[16px] leading-[1.6] font-normal">
              A physics cognition lab working at the intersection of technology and nature to transform mental health.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16 md:gap-24">
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">Connect</span>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.05em] transition-colors duration-300">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.05em] transition-colors duration-300">
                    X
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.05em] transition-colors duration-300">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="flex flex-col gap-4">
              <span className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">Legal</span>
              <ul className="flex flex-col gap-2">
                <li>
                  <a href="/privacy" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.05em] transition-colors duration-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-white/80 hover:text-white text-[11px] uppercase tracking-[0.05em] transition-colors duration-300">
                    Terms
                  </a>
                </li>
              </ul>
            </div>

            {/* Navigation Link */}
            <div className="flex flex-col gap-4 md:items-end">
              <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
              >
                <span className="text-[11px] uppercase tracking-[0.05em]">Back to top</span>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all duration-300">
                  <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-[120px] pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            <span className="text-white/30 text-[10px] uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} Amaterasu Lab.
            </span>
          </div>
          <span className="text-white/20 text-[10px] uppercase tracking-[0.2em]">
            Physics Cognition & Neuroscience
          </span>
        </div>
      </div>

      {/* Background Subtle Elements */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
    </footer>
  );
};

export default Footer;