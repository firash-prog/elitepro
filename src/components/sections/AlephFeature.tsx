"use client";

import React from 'react';

const AlephFeature = () => {
  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#030a16] overflow-hidden py-[160px]"
      style={{
        backgroundColor: 'rgb(3, 10, 22)',
      }}
    >
      {/* Background WebGL-like Ethereal Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Geometric Ethereal Background Element (Simplified representation of the screenshot) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg 
            viewBox="0 0 1000 1000" 
            className="w-[80%] h-[80%] max-w-[1200px]"
            style={{ stroke: 'rgba(255, 255, 255, 0.2)', fill: 'none', strokeWidth: '0.5px' }}
          >
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx="500"
                cy="500"
                r="180"
                transform={`rotate(${i * 45} 500 500) translate(120, 0)`}
              />
            ))}
          </svg>
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-8 max-w-[1440px]">
        <div className="flex flex-col items-start gap-[24px]">
          {/* Section Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-[4px] h-[4px] bg-white rounded-full" />
            <span className="text-section-title text-white tracking-[0.1em] uppercase">
              Meet Aleph
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start w-full">
            {/* Description Text */}
            <div className="md:col-span-8">
              <p 
                className="text-body-large text-white leading-[1.4] font-light max-w-[900px]"
                style={{
                  fontSize: '32px',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                }}
              >
                Aleph is a quantum algorithm in development which simulates mental health treatment approaches against the complex representation of your mental and cognitive predispositions. Aleph will cut down the average time to optimal treatment plans from months to seconds.
              </p>
            </div>

            {/* CTA Button */}
            <div className="md:col-span-4 flex md:justify-end items-center pt-4 md:pt-2">
              <a 
                href="/aleph"
                className="group relative flex items-center gap-3 transition-all duration-500"
              >
                {/* Horizontal Small Dot with expansion on hover is handled by global logic, 
                    but we'll implement the visual style here */}
                <div className="w-[6px] h-[6px] bg-white rounded-full transition-transform duration-300 group-hover:scale-[1.5]" />
                <span 
                  className="text-button-label text-white tracking-[0.05em] uppercase font-medium"
                  style={{
                    fontSize: '11px',
                    lineHeight: '1',
                  }}
                >
                  Discover Aleph
                </span>
                
                {/* Hover circle effect (simulated) */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-[140px] h-[40px] border border-white/0 rounded-full group-hover:border-white/20 transition-all duration-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Divider Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
    </section>
  );
};

export default AlephFeature;