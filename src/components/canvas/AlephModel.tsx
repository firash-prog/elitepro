"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AlephModel Component
 * 
 * A sophisticated 3D geometric model representing "Aleph".
 * It features nested wireframe geometries (tesseract-inspired)
 * with pulsing animations and glow effects.
 */
export default function AlephModel() {
    const outerRef = useRef<THREE.Group>(null!);
    const innerRef = useRef<THREE.Group>(null!);
    const coreRef = useRef<THREE.Mesh>(null!);

    // Animation constants
    const rotationSpeed = 0.5;

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (outerRef.current) {
            outerRef.current.rotation.y = time * 0.2 * rotationSpeed;
            outerRef.current.rotation.z = time * 0.1 * rotationSpeed;
        }

        if (innerRef.current) {
            innerRef.current.rotation.y = -time * 0.3 * rotationSpeed;
            innerRef.current.rotation.x = time * 0.15 * rotationSpeed;
        }

        if (coreRef.current) {
            const scale = 1 + Math.sin(time * 2) * 0.1;
            coreRef.current.scale.set(scale, scale, scale);
        }
    });

    return (
        <group>
            {/* Outer Wireframe Shell */}
            <group ref={outerRef}>
                <mesh>
                    <icosahedronGeometry args={[3, 1]} />
                    <meshBasicMaterial
                        color="#FFFFFF"
                        wireframe
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </group>

            {/* Inner Rotating Structure */}
            <group ref={innerRef}>
                <mesh>
                    <octahedronGeometry args={[2, 0]} />
                    <meshBasicMaterial
                        color="#75cdd6"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Connecting Lines (Edges) */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.OctahedronGeometry(2, 0)]} />
                    <lineBasicMaterial color="#75cdd6" transparent opacity={0.5} />
                </lineSegments>
            </group>

            {/* Core Pulsing Point */}
            <mesh ref={coreRef}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshBasicMaterial color="#FFFFFF" />
                <pointLight intensity={2} distance={10} color="#75cdd6" />
            </mesh>

            {/* Ambient Glow */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshBasicMaterial color="#1a4b63" transparent opacity={0.2} />
            </mesh>
        </group>
    );
}
