'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface CinematicContainerProps {
    children: React.ReactNode[];
}

/**
 * CinematicContainer
 * Transforms vertical scroll into depth-based (Z-axis) section transitions.
 */
export const CinematicContainer = ({ children }: CinematicContainerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div ref={containerRef} className="relative h-[800vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {children.map((child, index) => (
                    <SectionWrapper
                        key={index}
                        index={index}
                        total={children.length}
                        progress={smoothProgress}
                    >
                        {child}
                    </SectionWrapper>
                ))}
            </div>
        </div>
    );
};

interface SectionWrapperProps {
    children: React.ReactNode;
    index: number;
    total: number;
    progress: any;
}

const SectionWrapper = ({ children, index, total, progress }: SectionWrapperProps) => {
    const sectionProgress = index / total;
    const nextSectionProgress = (index + 1) / total;

    // Calculate relative progress for this section (0 to 1)
    // We want the section to be fully visible and at scale 1 when scroll is at its index

    const opacity = useTransform(
        progress,
        [sectionProgress - 0.1, sectionProgress, nextSectionProgress - 0.1, nextSectionProgress],
        [0, 1, 1, 0]
    );

    const scale = useTransform(
        progress,
        [sectionProgress - 0.1, sectionProgress, nextSectionProgress],
        [0.8, 1, 1.2]
    );

    const zIndex = useTransform(
        progress,
        [sectionProgress, nextSectionProgress],
        [total - index, total - index - 1]
    );

    const blur = useTransform(
        progress,
        [sectionProgress - 0.1, sectionProgress, nextSectionProgress - 0.1, nextSectionProgress],
        ["10px", "0px", "0px", "20px"]
    );

    return (
        <motion.div
            style={{
                opacity,
                scale,
                zIndex,
                filter: `blur(${blur})`,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none data-[active=true]:pointer-events-auto"
            // Use a custom hook or effect to enable pointer events only when section is active
            data-active={index === Math.floor(progress.get() * total)}
        >
            <div className="w-full h-full pointer-events-auto">
                {children}
            </div>
        </motion.div>
    );
};
