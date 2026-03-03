"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import AlephModel from '../canvas/AlephModel';

/**
 * AlephPreview Component
 * 
 * Clones the final call-to-action section titled "Meet Aleph".
 * Enhanced with Framer Motion and refined typography.
 */
const AlephPreview: React.FC = () => {
  return (
    <section
      className="aleph relative min-h-screen py-[120px] flex flex-col items-center justify-center text-center overflow-hidden bg-[#051622]"
    >
      <div className="container relative z-10 w-[90%] max-w-[1440px] mx-auto">
        {/* Title Label with Dot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-[32px]"
        >
          <h2 className="title flex items-center gap-[12px]">
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="dot w-[6px] h-[6px] bg-white rounded-full inline-block"
            />
            <span className="label text-[0.875rem] font-medium tracking-[0.2em] uppercase text-white/60">
              The future of cognitive treatment
            </span>
          </h2>
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="heading text-[4rem] md:text-[6rem] lg:text-[8rem] font-light leading-[1.1] tracking-[-0.04em] text-[#EBEBEB] mb-[48px] max-w-[1000px] mx-auto uppercase"
          aria-label="Meet Aleph"
        >
          Meet Aleph
        </motion.h2>

        {/* Description Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="paragraph text-[1.25rem] md:text-[1.5rem] font-light leading-relaxed text-[#EBEBEB] max-w-[700px] mx-auto mb-[80px] opacity-80"
        >
          Aleph is a quantum algorithm in development which simulates mental health treatment approaches against the complex representation of your mental and cognitive predispositions.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href="/aleph"
            className="button group relative flex items-center gap-[24px] px-[48px] py-[24px] border border-white/10 hover:border-white transition-all duration-700 ease-out overflow-hidden"
            data-cursor="scale"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.22, 1, 0.36, 1]" />

            <div className="relative z-10 dot w-[6px] h-[6px] bg-white rounded-full group-hover:bg-black transition-colors duration-700" />
            <div
              className="relative z-10 label text-[0.875rem] font-medium tracking-[0.2em] uppercase text-[#EBEBEB] group-hover:text-black transition-colors duration-700"
              aria-label="Enter Aleph"
            >
              Enter Aleph
            </div>
          </a>
        </motion.div>

        {/* 3D Model Integration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="absolute inset-0 z-0 opacity-40 hover:opacity-100 transition-opacity duration-1000"
        >
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }}>
            <AlephModel />
          </Canvas>
        </motion.div>
      </div>

      {/* Subtle Background Elements / Geometric Patterns */}
      <div
        className="background absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full blur-[120px] bg-[#1a4b63]/5"></div>

        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#75cdd6]/10 rounded-full blur-[150px]"
        />
      </div>
    </section>
  );
};

export default AlephPreview;