"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface Story {
  id: number;
  quote: string;
  name: string;
  age: number;
  label: string;
}

const stories: Story[] = [
  {
    id: 1,
    quote: "“I’ve been on a waitlist for months, and every day feels like a battle. The system is so slow to respond, and there’s no help for people in immediate crisis.” Sarah’s experience emphasises the urgency of addressing delays in mental health support.",
    name: "Sarah",
    age: 29,
    label: "Marketing Professional",
  },
  {
    id: 2,
    quote: "“Every therapist I see has a different idea of what’s wrong with me, but none seem to get it right. It’s exhausting to be reassessed constantly without real progress.” John’s frustration underscores the challenges of inconsistent diagnoses.",
    name: "John",
    age: 35,
    label: "Software Engineer",
  },
  {
    id: 3,
    quote: "“I’ve had to switch therapists multiple times, and every time I do, it feels like starting from square one.” Emily’s experiences highlight the instability and lack of continuity in mental health care.",
    name: "Emily",
    age: 24,
    label: "Graduate Student",
  },
  {
    id: 4,
    quote: "“It’s hard to find a therapist who understands my cultural background. I often feel like they don’t get the unique pressures I face, which makes it harder to open up.” Alex’s struggle reflects the need for culturally competent care.",
    name: "Alex",
    age: 31,
    label: "Community Organizer",
  },
  {
    id: 5,
    quote: "“There’s so much stigma around mental health that even when I reach out for help, I feel ashamed. The system doesn’t support openness, which makes it harder.” Kevin’s experience highlights the emotional toll of stigma in seeking mental health support.",
    name: "Kevin",
    age: 42,
    label: "Public Servant",
  },
  {
    id: 6,
    quote: "“The mental health system feels like it’s constantly playing catch-up. By the time you get the help you need, it’s already too late for so many people.” Olivia’s frustration speaks to the slow response in providing timely care.",
    name: "Olivia",
    age: 27,
    label: "Teacher",
  },
];

export default function PersonalPerspectives() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#051622] py-[120px] select-none" ref={containerRef}>

      <div className="container relative z-10 grid grid-cols-1 gap-[60px] lg:grid-cols-[40%_60%]">
        {/* Left Column: Fixed Header Info */}
        <div className="flex flex-col space-y-[32px]">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="section-heading text-white text-[3.5rem] font-light leading-[1.1] tracking-[-0.02em]"
          >
            <span className="block overflow-hidden">
              <span className="block">Personal</span>
            </span>
            <span className="block overflow-hidden">
              <span className="block">Perspectives</span>
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-[1.25rem] max-w-[400px] text-[#EBEBEB] font-light leading-relaxed"
          >
            Collective voices of human beings sharing their experiences with the current mental health care system. This is why we do what we do.
          </motion.p>

          <div className="mt-12 w-24 h-px bg-white/10" />
        </div>

        {/* Right Column: Interaction Area */}
        <div
          className="relative h-[600px] overflow-y-auto pr-8 scrollbar-hide lg:h-[800px] mask-fade-edges"
          data-cursor="arrow"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col space-y-[100px] pb-40"
          >
            {stories.map((story) => (
              <motion.div
                key={story.id}
                variants={itemVariants}
                className="group relative flex flex-col items-start transition-all duration-700 opacity-40 hover:opacity-100"
              >
                <div className="transition-transform duration-700 ease-out group-hover:-translate-y-4">
                  <p className="text-[1.5rem] md:text-[2rem] leading-[1.3] tracking-tight text-[#EBEBEB] mb-8 font-light">
                    {story.quote}
                  </p>

                  <div className="flex items-center space-x-4 text-[0.875rem] uppercase tracking-[0.2em]">
                    <span className="w-2 h-2 bg-white rounded-full" />
                    <span className="flex items-center gap-2">
                      <span className="text-white font-medium">{story.name}, {story.age}</span>
                      <span className="text-white/40">{story.label}</span>
                    </span>
                  </div>
                </div>

                {/* Visual accent line per story */}
                <div className="mt-12 h-px w-full bg-white/10 origin-left scale-x-0 transition-transform duration-1000 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          className="absolute -right-[10%] top-[-20%] h-[150%] w-auto opacity-[0.03] text-white"
          viewBox="0 0 1000 1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
        >
          <circle cx="500" cy="500" r="300" />
          <circle cx="500" cy="500" r="400" />
          <circle cx="500" cy="500" r="500" />
          <path d="M0 500H1000M500 0V1000" />
        </svg>
      </div>
    </section>
  );
}