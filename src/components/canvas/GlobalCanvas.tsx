"use client";

import React, { useEffect, useRef, useState } from "react";
import ThreeBackground from "./ThreeBackground";
import { WindingPath } from "./WindingPath";

/**
 * GlobalCanvas Component
 * This component provides the persistent WebGL background and custom cursor
 * that spans across the entire application.
 */
export default function GlobalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "scale" | "hide" | "arrow">("default");
  const [mounted, setMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Use a ref for lerped mouse position to make cursor movement smooth
  const lerpedMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMounted(true);

    // Initial size
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (!target) return;

      const closestCursorAttr = target.closest("[data-cursor]") as HTMLElement;

      if (closestCursorAttr) {
        const type = closestCursorAttr.getAttribute("data-cursor") as any;
        setHoverState(type || "default");
      } else {
        const isInteractive = target.closest("a, button, input, textarea, [role='button']");
        setHoverState(isInteractive ? "scale" : "default");
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    let rafId: number;
    const updateCursor = () => {
      const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
      lerpedMousePos.current.x = lerp(lerpedMousePos.current.x, mousePos.x, 0.15);
      lerpedMousePos.current.y = lerp(lerpedMousePos.current.y, mousePos.y, 0.15);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${lerpedMousePos.current.x}px, ${lerpedMousePos.current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, [mousePos]);

  // Prevent SSR rendering of browser-only logic
  if (!mounted) return null;

  return (
    <>
      <ThreeBackground />
      <WindingPath />

      {/* Background WebGL Container (Legacy gradients as fallback or overlay) */}
      <div
        className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none"
        ref={containerRef}
      >
        {/* Moving Light Source (Parallax effect based on mouse) */}
        <div
          className="absolute w-[150vw] h-[150vh] transition-transform duration-1000 ease-out opacity-20 mix-blend-overlay"
          style={{
            left: "-25%",
            bottom: "-10%",
            background: `radial-gradient(circle at center, #75cdd6 0%, #183969 70%)`,
            transform: `translate3d(${(mousePos.x - windowSize.width / 2) * 0.05}px, ${(mousePos.y - windowSize.height / 2) * 0.05}px, 0)`,
            filter: "blur(120px)",
          }}
        />

        {/* Ecosystem Seed / Flower of Life Overlay (SVG) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <svg
            viewBox="0 0 1000 1000"
            className="w-[80vh] h-[80vh] transition-transform duration-500 ease-out"
            style={{
              transform: `scale(${1 + (Math.abs(mousePos.x - windowSize.width / 2) / Math.max(windowSize.width, 1)) * 0.1})`
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g stroke="white" strokeWidth="0.5" fill="none" filter="url(#glow)">
              <circle cx="500" cy="500" r="150" />
              <circle cx="500" cy="350" r="150" />
              <circle cx="500" cy="650" r="150" />
              <circle cx="370" cy="425" r="150" />
              <circle cx="630" cy="425" r="150" />
              <circle cx="370" cy="575" r="150" />
              <circle cx="630" cy="575" r="150" />
            </g>
          </svg>
        </div>
      </div>

      {/* Scanline Overlay */}
      <div className="fixed inset-0 z-[15] pointer-events-none opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, #fff 1px, #fff 2px)',
             backgroundSize: '100% 3px'
           }}
      />

      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-[10] opacity-[0.05] pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Custom Cursor */}
      <div
        className={`cursor fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform ${hoverState === 'hide' ? 'opacity-0' : 'opacity-100'}`}
        ref={cursorRef}
        style={{
          transition: 'opacity 0.3s ease',
        }}
      >
        <div className="inner relative flex items-center justify-center">
          {/* Action Arrow (Visible on specific hovers) */}
          {hoverState === 'arrow' && (
            <svg className="absolute w-4 h-4 text-white -translate-y-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}

          {/* The core white dot */}
          <div
            ref={dotRef}
            className="dot bg-white rounded-full transition-transform duration-200"
            style={{
              width: '6px',
              height: '6px',
              transform: isClicking ? 'scale(0.5)' : 'scale(1)'
            }}
          />
        </div>

        {/* Outer Ring Outline */}
        <div
          ref={outlineRef}
          className="outline absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out border border-white/20 rounded-full"
          style={{
            width: hoverState === 'scale' ? '60px' : '40px',
            height: hoverState === 'scale' ? '60px' : '40px',
            opacity: hoverState === 'scale' ? 1 : 0.4,
            transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="opacity-20"
            />
          </svg>
        </div>
      </div>
    </>
  );
}