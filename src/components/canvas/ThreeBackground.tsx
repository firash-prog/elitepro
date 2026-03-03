"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AnimatedMesh Component
 * Creates a displaced plane mesh that simulates fluid motion.
 */
function AnimatedMesh(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  // Filter out orchids-specific props to avoid R3F errors
  const { "data-orchids-name": _, ...rest } = props;

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#051622") },
      uColor2: { value: new THREE.Color("#1a4b63") },
      uColor3: { value: new THREE.Color("#0d2e3f") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} {...rest}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            vUv = uv;
            vec3 pos = position;
            float elevation = sin(pos.x * 0.5 + uTime * 0.2) * 
                             cos(pos.y * 0.5 + uTime * 0.2) * 0.5 +
                             sin(pos.x * 1.5 + uTime * 0.5) * 
                             cos(pos.y * 1.5 + uTime * 0.5) * 0.2;
            pos.z += elevation;
            vElevation = elevation;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          varying float vElevation;

          void main() {
            vec3 color = mix(uColor1, uColor2, vElevation + 0.5);
            color = mix(color, uColor3, vUv.y);
            gl_FragColor = vec4(color, 0.4);
          }
        `}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * Orbs Component
 */
function Orbs(props: any) {
  const { "data-orchids-name": _, ...rest } = props;
  return (
    <group {...rest}>
      <mesh position={[5, 2, -5]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#1a4b63" transparent opacity={0.1} />
      </mesh>
      <mesh position={[-8, -4, -8]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#0d2e3f" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#051622]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <AnimatedMesh />
        <Orbs />
      </Canvas>
    </div>
  );
}

