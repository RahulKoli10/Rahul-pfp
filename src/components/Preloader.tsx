import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      if (containerRef.current) containerRef.current.style.display = 'none';
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });

      // Counter 0 → 100
      const counterObj = { val: 0 };
      tl.to(counterObj, {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.floor(counterObj.val)).padStart(3, '0');
          }
        },
      }, 0);

      // Bar fill
      tl.to(barRef.current, {
        scaleX: 1,
        duration: 1.8,
        ease: 'power2.inOut',
      }, 0);

      // Name letters in
      tl.fromTo('.preloader-char', {
        opacity: 0,
        y: 40,
        filter: 'blur(8px)',
      }, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
      }, 0.3);

      // Hold
      tl.to({}, { duration: 0.3 });

      // Slide up exit
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
      }, '+=0.1');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nameChars = 'Rahul Koli'.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0F]"
    >
      {/* Name */}
      <div ref={nameRef} className="overflow-hidden mb-8">
        <div className="flex">
          {nameChars.map((char, i) => (
            <span
              key={i}
              className="preloader-char font-display font-bold text-5xl sm:text-7xl text-[#F5F5F7] inline-block"
              style={{ width: char === ' ' ? '0.4em' : 'auto' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>

      {/* Counter + bar */}
      <div className="flex flex-col items-center gap-3 w-64">
        <div className="flex items-baseline justify-between w-full">
          <span className="font-mono text-xs text-[#9A9AA5] uppercase tracking-widest">Loading</span>
          <span ref={counterRef} className="font-mono text-sm text-[#7C5CFF]">000</span>
        </div>
        <div className="w-full h-px bg-[#232330] overflow-hidden">
          <div
            ref={barRef}
            className="h-full origin-left bg-gradient-to-r from-accent-violet to-accent-teal"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </div>
  );
}
