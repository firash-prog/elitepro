"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const Hero = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <section className="hero relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="container relative z-10 flex flex-col items-center text-center gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col items-center gap-4">
          <motion.span
            className="text-label"
            variants={itemVariants}
          >
            Digital Architecture & Design
          </motion.span>

          <motion.h1
            className="hero-heading text-white"
            variants={itemVariants}
          >
            Empower<br />
            Health<br />
            Journey
          </motion.h1>
        </div>

        <motion.div
          className="max-w-[480px]"
          variants={itemVariants}
        >
          <p className="text-body-large text-white/60">
            Amaterasu is a physics cognition lab working at the intersection of technology and nature to transform mental health.
          </p>
        </motion.div>

        <motion.a
          href="/vision"
          className="group relative flex flex-col items-center gap-4 mt-8"
          variants={itemVariants}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-[8px] h-[8px] rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
            <div className="absolute w-[40px] h-[40px] border border-accent/20 rounded-full transition-all duration-500 group-hover:scale-125 group-hover:border-accent/50" />
            <div className="absolute w-[60px] h-[60px] border border-accent/5 rounded-full transition-all duration-700 group-hover:scale-150" />
          </div>
          <span className="text-label text-white/50 group-hover:text-white transition-colors duration-300">
            Explore Vision
          </span>
        </motion.a>
      </motion.div>

      {/* Background divider line (Minimalist) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <div className="h-full w-[1px] bg-white transform translate-x-[-10vw]" />
        <div className="h-full w-[1px] bg-white transform translate-x-[10vw]" />
      </div>
    </section>
  );
};

export default Hero;