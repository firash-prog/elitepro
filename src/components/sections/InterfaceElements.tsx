"use client";

import React, { useEffect, useState, useRef } from "react";

export default function InterfaceElements() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorState, setCursorState] = useState<"default" | "scale" | "arrow" | "hide">("default");
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollText, setScrollText] = useState("Scroll to explore");

  const requestRef = useRef<number>();
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      
      if (cursorAttr === "scale") setCursorState("scale");
      else if (cursorAttr === "arrow") setCursorState("arrow");
      else if (cursorAttr === "hide") setCursorState("hide");
      else setCursorState("default");
    };

    const animate = () => {
      // Smooth interpolation for the cursor
      const lerp = 0.15;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;
      
      setMousePos({ x: currentPos.current.x, y: currentPos.current.y });
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Custom Animated Cursor */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${cursorState === 'hide' ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          margin: '-20px 0 0 -20px'
        }}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          {/* Outer Ring */}
          <div 
            className={`absolute inset-0 border border-white/20 rounded-full transition-transform duration-500 ease-out 
              ${cursorState === 'scale' ? 'scale-[2.5]' : 'scale-100'} 
              ${cursorState === 'arrow' ? 'scale-0' : ''}`} 
          />
          
          {/* Inner Dot */}
          <div 
            className={`w-1 h-1 bg-white rounded-full transition-all duration-300
              ${cursorState === 'scale' ? 'scale-150' : 'scale-100'}
              ${cursorState === 'arrow' ? 'opacity-0 scale-0' : 'opacity-100'}`} 
          />

          {/* Arrow State */}
          <svg 
            className={`absolute w-6 h-6 text-white transition-all duration-300 transform
              ${cursorState === 'arrow' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1"
          >
            <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed left-1/2 bottom-12 -translate-x-1/2 flex flex-col items-center gap-4 z-50 pointer-events-none">
        <div 
          className="text-meta text-white/50 flex gap-[0.4em] overflow-hidden"
          aria-label="Scroll to explore"
        >
          {scrollText.split(" ").map((word, i) => (
            <div key={i} className="flex">
              {word.split("").map((char, j) => (
                <span 
                  key={j} 
                  className="inline-block animate-pulse" 
                  style={{ animationDelay: `${(i * word.length + j) * 100}ms`, animationDuration: '2s' }}
                >
                  {char}
                </span>
              ))}
            </div>
          ))}
        </div>
        <svg 
          className="w-4 h-4 text-white/40 animate-bounce" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Sound Toggle Wave Animation Button */}
      <button 
        className="fixed bottom-10 right-10 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group z-50 transition-colors hover:bg-white/5"
        data-cursor="hide"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label="Toggle Sound"
      >
        <div className="flex items-end justify-center gap-[2px] h-3 w-6">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`w-[1.5px] bg-white transition-all duration-300 ${isPlaying ? 'animate-wave' : 'h-1 group-hover:h-2'}`}
              style={{
                height: isPlaying ? '100%' : '20%',
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      </button>
    </>
  );
}
