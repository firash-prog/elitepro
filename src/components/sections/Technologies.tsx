"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Technologies: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="technologies relative py-[120px] bg-[#051622] overflow-hidden">
      <div className="container relative z-10 flex flex-col md:flex-row gap-20">

        {/* Left Column - Large Vertical Heading */}
        <div className="column flex-1">
          <div className="sticky top-[120px]">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="heading leading-[0.95] tracking-[-0.04em] text-[#EBEBEB] text-[5rem] lg:text-[7rem] font-light uppercase select-none"
              aria-label="Innovating the future of mental health"
            >
              <div className="flex flex-col">
                <div className="opacity-40">Innovating</div>
                <div className="flex gap-x-4">
                  <span>the</span>
                  <span className="text-white">future</span>
                  <span>of</span>
                </div>
                <div className="flex gap-x-4">
                  <span className="text-white">mental</span>
                  <span>health</span>
                </div>
              </div>
            </motion.h2>

            <div className="mt-12 w-24 h-px bg-white/20" />
          </div>
        </div>

        {/* Right Columns Column */}
        <div className="column flex-[1.2] flex flex-col">
          {/* Header Part */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="title flex items-center gap-3 mb-8">
              <span className="dot w-1.5 h-1.5 bg-white rounded-full inline-block"></span>
              <span className="label text-[0.875rem] font-medium tracking-[0.2em] uppercase text-white/60">
                Frontier Technologies
              </span>
            </h2>
            <p className="paragraph text-[1.25rem] leading-[1.6] text-[#EBEBEB] font-light max-w-[540px]">
              Amaterasu pioneers research at the intersection of quantum computing, neuroscience, and non-linear dynamics towards a frontier pushing mental health care ecosystem.
            </p>
          </motion.div>

          {/* Cards Grid wrapper */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="wrapper border-t border-white/10"
          >
            {[
              {
                id: "1",
                title: "Our Mind,\na Quantum World",
                path: "M0 24C30 24 40 8 70 8C100 8 110 40 140 40C170 40 180 24 210 24"
              },
              {
                id: "2",
                title: "Beauty in\nNature’s Entropy",
                path: "M10 40 L50 10 L90 35 L130 5 L170 45"
              },
              {
                id: "3",
                title: "Applied Clinical\nBest Practices",
                path: "M0 12 H40 V36 H80 V12 H120 V36 H160"
              }
            ].map((tech) => {
              const x = useMotionValue(0);
              const y = useMotionValue(0);
              const mouseXSpring = useSpring(x);
              const mouseYSpring = useSpring(y);
              const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
              const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

              const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const width = rect.width;
                const height = rect.height;
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const xPct = mouseX / width - 0.5;
                const yPct = mouseY / height - 0.5;
                x.set(xPct);
                y.set(yPct);
              };

              const handleMouseLeave = () => {
                x.set(0);
                y.set(0);
              };

              return (
                <motion.div
                  key={tech.id}
                  variants={itemVariants}
                  className="technology border-b border-white/10"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                >
                  <button
                    className="group relative w-full text-left py-16 transition-all duration-500 hover:pl-4 flex items-center justify-between outline-none"
                    data-cursor="scale"
                  >
                    <div className="inner relative z-10 flex items-center justify-between w-full" style={{ transform: "translateZ(50px)" }}>
                      <div className="label text-[1.75rem] font-light leading-[1.2] text-[#EBEBEB] whitespace-pre-line">
                        {tech.title}
                        <sup className="super text-[0.75rem] ml-2 opacity-40 font-mono">{tech.id}</sup>
                      </div>

                      <div className="flex items-center gap-12">
                        <svg className="technology-svg w-48 h-12 opacity-5 group-hover:opacity-40 transition-all duration-700" viewBox="0 0 192 48" fill="none" stroke="white" strokeWidth="1">
                          <motion.path
                            d={tech.path}
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                          />
                        </svg>

                        <div className="w-8 h-8 flex items-center justify-center border border-white/10 rounded-full group-hover:bg-white group-hover:text-black transition-all duration-500">
                          <span className="text-xl font-light">+</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="background absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-px h-full bg-white/5" />
        <div className="absolute top-1/4 left-0 w-full h-px bg-white/5" />
      </div>
    </section>
  );
};

export default Technologies;