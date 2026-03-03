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
    <section
      className="hero relative min-h-screen w-full flex items-center overflow-hidden pt-[120px] pb-[120px]"
      style={{
        backgroundColor: '#051622',
      }}
    >
      {/* Quantum Particles */}
      {init && (
        <Particles
          id="tsparticles"
          className="absolute inset-0 z-0"
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#FFFFFF",
              },
              links: {
                color: "#FFFFFF",
                distance: 150,
                enable: true,
                opacity: 0.05,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                },
                value: 80,
              },
              opacity: {
                value: 0.1,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
      {/* Background with fluid gradient glow and divider paths */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #1a4b63 0%, #051622 70%)',
          }}
        />
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: '100%', width: '100%' }}
        >
          <path
            d="M0 1080L1920 0"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />
          <path
            d="M0 0L1920 1080"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <motion.div
        className="container relative z-10 mx-auto px-[5%] max-w-[1440px] w-full h-full flex flex-col md:flex-row justify-between items-start md:items-end"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Left Column: Heading and CTA */}
        <div className="column flex flex-col gap-12 max-w-[720px]">
          <motion.h1
            className="heading text-white leading-[1.1] tracking-[-0.02em] font-light"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
            variants={itemVariants}
          >
            <div>Empower</div>
            <div>your mental</div>
            <div>health journey</div>
          </motion.h1>

          <motion.a
            href="/aleph"
            className="group relative flex items-center gap-4 w-fit py-4"
            variants={itemVariants}
          >
            {/* Start Button with Dot and Hover Effect */}
            <div className="relative flex items-center justify-center">
              <div
                className="w-[10px] h-[10px] rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-[0.6]"
              />
              <div
                className="absolute w-[44px] h-[44px] border border-white/20 rounded-full transition-all duration-500 ease-out group-hover:border-white/60 group-hover:scale-110"
              />
            </div>

            <div
              className="label text-white uppercase font-medium tracking-[0.1em] text-[0.875rem] flex gap-2"
              aria-label="Start your journey"
            >
              <div className="flex">
                <span>S</span><span>t</span><span>a</span><span>r</span><span>t</span>
              </div>
              <div className="flex">
                <span>y</span><span>o</span><span>u</span><span>r</span>
              </div>
              <div className="flex">
                <span>j</span><span>o</span><span>u</span><span>r</span><span>n</span><span>e</span><span>y</span>
              </div>
            </div>
          </motion.a>
        </div>

        {/* Right Column: Description Text */}
        <motion.div
          className="column mt-12 md:mt-0 md:max-w-[320px] lg:max-w-[400px]"
          variants={itemVariants}
        >
          <p
            className="paragraph text-[#EBEBEB] font-light leading-[1.6] tracking-[0.01em]"
            style={{ fontSize: '1.5rem' }}
          >
            Amaterasu is a physics cognition lab working at the intersection of technology and nature to transform mental health.
          </p>
        </motion.div>
      </motion.div>

      {/* Aesthetic Background Divider Lines (as per original structure) */}
      <div className="background absolute inset-0 pointer-events-none">
        <svg
          className="divider-svg w-full h-full opacity-20"
          aria-hidden="true"
        >
          <path d="M0 400 L1920 400" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <path d="M600 0 L600 1080" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;