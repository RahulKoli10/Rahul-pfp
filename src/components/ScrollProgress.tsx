import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const bar = barRef.current!;
    const xTo = gsap.quickTo(bar, 'scaleX', { duration: 0.1, ease: 'power2.out' });

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      xTo(progress);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-accent-violet to-accent-teal"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
