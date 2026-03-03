"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

/**
 * BackgroundScene.tsx
 * 
 * Provides the global Three.js WebGL background, the splash screen, 
 * and the transition canvas. It captures the "physics cognition" 
 * aesthetic with fluid gradients and a minimalist "Click to Enter" splash.
 */

const BackgroundScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const transitionCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Splash Screen "Click to Enter" interaction
  const handleEnter = () => {
    setHasEntered(true);
    // In a real implementation, this would trigger audio and global state changes
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- Three.js Setup ---
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- Shader for Fluid/Quantum Effect ---
    // This shader replicates the deep blue/cyan fluid gradient movement
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      void main() {
        vec2 p = vUv * 2.0 - 1.0;
        p.x *= uResolution.x / uResolution.y;

        float t = uTime * 0.2;
        
        // Fluid noise approximation
        float noise = 0.0;
        vec2 q = p - vec2(sin(t * 0.7), cos(t * 0.5)) * 0.5;
        noise += sin(q.x * 3.0 + t) * cos(q.y * 2.0 - t);
        
        vec2 r = p + vec2(cos(t * 0.3), sin(t * 0.8)) * 0.4;
        noise += cos(r.x * 2.5 - t) * sin(r.y * 3.5 + t);

        // Core colors from the design system
        vec3 color1 = vec3(0.011, 0.039, 0.086); // #030a16 deep navy
        vec3 color2 = vec3(0.094, 0.223, 0.411); // #183969 mid blue
        vec3 color3 = vec3(0.31, 0.67, 1.0);     // Light blue/cyan highlight

        float mix1 = smoothstep(-1.0, 1.0, noise);
        float mix2 = smoothstep(0.0, 2.0, noise + p.y * 0.5);

        vec3 color = mix(color1, color2, mix1);
        color = mix(color, color3, mix2 * 0.4);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Animation Loop ---
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      material.uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    setIsReady(true);

    // --- Resize Handling ---
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Main WebGL Canvas Container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden bg-[#030a16]"
        data-v-a2daf32e=""
      >
        <canvas 
          ref={canvasRef} 
          className="block w-full h-full"
        />
      </div>

      {/* Transition Overlay Canvas */}
      <div 
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${hasEntered ? 'opacity-0' : 'opacity-100'}`}
        data-v-9d92a595=""
      >
        <canvas 
          ref={transitionCanvasRef}
          className="w-full h-full opacity-30"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* Splash Screen */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#030a16] transition-transform duration-[1500ms] ease-in-out ${hasEntered ? '-translate-y-full' : 'translate-y-0'}`}
        data-v-feeb5cb6=""
      >
        {/* Ecosystem SVG: Concentric Geometric Circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-20">
          <svg 
            viewBox="0 0 1000 1000" 
            className="w-[150%] h-[150%] max-w-none text-white/20"
            data-v-feeb5cb6=""
          >
            {[...Array(9)].map((_, i) => (
              <circle
                key={i}
                cx="500"
                cy="500"
                r={100 + i * 80}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </svg>
        </div>

        {/* Enter Button */}
        <button 
          onClick={handleEnter}
          className="relative group flex items-center justify-center w-48 h-48 rounded-full cursor-pointer focus:outline-none z-10"
          data-v-feeb5cb6=""
        >
          {/* Circular Button Borders */}
          <svg className="absolute inset-0 w-full h-full" data-v-feeb5cb6="">
            <circle 
              cx="50%" cy="50%" r="48%" 
              fill="none" 
              stroke="white" 
              strokeWidth="1" 
              className="opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            />
            <circle 
              cx="50%" cy="50%" r="48%" 
              fill="none" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="300" 
              strokeDashoffset="300"
              className="group-hover:stroke-dashoffset-0 transition-all duration-700 ease-in-out"
            />
          </svg>

          {/* Label with letter-by-letter reveal structure */}
          <div 
            className="text-button-label text-white flex flex-col items-center gap-1"
            aria-label="Click to Enter"
            data-v-feeb5cb6=""
          >
            <div className="flex gap-[2px]">
              {"CLICK".split("").map((l, i) => <span key={i}>{l}</span>)}
            </div>
            <div className="flex gap-[2px]">
              {"TO".split("").map((l, i) => <span key={i}>{l}</span>)}
            </div>
            <div className="flex gap-[2px]">
              {"ENTER".split("").map((l, i) => <span key={i}>{l}</span>)}
            </div>
          </div>
        </button>
      </div>

      {/* Custom Global Cursor (Simplified Implementation) */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] opacity-0 md:opacity-100"
        data-v-89eb31a0=""
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
            <div className="absolute inset-0 border border-white/30 rounded-full scale-100 group-hover:scale-150 transition-transform duration-300" />
        </div>
      </div>
    </>
  );
};

export default BackgroundScene;