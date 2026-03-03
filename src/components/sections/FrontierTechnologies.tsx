"use client";

import React from 'react';

const FrontierTechnologies: React.FC = () => {
  return (
    <section 
      className="technologies relative py-[160px] bg-[#030a16] text-white overflow-hidden" 
      data-light=""
    >
      <div className="container mx-auto px-8 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[40px]">
          
          {/* Left Column: Large Heading */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h2 
              className="text-[56px] leading-[1.1] font-normal tracking-[-0.01em] mb-8 lg:mb-0"
              aria-label="Innovating the future of mental health"
            >
              <div>Innovating</div>
              <div>the future of</div>
              <div>mental health</div>
            </h2>
          </div>

          {/* Right Column: Title, Description, and Cards */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-[4px] h-[4px] rounded-full bg-white"></div>
              <span className="text-[12px] font-medium tracking-[0.1em] uppercase">
                Frontier Technologies
              </span>
            </div>

            {/* Description */}
            <p className="text-[16px] leading-[1.6] text-[#ffffff80] max-w-[540px] mb-12">
              Amaterasu pioneers research at the intersection of quantum computing, neuroscience, and non-linear dynamics towards a frontier pushing mental health care ecosystem. We leverage nature to deliver a degree of personalized mental health care not yet seen before.
            </p>

            {/* Divider Line */}
            <div className="w-full h-[0.5px] bg-[#ffffff33] mb-12"></div>

            {/* Technology Cards Grid */}
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  id: 1,
                  title: "Our Mind,\na Quantum World",
                  path: "M0 50 Q 150 0 300 50 T 600 50"
                },
                {
                  id: 2,
                  title: "Beauty in\nNature’s Entropy",
                  path: "M0 30 C 100 80 200 -20 300 30 S 500 -20 600 30"
                },
                {
                  id: 3,
                  title: "Applied Clinical\nBest Practices",
                  path: "M0 50 L 100 20 L 200 80 L 300 50 L 400 20 L 500 80 L 600 50"
                }
              ].map((tech) => (
                <div key={tech.id} className="group relative">
                  <button 
                    className="w-full text-left relative z-10 transition-all duration-500"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-end justify-between py-10 px-0 md:px-4 border-b border-[#ffffff1a] group-hover:border-white transition-colors duration-500">
                      <div className="flex items-start">
                        <div className="text-[24px] md:text-[32px] font-light leading-[1.2] whitespace-pre-line">
                          {tech.title}
                        </div>
                        <sup className="text-[10px] ml-1 mt-2 opacity-50 tracking-[0.2em]">{tech.id}</sup>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        {/* Interactive SVG Path (Decorative) */}
                        <div className="hidden md:block w-[120px] h-[40px] overflow-visible">
                          <svg 
                            width="100%" 
                            height="100%" 
                            viewBox="0 0 600 100" 
                            fill="none" 
                            className="opacity-20 group-hover:opacity-100 transition-opacity duration-700"
                          >
                            <path 
                              d={tech.path} 
                              stroke="white" 
                              strokeWidth="1.5" 
                              className="path-animate"
                            />
                          </svg>
                        </div>
                        {/* Plus Icon */}
                        <span className="text-[24px] font-light group-hover:rotate-90 transition-transform duration-500">+</span>
                      </div>
                    </div>

                    {/* Hover Fill Effect */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Path */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-10">
        <svg width="800" height="1200" viewBox="0 0 800 1200" fill="none">
          <path 
            d="M800 0C600 200 100 400 0 1200" 
            stroke="white" 
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </section>
  );
};

export default FrontierTechnologies;
