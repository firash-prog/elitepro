'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const WindingPath = () => {
    const { scrollYProgress } = useScroll();

    // Smooth the scroll progress for a more organic feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // We'll use a persistent SVG path that stretches through the viewport
    // The path is a soft S-curve
    const pathData = "M 500 0 C 600 200, 400 400, 500 600 C 600 800, 400 1000, 500 1200";

    return (
        <div className="fixed inset-0 pointer-events-none z-10 flex justify-center">
            <svg
                viewBox="0 0 1000 1200"
                fill="none"
                preserveAspectRatio="xMidYMin slice"
                className="h-full w-auto overflow-visible opacity-20"
            >
                <motion.path
                    d={pathData}
                    stroke="var(--color-primary)"
                    strokeWidth="1"
                    strokeDasharray="4 8"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* The Glow Follower is integrated here for perfect path alignment */}
                <GlowFollower progress={smoothProgress} pathData={pathData} />
            </svg>
        </div>
    );
};

interface GlowFollowerProps {
    progress: any;
    pathData: string;
}

const GlowFollower = ({ progress, pathData }: GlowFollowerProps) => {
    // Use a helper to get point on path (approximate for SVG)
    // Since framer-motion doesn't natively animate along complex paths easily without plugins,
    // we'll use a simpler Bezier calculation or translate3d with pathLength proxy if needed.
    // For now, let's use a simpler vertical movement that mimics the curve.

    const x = useTransform(
        progress,
        [0, 0.25, 0.5, 0.75, 1],
        [500, 550, 500, 450, 500]
    );

    const y = useTransform(progress, [0, 1], [0, 1200]);

    return (
        <motion.g style={{ x, y }}>
            <circle r="4" fill="var(--color-primary)" />
            <circle r="12" fill="var(--color-primary)" className="opacity-20 blend-screen" />
            <circle r="30" fill="var(--color-primary)" className="opacity-10 blur-xl blend-screen" />

            {/* Pulsing Core */}
            <motion.circle
                r="2"
                fill="white"
                animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.g>
    );
};
