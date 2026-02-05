"use client";

import { useEffect, useState } from 'react';

// Configuration for the industrial parallax effect
// Values represent the speed factor relative to scroll (0 = fixed, 1 = normal scroll, >1 = fast)
const PARALLAX_CONFIG = {
    hero: {
        background: 0.5, // Moves slower than scroll (far away)
        lamp: 0.3,       // Moves even slower
        logo: 1.0,       // Moves with scroll then fades
    },
    descent: {
        bg: 0.6,
        text: 1.1,       // Text moves slightly faster for "floating" effect
    },
    tension: {
        bg: 0.4,
        truck: 0.2,      // Heavy object moves slow
        load: 0.9,       // Unstable load moves faster
    },
    core: {
        bg: 0.7,
        specs: 1.0,
    },
    result: {
        bg: 0.9,         // Almost static structure
        text: 1.0,
    },
    closure: {
        bg: 1.0,
        cta: 1.0,
    }
};

export function useParallax() {
    const [offsets, setOffsets] = useState<any>({});

    useEffect(() => {
        let rafId: number;

        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Calculate transform values based on scrollY
            // We're essentially mapping scroll position to element transforms
            setOffsets({
                heroBg: `translateY(${scrollY * PARALLAX_CONFIG.hero.background}px)`,
                heroLamp: `translateY(${scrollY * PARALLAX_CONFIG.hero.lamp}px)`,

                descentBg: `translateY(${(scrollY - 800) * PARALLAX_CONFIG.descent.bg}px)`,

                tensionBg: `translateY(${(scrollY - 1600) * PARALLAX_CONFIG.tension.bg}px)`,
                truck: `translateY(${(scrollY - 1600) * PARALLAX_CONFIG.tension.truck}px)`,

                coreBg: `translateY(${(scrollY - 2400) * PARALLAX_CONFIG.core.bg}px)`,
            });

            rafId = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calc

        return () => {
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return offsets;
}
