"use client";

import React, { useEffect, useRef } from 'react';

/**
 * Vision component for Amaterasu
 * Features:
 * - Scroll-triggered text reveals (simulated via CSS/IntersectionObserver)
 * - Dynamic SVG "nature" diagram
 * - Linear patient journey flow
 * - "Human" ecosystem connectivity diagram
 */
const Vision = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const elements = sectionRef.current?.querySelectorAll('.paragraph, .paragraph-l, .title, .scene, .step');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="vision relative min-h-screen py-[160px] overflow-hidden" 
      data-cursor="scale"
      style={{ backgroundColor: '#030a16' }}
    >
      {/* Intro Section */}
      <div className="container relative z-10 mb-[200px]">
        <div className="grid grid-cols-12 gap-[40px]">
          <div className="col-start-1 col-span-12 md:col-span-8">
            <div className="flex items-center gap-2 mb-6 title opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
              <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
              <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-white">Vision</span>
            </div>
            <p 
              className="paragraph text-[32px] font-light leading-[1.4] tracking-[-0.01em] text-white opacity-0 translate-y-8 transition-all duration-1000 delay-200 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0"
              aria-label="We empower humanity with the tools, knowledge, and wisdom to face mental health challenges from a position of unprecedented resilience."
            >
              We empower humanity with the tools, knowledge, and wisdom to face mental health challenges from a position of unprecedented resilience.
            </p>
          </div>
        </div>
      </div>

      {/* Background Scenes (Visuals) */}
      <div className="scenes sticky top-0 h-screen w-full pointer-events-none flex items-center justify-center py-[80px]">
        <div className="wrapper relative w-full h-full max-w-[1440px]">
          
          {/* Nature Diagram Scene */}
          <div className="scene absolute inset-0 opacity-0 transition-opacity duration-1000 [&.is-visible]:opacity-100">
            <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none">
              <g className="paths stroke-white/20" strokeWidth="0.5">
                <path d="M720,400 L800,300" className="p-1 animate-pulse" />
                <path d="M720,400 L640,300" className="p-2 animate-pulse" />
                <path d="M720,400 L720,550" className="p-3 animate-pulse" />
                <path d="M800,300 L900,350" className="p-4" />
                <path d="M640,300 L540,350" className="p-5" />
              </g>
              <g className="circles fill-none stroke-white/30" strokeWidth="0.5">
                <circle cx="720" cy="400" r="120" className="c-1 animate-ping-slow" />
                <circle cx="720" cy="400" r="80" className="c-2" />
                <circle cx="800" cy="300" r="40" className="c-3" />
                <circle cx="640" cy="300" r="40" className="c-4" />
                <circle cx="720" cy="550" r="60" className="c-5" />
              </g>
            </svg>
          </div>

          {/* Patient Journey Scene */}
          <div className="scene absolute inset-0 opacity-0 transition-opacity duration-1000 delay-500 [&.is-visible]:opacity-100 flex flex-col justify-center items-center gap-4">
            {[
              "Understand the Patient",
              "Initial Assessment",
              "Evaluation",
              "Assessment continued",
              "Diagnostic",
              "Re-do Initial Assessment"
            ].map((text, i) => (
              <div key={i} className="step flex flex-col items-center opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="flex items-center gap-4 px-6 py-3 border border-white/10 rounded-full text-[12px] uppercase tracking-wider text-white/60 bg-white/5 backdrop-blur-sm">
                  {text}
                  <svg className="w-3 h-3 text-white/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                </div>
                {i < 5 && <div className="h-8 w-[1px] bg-white/10 my-1"></div>}
              </div>
            ))}
          </div>

          {/* Human Ecosystem Scene */}
          <div className="scene absolute inset-0 opacity-0 transition-opacity duration-1000 delay-1000 [&.is-visible]:opacity-100 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white opacity-40 mb-12 text-center">Human</div>
              <svg className="w-[300px] h-[300px]" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.2" strokeDasharray="2 4" className="animate-spin-slow" />
                <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.1" />
                {/* Simulated Ecosystem Nodes */}
                {Array.from({ length: 9 }).map((_, i) => {
                  const angle = (i * 40) * (Math.PI / 180);
                  const x = 100 + 60 * Math.cos(angle);
                  const y = 100 + 60 * Math.sin(angle);
                  return <circle key={i} cx={x} cy={y} r="2" fill="white" className="animate-pulse" style={{ animationDelay: `${i * 200}ms` }} />;
                })}
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Content Sections (Scroll Flow) */}
      <div className="container relative z-20">
        
        {/* Section 1 */}
        <div className="section min-h-[80vh] flex flex-col justify-center max-w-[800px]">
          <p className="paragraph-l text-[32px] font-light leading-[1.4] text-white/50 mb-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:text-white">
            Our minds are a deep reflection of nature, yet our internal world has driven too far from natural order.
          </p>
          <div className="title flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
            <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-white">Reconnecting with nature</span>
          </div>
        </div>

        {/* Section 2 */}
        <div className="section min-h-[80vh] flex flex-col justify-center max-w-[800px]">
          <p className="paragraph-l text-[32px] font-light leading-[1.4] text-white/50 mb-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:text-white">
            It is now our duty to restore balance and harmony.
          </p>
          <div className="title flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
            <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-white">Reconnecting with nature</span>
          </div>
        </div>

        {/* Section 3 */}
        <div className="section min-h-[80vh] flex flex-col justify-center max-w-[800px]">
          <p className="paragraph-l text-[32px] font-light leading-[1.4] text-white/50 mb-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:text-white">
            Modern mental health care operates in a linear way, isolating insights over long periods of time, with little consideration or ability to map a full view of the mind.
          </p>
          <div className="title flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
            <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-white">Beyond linear treatment</span>
          </div>
        </div>

        {/* Section 4 */}
        <div className="section min-h-[80vh] flex flex-col justify-center max-w-[800px]">
          <p className="paragraph-l text-[32px] font-light leading-[1.4] text-white/50 mb-8 opacity-0 translate-y-8 transition-all duration-1000 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 [&.is-visible]:text-white">
            Amaterasu moves beyond the linear, leveraging nonlinear dynamics to capture the fully connected conscious mind, towards holistic, dynamic, and interconnected truths.
          </p>
          <div className="title flex items-center gap-2 opacity-0 translate-y-4 transition-all duration-700 ease-out [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0">
            <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
            <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-white">Beyond linear treatment</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Vision;
