"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";

/**
 * VisionScroll Component
 * 
 * An interactive horizontal/vertical scroll section inspired by Amaterasu's "Vision" scenes.
 * Utilizes Framer Motion for scroll-driven animations and SVG manipulation.
 */

const VisionScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[600vh] bg-[#051622] text-[#EBEBEB] overflow-visible"
      style={{ cursor: "none" }}
    >
      <VisionScrollContent containerRef={containerRef} />
    </section>
  );
};

const VisionScrollContent = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
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

      <Scene1 progress={smoothProgress} />
      <Scene2 progress={smoothProgress} />
      <Scene3 progress={smoothProgress} />
      <TextOverlays progress={smoothProgress} />
    </div>
  );
};

const CircleItem = ({ i, progress }: { i: number; progress: MotionValue<number> }) => {
  const pathLength = useTransform(progress, [0.2, 0.4], [0, 1]);
  return (
    <motion.circle
      cx={(100 + 40 * Math.cos((i * Math.PI) / 3)).toFixed(1)}
      cy={(100 + 40 * Math.sin((i * Math.PI) / 3)).toFixed(1)}
      r="40"
      fill="none"
      stroke="white"
      strokeWidth="0.5"
      style={{ pathLength }}
    />
  );
};

const Scene1 = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.15, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const scale = useTransform(progress, [0.15, 0.55], [0.8, 1.2]);
  const rotate = useTransform(progress, [0.15, 0.55], [0, 15]);
  const centerPathLength = useTransform(progress, [0.2, 0.4], [0, 1]);

  return (
    <motion.div
      style={{ opacity, scale, rotate }}
      className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <svg className="nature-svg w-[600px] h-[600px] opacity-30" viewBox="0 0 200 200">
        {[...Array(6)].map((_, i) => (
          <CircleItem key={i} i={i} progress={progress} />
        ))}
        <motion.circle
          cx="100"
          cy="100"
          r="40"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          style={{ pathLength: centerPathLength }}
        />
      </svg>
    </motion.div>
  );
};

const StepItem = ({ text, i, progress, isLast }: { text: string; i: number; progress: MotionValue<number>; isLast: boolean }) => {
  const y = useTransform(progress, [0.6, 0.8], [50 * (i % 2 === 0 ? 1 : -1), 0]);
  const scale = useTransform(progress, [0.6, 0.8], [0.9, 1]);
  const scaleX = useTransform(progress, [0.65 + i * 0.02, 0.7 + i * 0.02], [0, 1]);

  return (
    <React.Fragment>
      <motion.div
        className="flex flex-col items-center group"
        style={{ y, scale }}
      >
        <div className="w-40 h-40 rounded-full border border-white/20 flex items-center justify-center p-6 text-center text-[11px] uppercase tracking-widest leading-tight transition-colors duration-500 hover:border-white/60">
          {text}
        </div>
      </motion.div>
      {!isLast && (
        <motion.div
          className="hidden md:block w-8 h-[1px] bg-white/20"
          style={{ scaleX }}
        />
      )}
    </React.Fragment>
  );
};

const Scene2 = ({ progress }: { progress: MotionValue<number> }) => {
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
          <StepItem key={text} text={text} i={i} progress={progress} isLast={i === steps.length - 1} />
        ))}
      </div>
    </motion.div>
  );
};

const Scene3 = ({ progress }: { progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, [0.85, 0.95], [0, 1]);
  const scale = useTransform(progress, [0.85, 1], [1.1, 1]);
  const pathLength = useTransform(progress, [0.85, 0.95], [0, 1]);

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
            style={{ pathLength }}
          />
        </svg>
        <div className="relative w-[400px] h-[400px] mx-auto flex items-center justify-center">
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          >
            <svg className="w-full h-full opacity-20" viewBox="0 0 100 100">
              {[...Array(12)].map((_, i) => (
                <g key={i} style={{ transform: `rotate(${i * 30}deg)`, transformOrigin: '50% 50%' }}>
                  <circle cx="50" cy="20" r="0.5" fill="white" />
                  <circle cx="50" cy="30" r="0.4" fill="white" />
                  <line x1="50" y1="20" x2="50" y2="30" stroke="white" strokeWidth="0.1" />
                </g>
              ))}
              <circle cx="50" cy="50" r="10" fill="none" stroke="white" strokeWidth="0.05" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="white" strokeWidth="0.05" />
            </svg>
          </motion.div>
          <div className="relative z-10 text-[2.5rem] font-extralight tracking-[0.1em] text-white/90">
            CONNECTED
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TextOverlays = ({ progress }: { progress: MotionValue<number> }) => {
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
  progress: MotionValue<number>;
  range: number[];
}

const ContentBlock = ({ label, paragraph, progress, range }: ContentBlockProps) => {
  const opacity = useTransform(progress, [range[0], range[0] + 0.1, range[1] - 0.1, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [40, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none z-50 px-[5%]"
    >
      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-[40%_60%] gap-10 items-end">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-white rounded-full shrink-0 shadow-[0_0_10px_white]" />
            <span className="text-label text-[14px] font-medium tracking-[0.2em] uppercase text-white/60">{label}</span>
          </div>
          <div className="text-body-large text-[2rem] md:text-[3rem] font-extralight leading-[1.2] text-[#EBEBEB] max-w-3xl">
            {paragraph}
          </div>
        </div>
        <div className="hidden md:block" />
      </div>
    </motion.div>
  );
};

export default VisionScroll;