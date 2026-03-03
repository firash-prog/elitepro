"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * VisionScroll Component
 * 
 * An interactive horizontal/vertical scroll section inspired by Amaterasu's "Vision" scenes.
 * Utilizes Framer Motion for scroll-driven animations and SVG manipulation.
 */

const VisionScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section
  // The section is tall (e.g. 500vh) to allow for slow cinematic transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef} 
      className="relative h-[600vh] bg-[#051622] text-[#EBEBEB] overflow-visible"
      style={{ cursor: "none" }}
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Layer: Dynamic Lines or Gradients */}
        <div className="absolute inset-0 z-0 opacity-40">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M 0 50 Q 25 45, 50 50 T 100 50" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="0.1"
              style={{ pathLength: smoothProgress }}
            />
          </svg>
        </div>

        {/* Scene 1: Reconnecting with Nature (SVG Pattern) */}
        <Scene1 progress={smoothProgress} />

        {/* Scene 2: Beyond Linear (Initial Assessment Spheres) */}
        <Scene2 progress={smoothProgress} />

        {/* Scene 3: Ecosystem Connected */}
        <Scene3 progress={smoothProgress} />

        {/* Unified Text Overlays */}
        <TextOverlays progress={smoothProgress} />
        
      </div>
    </section>
  );
};

const Scene1 = ({ progress }: { progress: any }) => {
  // Visibility and Scale for the Nature SVG
  const opacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.15, 0.55], [0.8, 1.2]);
  const rotate = useTransform(progress, [0.15, 0.55], [0, 15]);

  // We manually build the flower of life nature pattern
  return (
    <motion.div 
      style={{ opacity, scale, rotate }}
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <svg className="nature-svg w-[600px] h-[600px] opacity-30" viewBox="0 0 200 200">
        {[...Array(6)].map((_, i) => (
          <motion.circle
            key={i}
            cx={100 + 40 * Math.cos((i * Math.PI) / 3)}
            cy={100 + 40 * Math.sin((i * Math.PI) / 3)}
            r="40"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            style={{
              pathLength: useTransform(progress, [0.2, 0.4], [0, 1]),
            }}
          />
        ))}
        <motion.circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          style={{
            pathLength: useTransform(progress, [0.2, 0.4], [0, 1]),
          }}
        />
      </svg>
    </motion.div>
  );
};

const Scene2 = ({ progress }: { progress: any }) => {
  // Opacity for the Linear vs Nonlinear step diagram
  const opacity = useTransform(progress, [0.55, 0.65, 0.8, 0.9], [0, 1, 1, 0]);
  
  const steps = [
    "Understand the Patient",
    "Initial Assessment",
    "Evaluation",
    "Assessment continued",
    "Diagnostic",
    "Re-do Initial Assessment"
  ];

  return (
    <motion.div 
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
    >
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 px-10">
        {steps.map((text, i) => (
          <React.Fragment key={text}>
            <motion.div 
              className="flex flex-col items-center group"
              style={{
                y: useTransform(progress, [0.6, 0.8], [50 * (i % 2 === 0 ? 1 : -1), 0]),
                scale: useTransform(progress, [0.6, 0.8], [0.9, 1])
              }}
            >
              <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center p-6 text-center text-[11px] uppercase tracking-widest leading-tight transition-colors duration-500 hover:border-white/60">
                {text}
              </div>
            </motion.div>
            {i < steps.length - 1 && (
              <motion.div 
                className="hidden md:block w-8 h-[1px] bg-white/20"
                style={{
                  scaleX: useTransform(progress, [0.65 + i * 0.02, 0.7 + i * 0.02], [0, 1])
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

const Scene3 = ({ progress }: { progress: any }) => {
  const opacity = useTransform(progress, [0.85, 0.95], [0, 1]);
  const scale = useTransform(progress, [0.85, 1], [1.1, 1]);

  return (
    <motion.div 
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none px-4"
    >
      <div className="relative text-center">
        <div className="text-[12px] uppercase tracking-[0.3em] font-medium mb-8 text-white/60">Human</div>
        <svg className="w-[120px] h-px mx-auto mb-10 overflow-visible">
          <motion.path 
            d="M 0 0 L 120 0" 
            stroke="white" 
            strokeWidth="1"
            style={{ pathLength: useTransform(progress, [0.85, 0.95], [0, 1]) }}
          />
        </svg>
        <div className="relative w-72 h-72 mx-auto">
          {/* Ecosystem SVG concept */}
          <svg className="ecosystem-svg w-full h-full overflow-visible" viewBox="0 0 100 100">
            {[...Array(9)].map((_, i) => (
              <motion.circle
                key={i}
                cx="50"
                cy="50"
                r={20 + i * 4}
                fill="none"
                stroke="white"
                strokeWidth="0.2"
                strokeOpacity={0.15}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  rotate: i * 40,
                  scale: useTransform(progress, [0.85, 1], [0.8, 1])
                }}
              />
            ))}
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

const TextOverlays = ({ progress }: { progress: any }) => {
  // Array of sections based on content and scroll points
  const content = [
    {
      label: "Vision",
      para: "We empower humanity with the tools, knowledge, and wisdom to face mental health challenges from a position of unprecedented resilience.",
      range: [0, 0.15],
    },
    {
      label: "Reconnecting with nature",
      para: "Our minds are a deep reflection of nature, yet our internal world has driven too far from natural order.",
      range: [0.2, 0.35],
    },
    {
      label: "Reconnecting with nature",
      para: "It is now our duty to restore balance and harmony.",
      range: [0.4, 0.55],
    },
    {
      label: "Beyond linear treatment",
      para: "Modern mental health care operates in a linear way, isolating insights over long periods of time, with little consideration or ability to map a full view of the mind.",
      range: [0.6, 0.75],
    },
    {
      label: "Beyond linear treatment",
      para: "Amaterasu moves beyond the linear, leveraging nonlinear dynamics to capture the fully connected conscious mind, towards holistic, dynamic, and interconnected truths.",
      range: [0.8, 0.95],
    }
  ];

  return (
    <>
      {content.map((item, index) => (
        <ContentBlock 
          key={index}
          label={item.label}
          paragraph={item.para}
          progress={progress}
          range={item.range}
        />
      ))}
    </>
  );
};

interface ContentBlockProps {
  label: string;
  paragraph: string;
  progress: any;
  range: number[];
}

const ContentBlock = ({ label, paragraph, progress, range }: ContentBlockProps) => {
  // Expand the fade in/out points slightly for smoother transitions
  const fadeStart = range[0];
  const fadePeaked = range[0] + 0.05;
  const fadeEnd = range[1] - 0.05;
  const fadeOut = range[1];

  const opacity = useTransform(progress, [fadeStart, fadePeaked, fadeEnd, fadeOut], [0, 1, 1, 0]);
  const y = useTransform(progress, [fadeStart, fadeOut], [40, -40]);

  // Split paragraph into words for staggered animation
  const words = paragraph.split(" ");

  return (
    <motion.div 
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none z-50 px-[5%]"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-[40%_60%] gap-10 items-end">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <motion.span 
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="dot-indicator w-1.5 h-1.5 bg-white rounded-full shrink-0" 
            />
            <span className="text-label text-[14px] font-medium tracking-[0.2em] uppercase text-white/60">{label}</span>
          </div>
          
          <div className="text-body-large text-[2rem] md:text-[3rem] font-light leading-[1.2] text-[#EBEBEB] max-w-3xl">
            {words.map((word, i) => {
              // Word-specific opacity based on progress
              const wordStart = fadeStart + (i / words.length) * 0.05;
              const wordOpacity = useTransform(
                progress,
                [wordStart, wordStart + 0.02, fadeEnd, fadeOut],
                [0, 1, 1, 0]
              );

              return (
                <motion.span 
                  key={i} 
                  style={{ opacity: wordOpacity }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              );
            })}
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </motion.div>
  );
};

export default VisionScroll;