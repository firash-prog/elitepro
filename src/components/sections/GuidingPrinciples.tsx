"use client";

import React from 'react';

/**
 * GuidingPrinciples Component
 * 
 * This component clones the "Guiding Principles" section of the Amaterasu website.
 * It features a structured vertical layout for the 6 core pillars.
 */

const principles = [
  {
    title: "Synergy with nature",
    description: "We closely partner with nature and deeply advocate for a relationship that embodies not only complete synergies within our innovation, but also to our approach to minimizing the use of compute resources to only as fundamentally required."
  },
  {
    title: "Mental World Models",
    description: "We relentlessly pursue to model complexities across all levels of mental abstractions, towards a holistic unified view of your personality, even the abstractions and archetypes that might be confrontational."
  },
  {
    title: "Interconnected Systems",
    description: "We believe in empowering you with the ability to completely integrate transformational technologies in personalized ways that are meaningful and unique to you, accessible always, all of the time, and forever."
  },
  {
    title: "Dynamic Diversity",
    description: "We move away from traditional categorical approaches to mental health-care and progress towards a true view of you. You are more than a categorical label, and we embrace the complexity associated with this."
  },
  {
    title: "Pioneering Evolution",
    description: "We are dedicated to advancing the state of the art before it arrives, ensuring our innovations stay ahead of life’s challenges. By anticipating needs and championing continuous growth, we empower individuals with tools that unlock their future potential."
  },
  {
    title: "Eternity",
    description: "We strive to solve mental-health unequivocally, relentlessly, and for all time, and will not deviate from this vision until it is complete."
  }
];

const GuidingPrinciples: React.FC = () => {
  return (
    <section className="relative py-[120px] overflow-hidden" style={{ backgroundColor: '#051622' }}>
      <div className="container mx-auto px-[5%] max-w-[1440px]">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-[40px]">
          
          {/* Left Column: Heading & Intro */}
          <div className="lg:w-[40%]">
            <h2 className="section-heading text-[#EBEBEB] text-[3.5rem] font-normal leading-[1.1] tracking-[-0.01em] mb-6">
              <div className="overflow-hidden">
                <span className="block">Guiding</span>
              </div>
              <div className="overflow-hidden">
                <span className="block">Principles</span>
              </div>
            </h2>
            <p className="text-standard text-[#EBEBEB] text-[1rem] font-normal leading-relaxed max-w-[380px]">
              Through the seamless integration of our 6 guiding principles, we set in motion our relentless culture, focus, and ethics.
            </p>
          </div>

          {/* Center Column: Spacing/Number Placeholder */}
          <div className="hidden lg:block lg:w-[10%]">
            <div className="text-meta text-[0.75rem] font-normal tracking-[0.05em] text-[#999999]" />
          </div>

          {/* Right Column: Principles List */}
          <div className="lg:w-[50%] space-y-16">
            {principles.map((principle, index) => (
              <div key={index} className="principle group">
                <div className="flex items-center gap-3 mb-4">
                  <div className="dot-indicator w-[6px] h-[6px] bg-white rounded-full flex-shrink-0" />
                  <h3 className="text-label text-[#EBEBEB] text-[0.875rem] font-medium tracking-[0.1em] uppercase">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-standard text-[#EBEBEB] text-[1rem] font-normal leading-[1.6] opacity-90">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stylized Background Dividers */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full h-full opacity-15"
          viewBox="0 0 1920 1080" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0 200 L1920 200" 
            stroke="white" 
            strokeWidth="1" 
          />
          <path 
            d="M0 800 L1920 800" 
            stroke="white" 
            strokeWidth="1" 
          />
          <line 
            x1="45%" 
            y1="0" 
            x2="45%" 
            y2="100%" 
            stroke="white" 
            strokeWidth="1" 
          />
        </svg>
      </div>

      {/* Bottom Divider Line */}
      <div className="container mx-auto px-[5%] max-w-[1440px] mt-24">
        <div className="divider-line h-[1px] w-full bg-white opacity-15" />
      </div>
    </section>
  );
};

export default GuidingPrinciples;