import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals all elements matching `selector` with a fade-up + stagger
 * when they scroll into view. Respects prefers-reduced-motion.
 */
export function useReveal(selector: string, options?: { stagger?: number; y?: number; delay?: number }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    if (elements.length === 0) return;

    if (prefersReduced) {
      gsap.set(elements, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elements,
        { opacity: 0, y: options?.y ?? 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: elements[0],
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [selector, options?.stagger, options?.y, options?.delay]);
}
